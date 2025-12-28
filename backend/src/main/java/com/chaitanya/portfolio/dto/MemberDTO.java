package com.chaitanya.portfolio.dto;

import lombok.Data;
import java.util.List;

@Data
public class MemberDTO {
    private String id;
    private String name;
    private String email;
    private String image;
    private String githubUrl;
    private String linkedinUrl;
    private String role;
    private List<String> teams;
    private List<PastWorkDTO> pastWork;
    
    @Data
    public static class PastWorkDTO {
        private String title;
        private String description;
        private String url;
        private String type;
    }
}
