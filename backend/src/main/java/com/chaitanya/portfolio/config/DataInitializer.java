package com.chaitanya.portfolio.config;

import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;

    @Override
    public void run(String... args) {
        // Only initialize if no members exist
        if (memberRepository.count() == 0) {
            log.info("Initializing default members...");
            initializeMembers();
        }
    }

    private void initializeMembers() {
        // com.the-boys-dev members
        List<Member> theBoysMembers = List.of(
            createMemberWithTech("Chaitanya Sharma", "chaitanya4141sharma@gmail.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg",
                "https://github.com/41chaitanya", "https://linkedin.com/in/41chaitanya",
                "Owner", List.of("Backend", "Frontend"), List.of("com.the-boys-dev", "debug-oist"),
                List.of(
                    new Member.PastWork("Portfolio Website", "Personal portfolio built with React, featuring interactive UI, community pages, and Spring Boot backend with MongoDB", "https://github.com/41chaitanya/MyPortfolio", "Project"),
                    new Member.PastWork("com.the-boys-dev Community", "Developer community platform with OTP authentication, member management, and GitHub integration", "https://github.com/com-the-boys-dev", "Project")
                ),
                List.of("Java", "Spring Boot", "React", "JavaScript", "MongoDB", "Docker")),
            
            createMember("Priyanshu Singh", "priyanshu@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/priyanshulink", null,
                "Member", List.of("Frontend"), List.of("com.the-boys-dev"),
                List.of()),
            
            createMember("Sakshi Pawar", "sakshi@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg",
                "https://github.com/sakshii893", null,
                "Member", List.of("Frontend", "Design"), List.of("com.the-boys-dev"),
                List.of()),
            
            createMember("Sanju Kumari", "sanju@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/etihtjvroehvdxdxxu8m.jpg",
                "https://github.com/sanjukumari11", null,
                "Member", List.of("Backend"), List.of("com.the-boys-dev"),
                List.of()),
            
            createMember("Shrey", "shrey@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/mesisgunr5y6x7pd5gcy.jpg",
                "https://github.com/shrey1184", null,
                "Member", List.of("Backend", "DevOps"), List.of("com.the-boys-dev"),
                List.of()),
            
            createMember("Shruti Panjiyara", "shruti@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg",
                "https://github.com/shrutipanjiyara13a", null,
                "Member", List.of("Frontend"), List.of("com.the-boys-dev"),
                List.of()),
            
            // New join requests - approved
            createMember("Aditya Giri", "aditya.2004.giri@gmail.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/GiriAditya14", "https://linkedin.com/in/adityagiri14",
                "Member", List.of("Backend"), List.of("com.the-boys-dev"),
                List.of()),
            
            createMember("Prakhar Bisen", "prakharbisen790@gmail.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/prakharbisen-coder", "https://www.linkedin.com/in/prakhar-bisen-34992b314",
                "Member", List.of("Backend"), List.of("com.the-boys-dev"),
                List.of()),
            
            createMember("Ashish Tiwari", "ashishinrewa@gmail.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/0xashishtiwari", "https://www.linkedin.com/in/ashiishtiwarii/",
                "Member", List.of("Backend"), List.of("com.the-boys-dev"),
                List.of())
        );

        // debug-oist members
        List<Member> debugOistMembers = List.of(
            createMember("Ashish Baghel", "ashish@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/nevernever69", null,
                "Owner", List.of("Backend", "DevOps"), List.of("debug-oist"),
                List.of()),
            
            createMember("Aryan Kumar", "aryan@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/AryanKumarOfficial", null,
                "Member", List.of("Frontend"), List.of("debug-oist"),
                List.of()),
            
            createMember("Devashish", "devashish@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/devashish2006", null,
                "Member", List.of("Backend"), List.of("debug-oist"),
                List.of()),
            
            createMember("Dhruv Bhardwaj", "dhruv@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/LogicIsPlantingBomb", null,
                "Member", List.of("Backend", "Frontend"), List.of("debug-oist"),
                List.of()),
            
            createMember("Nalin Dalal", "nalin@example.com",
                "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png",
                "https://github.com/NalinDalal", null,
                "Member", List.of("Backend"), List.of("debug-oist"),
                List.of())
        );

        memberRepository.saveAll(theBoysMembers);
        memberRepository.saveAll(debugOistMembers);
        
        log.info("Initialized {} members", theBoysMembers.size() + debugOistMembers.size());
    }

    private Member createMember(String name, String email, String image, String githubUrl,
                                 String linkedinUrl, String role, List<String> teams,
                                 List<String> communities, List<Member.PastWork> pastWork) {
        return createMemberWithTech(name, email, image, githubUrl, linkedinUrl, role, teams, communities, pastWork, new java.util.ArrayList<>());
    }

    private Member createMemberWithTech(String name, String email, String image, String githubUrl,
                                 String linkedinUrl, String role, List<String> teams,
                                 List<String> communities, List<Member.PastWork> pastWork, List<String> techStack) {
        Member member = new Member();
        member.setName(name);
        member.setEmail(email);
        member.setImage(image);
        member.setGithubUrl(githubUrl);
        member.setGithubUsername(githubUrl != null ? githubUrl.replace("https://github.com/", "").replace("/", "") : null);
        member.setLinkedinUrl(linkedinUrl);
        member.setRole(role);
        member.setTeams(teams);
        member.setTechStack(techStack);
        member.setCommunities(new java.util.ArrayList<>(communities));
        member.setPastWork(pastWork);
        member.setStatus("APPROVED");
        // Password is GitHub username by default
        member.setPassword(member.getGithubUsername());
        member.setJoinedAt(LocalDateTime.now());
        member.setCreatedAt(LocalDateTime.now());
        member.setUpdatedAt(LocalDateTime.now());
        return member;
    }
}
