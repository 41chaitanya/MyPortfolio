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
@Document(collection = "contact_messages")
public class ContactMessage {
    
    @Id
    private String id;
    
    private String name;
    private String email;
    private String message;
    private LocalDateTime createdAt;
    private boolean read;
    
    public ContactMessage(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = LocalDateTime.now();
        this.read = false;
    }
}
