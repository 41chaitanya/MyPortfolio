package com.chaitanya.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${app.email.enabled:true}")
    private boolean emailEnabled;

    public void sendOtpEmail(String toEmail, String otp, String communityName) {
        // Log OTP for development/testing
        log.info("========================================");
        log.info("OTP for {}: {}", toEmail, otp);
        log.info("========================================");
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. OTP logged above.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Your Login OTP - " + communityName);
            message.setText(
                "Hello!\n\n" +
                "Your OTP for logging into " + communityName + " is:\n\n" +
                "🔐 " + otp + "\n\n" +
                "This OTP is valid for 5 minutes.\n\n" +
                "If you didn't request this, please ignore this email.\n\n" +
                "Best regards,\n" +
                communityName + " Team"
            );
            
            mailSender.send(message);
            log.info("OTP email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send OTP email to {}: {}", toEmail, e.getMessage());
            log.warn("Email failed but OTP is logged above for testing.");
            // Don't throw exception - allow login to continue with logged OTP
        }
    }
}
