package com.chaitanya.portfolio.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
@Slf4j
public class GitHubService {

    private final RestTemplate restTemplate = new RestTemplate();
    
    @Value("${github.token:}")
    private String githubToken;

    private static final Map<String, String> ORG_REPOS = Map.of(
        "com.the-boys-dev", "com-the-boys-dev/join-requests",
        "debug-oist", "Nev-Labs/join-requests"
    );

    public Integer createJoinRequestIssue(String name, String email, String githubUsername, 
                                           String githubUrl, String linkedinUrl, 
                                           String contactNumber, List<String> teams, String communitySlug) {
        String repo = ORG_REPOS.get(communitySlug);
        if (repo == null || githubToken.isEmpty()) {
            log.warn("No repo or token for {}", communitySlug);
            return null;
        }
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(githubToken);
            headers.set("Accept", "application/vnd.github+json");

            Map<String, Object> body = new HashMap<>();
            body.put("title", "Join Request: " + name);
            body.put("body", String.format(
                "## Join Request\n\n**Name:** %s\n**Email:** %s\n**GitHub:** [@%s](%s)\n**LinkedIn:** %s\n**Contact:** %s\n**Teams:** %s\n\n---\nApprove: add `approved` label. Reject: add `rejected` label.",
                name, email, githubUsername, githubUrl, linkedinUrl != null ? linkedinUrl : "N/A", contactNumber, String.join(", ", teams)
            ));
            body.put("labels", List.of("join-request", "pending"));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.github.com/repos/" + repo + "/issues", HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return (Integer) response.getBody().get("number");
            }
        } catch (Exception e) {
            log.error("GitHub issue creation failed: {}", e.getMessage());
        }
        return null;
    }

    public Map<String, Object> getGitHubUser(String username) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/vnd.github+json");
            if (!githubToken.isEmpty()) headers.setBearerAuth(githubToken);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.github.com/users/" + username, HttpMethod.GET, new HttpEntity<>(headers), Map.class);
            return response.getBody();
        } catch (Exception e) {
            log.error("Failed to fetch GitHub user: {}", e.getMessage());
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getOrgMembers(String orgName) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/vnd.github+json");
            if (!githubToken.isEmpty()) headers.setBearerAuth(githubToken);
            
            ResponseEntity<List> response = restTemplate.exchange(
                "https://api.github.com/orgs/" + orgName + "/members", HttpMethod.GET, new HttpEntity<>(headers), List.class);
            return response.getBody();
        } catch (Exception e) {
            log.error("Failed to fetch org members: {}", e.getMessage());
            return List.of();
        }
    }
}
