package com.chaitanya.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class JoinCommunityRequest {
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Community name is required")
    private String communityName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "GitHub URL is required")
    private String githubUrl;
    
    private String linkedinUrl;
    
    @NotBlank(message = "Contact number is required")
    private String contactNumber;
    
    private List<String> teams; // Backend, Frontend, Design, DevOps, etc.
    private List<String> techStack; // JavaScript, React, Node.js, etc.
    private String image; // Cloudinary URL
}
