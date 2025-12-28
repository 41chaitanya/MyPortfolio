package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "otp_tokens")
public class OtpToken {
    
    @Id
    private String id;
    
    @Indexed
    private String email;
    
    private String otp;
    
    private String communitySlug;
    
    @Indexed(expireAfter = "0s")
    private LocalDateTime expiresAt;
    
    private LocalDateTime createdAt;
    
    private boolean used;
    
    public OtpToken(String email, String otp, String communitySlug) {
        this.email = email;
        this.otp = otp;
        this.communitySlug = communitySlug;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = LocalDateTime.now().plusMinutes(5); // 5 minutes validity
        this.used = false;
    }
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }
}
