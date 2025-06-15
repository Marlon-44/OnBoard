package com.onboard.backend.service;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void enviarCorreoRegistro(String toEmail, String nombreUsuario) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("🎉 Welcome to OnBoard");
            helper.setFrom("onboardnotifications@gmail.com");

            Context context = new Context();
            context.setVariable("nombre", nombreUsuario);

            String contenidoHtml = templateEngine.process("email/registro", context);

            helper.setText(contenidoHtml, true);

            mailSender.send(mensaje);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
