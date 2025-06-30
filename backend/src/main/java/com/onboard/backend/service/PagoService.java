package com.onboard.backend.service;

import com.onboard.backend.entity.Factura;
import com.onboard.backend.entity.Pago;
import com.onboard.backend.repository.FacturaRepository;
import com.onboard.backend.repository.PagoRepository;

import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import com.paypal.http.exceptions.HttpException;
import com.paypal.orders.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private PayPalHttpClient payPalClient;

    public String crearPago(String idFactura) throws Exception {
        Optional<Factura> facturaOpt = facturaRepository.findById(idFactura);
        if (facturaOpt.isEmpty()) {
            throw new RuntimeException("Factura no encontrada con ID: " + idFactura);
        }

        Factura factura = facturaOpt.get();
        BigDecimal total = factura.getTotal();
        String valor = String.format("%.2f", total);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");

        ApplicationContext applicationContext = new ApplicationContext()
                .returnUrl("https://tuapp.com/pago-exitoso")
                .cancelUrl("https://tuapp.com/pago-cancelado")
                .brandName("OnBoard")
                .landingPage("LOGIN")
                .userAction("PAY_NOW");

        orderRequest.applicationContext(applicationContext);

        PurchaseUnitRequest purchaseUnitRequest = new PurchaseUnitRequest()
                .amountWithBreakdown(new AmountWithBreakdown()
                        .currencyCode("USD")
                        .value(valor));

        orderRequest.purchaseUnits(List.of(purchaseUnitRequest));

        OrdersCreateRequest request = new OrdersCreateRequest();
        request.header("prefer", "return=representation");
        request.requestBody(orderRequest);

        try {
            HttpResponse<Order> response = payPalClient.execute(request);
            Order order = response.result();

            String approvalLink = order.links().stream()
                    .filter(link -> "approve".equals(link.rel()))
                    .findFirst()
                    .map(LinkDescription::href)
                    .orElseThrow(() -> new RuntimeException("No se encontró el enlace de aprobación"));

            Pago pago = new Pago();
            pago.setIdPago(order.id());
            pago.setIdFactura(idFactura);
            pago.setFechaPago(LocalDate.now());
            pago.setEstadoPago(order.status());
            pago.setDetalle("Orden PayPal creada");
            pagoRepository.save(pago);

            return approvalLink;

        } catch (HttpException e) {
            throw new RuntimeException("Error al crear orden en PayPal: " + e.getMessage());
        }
    }

    public String capturarPago(String orderId) throws Exception {
        OrdersCaptureRequest request = new OrdersCaptureRequest(orderId);
        request.requestBody(new OrderRequest());

        try {
            HttpResponse<Order> response = payPalClient.execute(request);
            Order orden = response.result();

            Optional<Pago> pagoOpt = pagoRepository.findById(orderId);
            if (pagoOpt.isPresent()) {
                Pago pago = pagoOpt.get();
                pago.setEstadoPago(orden.status());
                pago.setDetalle("Pago capturado con PayPal");
                pagoRepository.save(pago);
            }

            return "Pago capturado exitosamente con ID: " + orden.id();
        } catch (HttpException e) {
            throw new RuntimeException("Error al capturar orden: " + e.getMessage());
        }
    }
}
