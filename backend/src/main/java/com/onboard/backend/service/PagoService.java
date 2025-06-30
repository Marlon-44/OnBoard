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
    private EmailService emailService;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private PayPalHttpClient payPalClient;

    public static final String exitoso = "http://localhost:5173/pago/cancelado";
    public static final String cancelado = "http://localhost:5173/pago/exitoso";

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
                .returnUrl(exitoso)
                .cancelUrl(cancelado)
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

            Pago pago = new Pago();
            pago.setIdPago(order.id());
            pago.setIdFactura(idFactura);
            pago.setFechaPago(LocalDate.now());
            pago.setEstadoPago(order.status());
            factura.setEstadoPago(order.status());
            pago.setDetalle("Orden PayPal creada");
            pagoRepository.save(pago);

            // ✅ Devolver JSON con el orderId
            return "{\"orderId\": \"" + order.id() + "\"}";

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
            Capture capture = orden.purchaseUnits().get(0)
                    .payments().captures().get(0);

            String transactionId = capture.id();
            String status = capture.status();
            String payerEmail = orden.payer().email();
            String payerName = orden.payer().name().givenName() + " " + orden.payer().name().surname();

            Optional<Pago> pagoOpt = pagoRepository.findById(orderId);
            if (pagoOpt.isEmpty()) {
                throw new RuntimeException("No se encontró el pago con ID: " + orderId);
            }

            Pago pago = pagoOpt.get();
            Optional<Factura> facturaOpt = facturaRepository.findById(pago.getIdFactura());
            if (facturaOpt.isEmpty()) {
                throw new RuntimeException("No se encontró la factura con ID: " + pago.getIdFactura());
            }

            Factura factura = facturaOpt.get();

            pago.setEstadoPago(status);
            pago.setDetalle("Pago capturado: ID transacción " + transactionId);
            factura.setEstadoPago(status);

            if ("COMPLETED".equalsIgnoreCase(status)) {
                pago.setFechaPago(LocalDate.now());
            }

            pagoRepository.save(pago);
            facturaRepository.save(factura);

            emailService.enviarFacturaPorEmail(factura, payerName, payerEmail, "PayPal");

            return "Pago capturado exitosamente. Transacción: " + transactionId;

        } catch (HttpException e) {
            throw new RuntimeException("Error al capturar orden: " + e.getMessage());
        }
    }

    public List<Pago> obtenerTodosLosPagos() {
        return pagoRepository.findAll();
    }

}
