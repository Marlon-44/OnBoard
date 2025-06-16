package com.onboard.backend.service;

import jakarta.mail.internet.MimeMessage;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.onboard.backend.entity.EstadoVerificacion;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private static final String LOGO_URL = "https://static.vecteezy.com/system/resources/previews/048/525/793/non_2x/realistic-sport-car-isolated-on-background-3d-rendering-illustration-png.png";

    @Autowired
    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void enviarCorreoEstado(String toEmail, String nombreUsuario, EstadoVerificacion estado) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setFrom("onboardnotifications@gmail.com");

            String plantilla;
            String asunto;

            switch (estado) {
                case APROBADO -> {
                    plantilla = "email/aprobado";
                    asunto = "✅ Your account has been approved!";
                }
                case RECHAZADO -> {
                    plantilla = "email/rechazado";
                    asunto = "❌ Your account registration was rejected";
                }
                case INACTIVO -> {
                    plantilla = "email/eliminado";
                    asunto = "🗑️ Your account has been deleted";
                }
                case SUSPENDIDO -> {
                    plantilla = "email/suspendido";
                    asunto = "⚠️ Your account has been suspended";
                }
                default -> {
                    plantilla = "email/pendiente";
                    asunto = "🎉 Welcome to OnBoard!";
                }
            }

            helper.setSubject(asunto);

            Context context = new Context();
            context.setVariable("nombre", nombreUsuario);
            context.setVariable("logoUrl", LOGO_URL);

            String contenidoHtml = templateEngine.process(plantilla, context);
            helper.setText(contenidoHtml, true);

            mailSender.send(mensaje);

        } catch (Exception e) {
            logger.error("Error sending {} email to user {} <{}>", estado.name(), nombreUsuario, toEmail, e);
        }
    }

}
