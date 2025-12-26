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
    
    @Value("${app.contact.recipient-email}")
    private String recipientEmail;
    
    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendContactEmail(String name, String email, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject("Portfolio Contact: Message from " + name);
            mailMessage.setText(String.format(
                "New contact message from your portfolio:\n\n" +
                "Name: %s\n" +
                "Email: %s\n\n" +
                "Message:\n%s",
                name, email, message
            ));
            
            mailSender.send(mailMessage);
            log.info("Contact email sent successfully from: {}", email);
        } catch (Exception e) {
            log.error("Failed to send contact email: {}", e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendJoinRequestEmail(String communityName, String email, String githubUrl, 
                                      String linkedinUrl, String contactNumber) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject("Community Join Request: " + communityName);
            mailMessage.setText(String.format(
                "New community join request:\n\n" +
                "Community: %s\n" +
                "Email: %s\n" +
                "GitHub: %s\n" +
                "LinkedIn: %s\n" +
                "Contact: %s",
                communityName, email, githubUrl, 
                linkedinUrl != null ? linkedinUrl : "Not provided", 
                contactNumber
            ));
            
            mailSender.send(mailMessage);
            log.info("Join request email sent for community: {}", communityName);
        } catch (Exception e) {
            log.error("Failed to send join request email: {}", e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
