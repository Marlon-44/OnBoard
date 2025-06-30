package com.onboard.backend.service;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.onboard.backend.entity.Factura;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

@Service
public class PdfService {

    public byte[] generarFacturaPdf(Factura factura, String nombreCliente, String correoCliente, String metodoPago) {
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);

            document.open();

            Font titulo = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font normal = new Font(Font.FontFamily.HELVETICA, 12);

            document.add(new Paragraph("Factura Electrónica", titulo));
            document.add(new Paragraph("Fecha de emisión: " + factura.getFechaEmision(), normal));
            document.add(new Paragraph("Cliente: " + nombreCliente, normal));
            document.add(new Paragraph("Correo: " + correoCliente, normal));
            document.add(new Paragraph("ID Reserva: " + factura.getIdReserva(), normal));
            document.add(new Paragraph("Método de pago: " + metodoPago, normal));
            document.add(new Paragraph("Total pagado: $" + factura.getTotal() + " USD", normal));

            document.add(Chunk.NEWLINE);
            document.add(new Paragraph("Gracias por utilizar OnBoard.", normal));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF de la factura", e);
        }
    }
}
