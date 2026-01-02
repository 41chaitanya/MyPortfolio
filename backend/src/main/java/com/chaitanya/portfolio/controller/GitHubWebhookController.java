package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.model.WeeklyStats;
import com.chaitanya.portfolio.repository.MemberRepository;
import com.chaitanya.portfolio.service.EmailService;
import com.chaitanya.portfolio.service.GitHubAnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/webhook")
@RequiredArgsConstructor
@Slf4j
public class GitHubWebhookController {

    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final GitHubAnalyticsService analyticsService;

    @Value("${github.webhook.secret:}")
    private String webhookSecret;

    /**
     * GitHub Webhook endpoint for repository events
     * Triggered when a new repo is created in the organization
     */
    @PostMapping("/github")
    public ResponseEntity<Map<String, String>> handleGitHubWebhook(
            @RequestHeader(value = "X-GitHub-Event", required = false) String event,
            @RequestHeader(value = "X-Hub-Signature-256", required = false) String signature,
            @RequestBody Map<String, Object> payload) {
        
        log.info("Received GitHub webhook event: {}", event);
        
        // Handle repository created event
        if ("repository".equals(event)) {
            String action = (String) payload.get("action");
            
            if ("created".equals(action)) {
                handleNewRepository(payload);
            }
        }
        
        // Handle ping event (for webhook setup verification)
        if ("ping".equals(event)) {
            log.info("GitHub webhook ping received - webhook is configured correctly!");
            return ResponseEntity.ok(Map.of("status", "pong", "message", "Webhook configured successfully"));
        }
        
        return ResponseEntity.ok(Map.of("status", "received"));
    }

    /**
     * Handle new repository creation
     */
    @SuppressWarnings("unchecked")
    private void handleNewRepository(Map<String, Object> payload) {
        try {
            Map<String, Object> repo = (Map<String, Object>) payload.get("repository");
            Map<String, Object> sender = (Map<String, Object>) payload.get("sender");
            
            String repoName = (String) repo.get("name");
            String repoDescription = (String) repo.get("description");
            String repoUrl = (String) repo.get("html_url");
            String issuesUrl = repoUrl + "/issues";
            String creatorUsername = (String) sender.get("login");
            String creatorAvatar = (String) sender.get("avatar_url");
            
            log.info("New repository created: {} by {}", repoName, creatorUsername);
            
            // Get all approved members of com.the-boys-dev
            List<Member> members = memberRepository.findByCommunitiesContainingAndStatus("com.the-boys-dev", "APPROVED");
            
            log.info("Sending new project notification to {} members", members.size());
            
            int sentCount = 0;
            for (Member member : members) {
                if (member.getEmail() != null && !member.getEmail().isEmpty()) {
                    try {
                        emailService    .sendNewProjectEmail(
                            member.getEmail(),
                            member.getName(),
                            repoName,
                            repoDescription,
                            repoUrl,
                            issuesUrl,
                            creatorUsername
                        );
                        sentCount++;
                        // Rate limiting
                        Thread.sleep(500);
                    } catch (Exception e) {
                        log.error("Failed to send email to {}: {}", member.getEmail(), e.getMessage());
                    }
                }
            }
            
            log.info("New project notification sent to {} members", sentCount);
            
        } catch (Exception e) {
            log.error("Error handling new repository webhook: {}", e.getMessage(), e);
        }
    }

    /**
     * Manual trigger endpoint for testing (admin only)
     */
    @PostMapping("/test-new-repo")
    public ResponseEntity<Map<String, Object>> testNewRepoNotification(
            @RequestBody Map<String, String> request) {
        
        String repoName = request.getOrDefault("repoName", "test-project");
        String description = request.getOrDefault("description", "A new exciting project");
        String repoUrl = request.getOrDefault("repoUrl", "https://github.com/com-the-boys-dev/" + repoName);
        String creator = request.getOrDefault("creator", "41chaitanya");
        
        List<Member> members = memberRepository.findByCommunitiesContainingAndStatus("com.the-boys-dev", "APPROVED");
        
        int sentCount = 0;
        for (Member member : members) {
            if (member.getEmail() != null && !member.getEmail().isEmpty()) {
                try {
                    emailService.sendNewProjectEmail(
                        member.getEmail(),
                        member.getName(),
                        repoName,
                        description,
                        repoUrl,
                        repoUrl + "/issues",
                        creator
                    );
                    sentCount++;
                    Thread.sleep(500);
                } catch (Exception e) {
                    log.error("Failed to send test email to {}: {}", member.getEmail(), e.getMessage());
                }
            }
        }
        
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Test notification sent",
            "emailsSent", sentCount,
            "totalMembers", members.size()
        ));
    }

    /**
     * Send leaderboard email to all members
     */
    @PostMapping("/send-leaderboard")
    public ResponseEntity<Map<String, Object>> sendLeaderboardEmail() {
        
        // Get current week's leaderboard
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        List<WeeklyStats> leaderboard = analyticsService.getLeaderboard(weekStart);
        
        if (leaderboard.isEmpty()) {
            return ResponseEntity.ok(Map.of(
                "status", "error",
                "message", "No leaderboard data available for this week"
            ));
        }
        
        // Get top 3
        String first = leaderboard.size() > 0 ? leaderboard.get(0).getGithubUsername() : "N/A";
        int firstScore = leaderboard.size() > 0 ? leaderboard.get(0).getTotalScore() : 0;
        
        String second = leaderboard.size() > 1 ? leaderboard.get(1).getGithubUsername() : "N/A";
        int secondScore = leaderboard.size() > 1 ? leaderboard.get(1).getTotalScore() : 0;
        
        String third = leaderboard.size() > 2 ? leaderboard.get(2).getGithubUsername() : "N/A";
        int thirdScore = leaderboard.size() > 2 ? leaderboard.get(2).getTotalScore() : 0;
        
        // Get all approved members
        List<Member> members = memberRepository.findByCommunitiesContainingAndStatus("com.the-boys-dev", "APPROVED");
        
        int sentCount = 0;
        for (Member member : members) {
            if (member.getEmail() != null && !member.getEmail().isEmpty()) {
                try {
                    emailService.sendLeaderboardEmail(
                        member.getEmail(),
                        member.getName(),
                        first, firstScore,
                        second, secondScore,
                        third, thirdScore
                    );
                    sentCount++;
                    Thread.sleep(500); // Rate limiting
                } catch (Exception e) {
                    log.error("Failed to send leaderboard email to {}: {}", member.getEmail(), e.getMessage());
                }
            }
        }
        
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Leaderboard emails sent",
            "emailsSent", sentCount,
            "totalMembers", members.size(),
            "leaderboard", Map.of(
                "first", first + " (" + firstScore + " pts)",
                "second", second + " (" + secondScore + " pts)",
                "third", third + " (" + thirdScore + " pts)"
            )
        ));
    }
}
