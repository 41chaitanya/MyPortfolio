package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "members")
public class Member {
    
    @Id
    private String id;
    
    private String name;
    private String email;
    private String image;
    private String githubUrl;
    private String githubUsername;
    private String linkedinUrl;
    private String contactNumber;
    private String role; // Owner, Member, Admin
    private List<String> teams; // Backend, Frontend, DevOps, Design, etc.
    private List<String> techStack; // JavaScript, React, Node.js, etc.
    private List<String> communities; // community slugs
    private List<PastWork> pastWork;
    private String status; // PENDING, APPROVED, REJECTED
    private String password; // Default is GitHub username, can be changed
    private LocalDateTime joinedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PastWork {
        private String title;
        private String description;
        private String url;
        private String type; // Project, Hackathon, Contribution
    }
    
    // Constructor for new join request
    public Member(String name, String email, String githubUrl, String linkedinUrl, 
                  String contactNumber, String communitySlug, List<String> teams) {
        this.name = name;
        this.email = email;
        this.githubUrl = githubUrl;
        this.githubUsername = extractGithubUsername(githubUrl);
        this.linkedinUrl = linkedinUrl;
        this.contactNumber = contactNumber;
        this.role = "Member";
        this.teams = teams != null ? teams : new ArrayList<>();
        this.communities = new ArrayList<>(List.of(communitySlug));
        this.pastWork = new ArrayList<>();
        this.status = "PENDING";
        this.password = extractGithubUsername(githubUrl); // Default password is GitHub username
        this.image = "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    private String extractGithubUsername(String url) {
        if (url == null) return null;
        return url.replace("https://github.com/", "").replace("/", "");
    }
}
