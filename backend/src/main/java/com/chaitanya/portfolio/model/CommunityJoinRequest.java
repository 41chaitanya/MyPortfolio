package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "community_join_requests")
public class CommunityJoinRequest {
    
    @Id
    private String id;
    
    private String communityName;
    private String email;
    private String githubUrl;
    private String linkedinUrl;
    private String contactNumber;
    private String status; // PENDING, APPROVED, REJECTED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public CommunityJoinRequest(String communityName, String email, String githubUrl, 
                                 String linkedinUrl, String contactNumber) {
        this.communityName = communityName;
        this.email = email;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.contactNumber = contactNumber;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
