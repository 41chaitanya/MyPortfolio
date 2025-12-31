package com.chaitanya.portfolio.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class GitHubService {

    @Value("${github.token:}")
    private String githubToken;

    @Value("${github.org:com-the-boys-dev}")
    private String githubOrg;

    @Value("${github.invitation.enabled:true}")
    private boolean invitationEnabled;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Send GitHub organization invitation to a user
     * @param githubUsername The GitHub username to invite
     * @return true if invitation sent successfully, false otherwise
     */
    public boolean sendOrgInvitation(String githubUsername) {
        if (!invitationEnabled) {
            log.warn("GitHub invitation is disabled. Skipping invitation for: {}", githubUsername);
            return false;
        }

        if (githubToken == null || githubToken.isEmpty()) {
            log.error("GitHub token not configured. Cannot send invitation.");
            return false;
        }

        if (githubUsername == null || githubUsername.isEmpty()) {
            log.warn("GitHub username is empty. Cannot send invitation.");
            return false;
        }

        // Extract username from GitHub URL if full URL provided
        String username = extractUsername(githubUsername);
        
        try {
            String url = String.format("https://api.github.com/orgs/%s/invitations", githubOrg);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + githubToken);
            headers.set("Accept", "application/vnd.github+json");
            headers.set("X-GitHub-Api-Version", "2022-11-28");

            Map<String, Object> body = new HashMap<>();
            body.put("invitee_id", getGitHubUserId(username));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            
            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("GitHub org invitation sent successfully to: {}", username);
                return true;
            } else {
                log.error("Failed to send GitHub invitation. Status: {}", response.getStatusCode());
                return false;
            }
        } catch (Exception e) {
            log.error("Error sending GitHub org invitation to {}: {}", username, e.getMessage());
            return false;
        }
    }

    /**
     * Get GitHub user ID from username
     */
    private Long getGitHubUserId(String username) {
        try {
            String url = String.format("https://api.github.com/users/%s", username);
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + githubToken);
            headers.set("Accept", "application/vnd.github+json");

            HttpEntity<Void> request = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Object id = response.getBody().get("id");
                if (id instanceof Number) {
                    return ((Number) id).longValue();
                }
            }
        } catch (Exception e) {
            log.error("Error getting GitHub user ID for {}: {}", username, e.getMessage());
        }
        throw new RuntimeException("Could not get GitHub user ID for: " + username);
    }

    /**
     * Extract username from GitHub URL or return as-is if already username
     */
    private String extractUsername(String githubInput) {
        if (githubInput == null) return null;
        
        // Remove trailing slash
        githubInput = githubInput.trim().replaceAll("/$", "");
        
        // If it's a URL, extract username
        if (githubInput.contains("github.com/")) {
            String[] parts = githubInput.split("github.com/");
            if (parts.length > 1) {
                // Get the first path segment (username)
                String path = parts[1];
                if (path.contains("/")) {
                    return path.split("/")[0];
                }
                return path;
            }
        }
        
        return githubInput;
    }
}
