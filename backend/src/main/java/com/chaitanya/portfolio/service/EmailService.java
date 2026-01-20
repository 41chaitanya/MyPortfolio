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

    public void sendLeaderboardEmail(String toEmail, String memberName, 
                                     String first, int firstScore,
                                     String second, int secondScore,
                                     String third, int thirdScore) {
        log.info("Sending leaderboard notification to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Leaderboard email not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🏆 Weekly Leaderboard Update | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "Here's the current leaderboard for com.the-boys-dev! 🔥\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🏆 WEEKLY LEADERBOARD\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🥇 1st Place: @" + first + " — " + firstScore + " points\n\n" +
                "🥈 2nd Place: @" + second + " — " + secondScore + " points\n\n" +
                "🥉 3rd Place: @" + third + " — " + thirdScore + " points\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "📊 Points are calculated based on:\n" +
                "• Commits: 1 point each\n" +
                "• PRs Merged: 3 points each\n" +
                "• Issues Closed: 2 points each\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🎯 WHAT ARE YOU WAITING FOR?\n\n" +
                "Start contributing now! Here's how:\n\n" +
                "1️⃣ Check existing repos and pick an issue:\n" +
                "   https://github.com/com-the-boys-dev\n\n" +
                "2️⃣ Or start a NEW project in the organization!\n" +
                "   Create a repo and we'll notify everyone.\n\n" +
                "3️⃣ Every commit, PR, and issue counts towards your score!\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "The leaderboard resets every week. This is YOUR chance to climb to the top! 🚀\n\n" +
                "Let's build something amazing together! 💪\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "📊 Analytics: https://41chaitanya.github.io/MyPortfolio/analytics\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Leaderboard email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send leaderboard email to {}: {}", toEmail, e.getMessage());
        }
    }

    public void sendMeetingInvitation(String toEmail, String memberName, String meetingLink, 
                                      String agenda, String dateTime) {
        log.info("Sending meeting invitation to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Meeting invitation not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("📅 Community Meeting Invitation | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "You're invited to an important community meeting! 🎯\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "📅 MEETING DETAILS\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "📌 AGENDA:\n" + agenda + "\n\n" +
                "🕐 DATE & TIME:\n" + dateTime + "\n\n" +
                "🔗 MEETING LINK:\n" + meetingLink + "\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🎯 WHY THIS MEETING MATTERS:\n\n" +
                "This is your chance to:\n" +
                "• Get assigned important roles in the community\n" +
                "• Take on leadership positions\n" +
                "• Shape the future direction of our projects\n" +
                "• Voice your ideas and suggestions\n\n" +
                "Your presence and input are valuable to us! 💪\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "⚠️ IMPORTANT:\n" +
                "Please try to attend on time. If you can't make it, let us know in advance.\n\n" +
                "See you there! 🚀\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Meeting invitation sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send meeting invitation to {}: {}", toEmail, e.getMessage());
        }
    }

    public void sendUrgentMeetingReminder(String toEmail, String memberName, String meetingLink) {
        log.info("Sending URGENT meeting reminder to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Urgent meeting reminder not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🚨 URGENT: Last Call for Community Meeting - JOIN NOW! | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "🚨 🚨 🚨 URGENT REMINDER 🚨 🚨 🚨\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "⏰ MEETING IS HAPPENING NOW!\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🔴 LAST TIME TO JOIN: 10:25 PM TODAY\n\n" +
                "🔗 JOIN IMMEDIATELY:\n" + meetingLink + "\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "⚠️ ⚠️ ⚠️ CRITICAL NOTICE ⚠️ ⚠️ ⚠️\n\n" +
                "ONLY THOSE WHO ATTEND THIS MEETING WILL REMAIN IN THE COMMUNITY!\n\n" +
                "If you haven't joined yet, JOIN NOW! This is your FINAL CHANCE.\n\n" +
                "Members who do not attend will be removed from com.the-boys-dev.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "📌 WHAT'S AT STAKE:\n" +
                "• Your membership in the community\n" +
                "• Role assignments and responsibilities\n" +
                "• Leadership positions\n" +
                "• Future opportunities\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🔗 CLICK HERE TO JOIN NOW:\n" + meetingLink + "\n\n" +
                "Don't miss this! Your community needs you! 🚀\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Urgent meeting reminder sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send urgent meeting reminder to {}: {}", toEmail, e.getMessage());
        }
    }

    public void sendFarewellEmail(String toEmail, String memberName) {
        log.info("Sending farewell email to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Farewell email not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Thank You & Best Wishes | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "💙 THANK YOU FOR BEING PART OF OUR JOURNEY\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "It was truly wonderful having you as part of com.the-boys-dev. 🌟\n\n" +
                "We appreciate the time you spent with us and the energy you brought to the community.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🎯 MOVING FORWARD:\n\n" +
                "As we restructure and focus on our core team, we're making some changes to our community roster.\n\n" +
                "While you won't be continuing with us, we want you to know that this doesn't diminish the value you brought.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "✨ BEST WISHES:\n\n" +
                "We wish you all the best for your future endeavors! 🚀\n\n" +
                "May you find amazing opportunities and continue to grow as a developer.\n\n" +
                "Keep building, keep learning, and keep pushing boundaries! 💪\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "If our paths cross again in the future, we'd be happy to collaborate.\n\n" +
                "Until then, stay awesome and keep coding! 💻\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Portfolio: https://41chaitanya.github.io/MyPortfolio/\n" +
                "💻 GitHub: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Farewell email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send farewell email to {}: {}", toEmail, e.getMessage());
        }
    }

    public void sendApologyAndReaddEmail(String toEmail, String memberName, String role) {
        log.info("Sending apology and re-add email to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Apology email not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🙏 Our Sincere Apologies - Welcome Back! | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🙏 WE OWE YOU AN APOLOGY\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "We made a mistake. 😔\n\n" +
                "You were mistakenly removed from com.the-boys-dev during our recent restructuring.\n\n" +
                "This was completely our error, and we sincerely apologize for any confusion or inconvenience this may have caused.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🎉 WELCOME BACK!\n\n" +
                "You have been re-added to the community, and we're excited to have you back! 🚀\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🏆 YOUR NEW ROLE:\n\n" +
                "We're pleased to announce that you've been assigned as:\n\n" +
                "👉 " + role + "\n\n" +
                "This is a leadership position, and we believe you're the perfect fit for it!\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "🎯 WHAT'S NEXT:\n\n" +
                "• Your profile is active again\n" +
                "• You can login at: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "• Your leadership role is now visible on the community page\n" +
                "• Start contributing and leading your team!\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Once again, we deeply apologize for the confusion. We value your contributions and are thrilled to have you as part of our leadership team! 💪\n\n" +
                "Let's build something amazing together! 🔥\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Apology and re-add email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send apology email to {}: {}", toEmail, e.getMessage());
        }
    }

    public void sendNewJoinRequestNotification(String adminEmail, String adminName, 
                                               String memberName, String memberEmail, 
                                               String memberGithub, String memberLinkedin,
                                               String memberContact, String teams, String techStack) {
        log.info("Sending new join request notification to admin: {}", adminEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Join request notification not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(adminEmail);
            message.setSubject("🔔 New Join Request - Action Required | com.the-boys-dev");
            message.setText(
                "Hey " + adminName + "! 👋\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🔔 NEW MEMBER JOIN REQUEST\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "A new developer wants to join com.the-boys-dev! 🚀\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "📋 APPLICANT DETAILS:\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "👤 Name: " + memberName + "\n" +
                "📧 Email: " + memberEmail + "\n" +
                "💻 GitHub: " + (memberGithub != null && !memberGithub.isEmpty() ? memberGithub : "Not provided") + "\n" +
                "🔗 LinkedIn: " + (memberLinkedin != null && !memberLinkedin.isEmpty() ? memberLinkedin : "Not provided") + "\n" +
                "📱 Contact: " + (memberContact != null && !memberContact.isEmpty() ? memberContact : "Not provided") + "\n\n" +
                "🎯 Teams: " + (teams != null && !teams.isEmpty() ? teams : "Not specified") + "\n" +
                "💡 Tech Stack: " + (techStack != null && !techStack.isEmpty() ? techStack : "Not specified") + "\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "⚡ ACTION REQUIRED:\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Please review this application and take action:\n\n" +
                "1️⃣ Login to the community page:\n" +
                "   https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n\n" +
                "2️⃣ Click on 'Admin' button (top right)\n\n" +
                "3️⃣ Review the pending request\n\n" +
                "4️⃣ APPROVE ✅ or REJECT ❌ the application\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "⏰ Please review this request at your earliest convenience.\n\n" +
                "— com.the-boys-dev Team\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Join request notification sent to admin: {}", adminEmail);
        } catch (Exception e) {
            log.error("Failed to send join request notification to {}: {}", adminEmail, e.getMessage());
        }
    }

    public void sendAdminRightsEmail(String toEmail, String memberName) {
        log.info("Sending admin rights notification to: {}", toEmail);
        
        if (!emailEnabled) {
            log.warn("Email sending is disabled. Admin rights email not sent.");
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🎉 You've Been Promoted to Admin! | com.the-boys-dev");
            message.setText(
                "Hey " + memberName + "! 👋\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🎉 CONGRATULATIONS - YOU'RE NOW AN ADMIN!\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "We're excited to announce that you've been promoted to Admin of com.the-boys-dev! 🚀\n\n" +
                "This is a significant responsibility, and we trust you to help manage and grow our community.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🔑 YOUR NEW ADMIN RIGHTS:\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "As an Admin, you now have the following powers:\n\n" +
                "✅ APPROVE NEW MEMBERS\n" +
                "   • Review join requests from new developers\n" +
                "   • Approve qualified candidates\n" +
                "   • They'll receive welcome emails automatically\n\n" +
                "❌ REJECT APPLICATIONS\n" +
                "   • Decline applications that don't meet criteria\n" +
                "   • Keep the community quality high\n\n" +
                "✏️ EDIT MEMBER PROFILES\n" +
                "   • Update member information\n" +
                "   • Fix incorrect details\n" +
                "   • Assign roles and teams\n\n" +
                "🗑️ REMOVE MEMBERS\n" +
                "   • Kick inactive or problematic members\n" +
                "   • Maintain community standards\n\n" +
                "📧 EMAIL NOTIFICATIONS\n" +
                "   • You'll receive emails for every new join request\n" +
                "   • Stay updated on community growth\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🎯 HOW TO USE YOUR ADMIN PANEL:\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "1️⃣ LOGIN:\n" +
                "   Visit: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "   Click 'Login' and use your email to receive OTP\n\n" +
                "2️⃣ ACCESS ADMIN PANEL:\n" +
                "   After login, click the 'Admin' button (top right corner)\n\n" +
                "3️⃣ REVIEW PENDING REQUESTS:\n" +
                "   • See all pending join requests\n" +
                "   • View applicant details (GitHub, LinkedIn, tech stack)\n" +
                "   • Click ✅ to approve or ❌ to reject\n\n" +
                "4️⃣ MANAGE EXISTING MEMBERS:\n" +
                "   • View all community members\n" +
                "   • Click 'Edit' to modify member details\n" +
                "   • Click 'Kick' to remove members\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "⚠️ IMPORTANT GUIDELINES:\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "• Review applications carefully before approving\n" +
                "• Check GitHub profiles for genuine contributions\n" +
                "• Ensure applicants have relevant skills\n" +
                "• Be fair and professional in all decisions\n" +
                "• Communicate with the founder if unsure\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "We're counting on you to help build an amazing community! 💪\n\n" +
                "If you have any questions or need help, feel free to reach out.\n\n" +
                "Welcome to the leadership team! 🎉\n\n" +
                "— Chaitanya Sharma\n" +
                "Founder & CEO, com.the-boys-dev\n\n" +
                "\"We're not here to save the world. We're here to build it.\"\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "🌐 Community: https://41chaitanya.github.io/MyPortfolio/community/com.the-boys-dev\n" +
                "💻 GitHub Org: https://github.com/com-the-boys-dev"
            );
            
            mailSender.send(message);
            log.info("Admin rights email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send admin rights email to {}: {}", toEmail, e.getMessage());
        }
    }
}
