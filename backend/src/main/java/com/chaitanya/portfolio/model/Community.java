package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "communities")
public class Community {
    
    @Id
    private String id;
    
    private String slug;
    private String name;
    private String logo;
    private String color;
    private String description;
    private String wallpaper;
    private Integer followers;
    private String website;
    private String discordUrl;
    private String discordJoinUrl;
    private String discordChannelUrl;
    private String githubOrgName;
    private String githubOrgUrl;
    private String ownerEmail;
    private List<Member> members;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Member {
        private String name;
        private String role;
        private String github;
        private String image;
    }
}
