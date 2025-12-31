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
        }
    }

    public void sendWelcomeEmail(String toEmail, String memberName, String communityName, String communitySlug) {
        log.info("Sending welcome email to: {} for community: {}", toEmail, communityName);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Welcome email not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🎉 Welcome to " + communityName + "!");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "Congratulations! Your request to join " + communityName + " has been APPROVED! 🚀\n\n" +
                "You're now officially part of the crew. Here's what you can do next:\n\n" +
                "✅ LOGIN TO YOUR PROFILE\n" +
                "Visit: https://41chaitanya.github.io/MyPortfolio/community/" + communitySlug + "\n" +
                "Click 'Login' and use your registered email to receive an OTP.\n\n" +
                "✅ UPDATE YOUR PROFILE\n" +
                "Once logged in, you can:\n" +
                "- Add your tech stack\n" +
                "- Update your social links\n" +
                "- Add your past work & contributions\n\n" +
                "✅ START CONTRIBUTING\n" +
                "Check out our GitHub organization and start contributing to projects!\n\n" +
                "Remember the rules:\n" +
                "• Contribute at least twice within 7 days\n" +
                "• Always use branches & PRs (no direct pushes to main)\n" +
                "• Be respectful and help fellow devs\n\n" +
                "Welcome aboard! Let's build something great together. 💪\n\n" +
                "— " + communityName + " Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\""
            );
            
            mailSender.send(message);
            log.info("Welcome email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send welcome email to {}: {}", toEmail, e.getMessage());
        }
    }

    public void sendNewProjectEmail(String toEmail, String memberName, String repoName, 
                                    String description, String repoUrl, String issuesUrl, 
                                    String creatorUsername) {
        log.info("Sending new project notification to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. New project email not sent.");
            return;
        }
        
        String desc = (description != null && !description.isEmpty()) 
            ? description 
            : "No description provided yet";
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🚀 New Project Alert: " + repoName + " | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "Exciting news! A new project has just been started in com.the-boys-dev! 🎉\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "📁 PROJECT: " + repoName + "\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "📝 DESCRIPTION:\n" + desc + "\n\n" +
                "👤 INITIATED BY: @" + creatorUsername + "\n\n" +
                "🔗 REPOSITORY:\n" + repoUrl + "\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🎯 HOW TO GET INVOLVED:\n\n" +
                "1️⃣ Check out the Issues section for tasks:\n" +
                "   " + issuesUrl + "\n\n" +
                "2️⃣ Pick an issue that matches your skills\n\n" +
                "3️⃣ Fork the repo, create a branch, and start coding!\n\n" +
                "4️⃣ Submit a PR when you're ready\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "We're welcoming all contributors! Whether you're a beginner or experienced dev, " +
                "there's something for everyone. Don't hesitate to ask questions in the issues " +
                "or reach out to the project creator.\n\n" +
                "Let's build something amazing together! 💪\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("New project email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send new project email to {}: {}", toEmail, e.getMessage());
        }
    }
}
