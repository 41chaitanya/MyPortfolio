package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.JoinCommunityRequest;
import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final GitHubService gitHubService;

    // Default avatar images
    private static final String MALE_AVATAR = "https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png";

    public Member createMemberFromJoinRequest(JoinCommunityRequest request) {
        Optional<Member> existing = memberRepository.findByEmail(request.getEmail());
        
        if (existing.isPresent()) {
            Member member = existing.get();
            if (!member.getCommunities().contains(request.getCommunityName())) {
                member.getCommunities().add(request.getCommunityName());
                member.setUpdatedAt(LocalDateTime.now());
                return memberRepository.save(member);
            }
            return member;
        }
        
        Member member = new Member(
            request.getName(),
            request.getEmail(),
            request.getGithubUrl(),
            request.getLinkedinUrl(),
            request.getContactNumber(),
            request.getCommunityName(),
            request.getTeams()
        );
        
        // Set tech stack and image
        member.setTechStack(request.getTechStack() != null ? request.getTechStack() : new ArrayList<>());
        // Use provided image or default
        String imageUrl = request.getImage() != null && !request.getImage().isEmpty() 
            ? request.getImage() 
            : MALE_AVATAR;
        member.setImage(imageUrl);
        
        Member saved = memberRepository.save(member);
        log.info("Member created: {}", saved.getId());
        return saved;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Member> getMembersByCommunity(String communitySlug) {
        return memberRepository.findByCommunitiesContainingAndStatus(communitySlug, "APPROVED");
    }

    public List<Member> getPendingMembersByCommunity(String communitySlug) {
        return memberRepository.findByCommunitiesContainingAndStatus(communitySlug, "PENDING");
    }

    public List<Member> getPendingMembers() {
        return memberRepository.findByStatus("PENDING");
    }

    public List<Member> getAllMembersByCommunity(String communitySlug) {
        return memberRepository.findByCommunitiesContaining(communitySlug);
    }

    public Optional<Member> getMemberById(String id) {
        return memberRepository.findById(id);
    }

    public Member updateMemberStatus(String id, String status) {
        Member member = memberRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        
        String previousStatus = member.getStatus();
        member.setStatus(status);
        member.setUpdatedAt(LocalDateTime.now());
        
        if (status.equals("APPROVED")) {
            member.setJoinedAt(LocalDateTime.now());
            
            // Send welcome email if status changed to APPROVED
            if (!"APPROVED".equals(previousStatus) && member.getEmail() != null) {
                String communitySlug = member.getCommunities().isEmpty() ? "com.the-boys-dev" : member.getCommunities().get(0);
                String communityName = getCommunityDisplayName(communitySlug);
                emailService.sendWelcomeEmail(member.getEmail(), member.getName(), communityName, communitySlug);
                
                // Send GitHub organization invitation
                if (member.getGithubUrl() != null && !member.getGithubUrl().isEmpty()) {
                    boolean inviteSent = gitHubService.sendOrgInvitation(member.getGithubUrl());
                    if (inviteSent) {
                        log.info("GitHub org invitation sent to: {}", member.getGithubUrl());
                    } else {
                        log.warn("Failed to send GitHub org invitation to: {}", member.getGithubUrl());
                    }
                }
            }
        }
        return memberRepository.save(member);
    }

    private String getCommunityDisplayName(String slug) {
        if ("com.the-boys-dev".equals(slug)) {
            return "com.the-boys-dev";
        } else if ("debug-oist".equals(slug)) {
            return "OIST Programming Club";
        }
        return slug;
    }

    public Member updateMember(String id, Member updated) {
        Member member = memberRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        if (updated.getName() != null) member.setName(updated.getName());
        if (updated.getEmail() != null) member.setEmail(updated.getEmail());
        if (updated.getImage() != null) member.setImage(updated.getImage());
        if (updated.getRole() != null) member.setRole(updated.getRole());
        if (updated.getTeams() != null) member.setTeams(updated.getTeams());
        if (updated.getPastWork() != null) member.setPastWork(updated.getPastWork());
        if (updated.getCommunities() != null) member.setCommunities(updated.getCommunities());
        if (updated.getTechStack() != null) member.setTechStack(updated.getTechStack());
        if (updated.getGithubUrl() != null) member.setGithubUrl(updated.getGithubUrl());
        if (updated.getLinkedinUrl() != null) member.setLinkedinUrl(updated.getLinkedinUrl());
        if (updated.getContactNumber() != null) member.setContactNumber(updated.getContactNumber());
        member.setUpdatedAt(LocalDateTime.now());
        return memberRepository.save(member);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }

    public Member authenticate(String email, String password, String communitySlug) {
        return memberRepository.findByEmail(email)
            .filter(m -> m.getPassword() != null && m.getPassword().equals(password))
            .filter(m -> m.getCommunities().contains(communitySlug))
            .filter(m -> "APPROVED".equals(m.getStatus()))
            .orElse(null);
    }

    public Member changePassword(String email, String newPassword) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        member.setPassword(newPassword);
        member.setUpdatedAt(LocalDateTime.now());
        return memberRepository.save(member);
    }

    public void kickFromCommunity(String memberId, String communitySlug) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        member.getCommunities().remove(communitySlug);
        if (member.getCommunities().isEmpty()) {
            memberRepository.deleteById(memberId);
        } else {
            member.setUpdatedAt(LocalDateTime.now());
            memberRepository.save(member);
        }
    }

    public int sendWelcomeEmailToAllApprovedMembers(String communitySlug) {
        List<Member> approvedMembers = memberRepository.findByCommunitiesContainingAndStatus(communitySlug, "APPROVED");
        int sentCount = 0;
        String communityName = getCommunityDisplayName(communitySlug);
        
        for (Member member : approvedMembers) {
            if (member.getEmail() != null && !member.getEmail().isEmpty()) {
                try {
                    emailService.sendWelcomeEmail(member.getEmail(), member.getName(), communityName, communitySlug);
                    sentCount++;
                    log.info("Welcome email sent to: {}", member.getEmail());
                    Thread.sleep(1000);
                } catch (Exception e) {
                    log.error("Failed to send email to {}: {}", member.getEmail(), e.getMessage());
                }
            }
        }
        return sentCount;
    }

    public int sendMeetingInvitationToMembers(String communitySlug, String meetingLink, 
                                              String agenda, String dateTime, String excludeGithubUsername) {
        List<Member> approvedMembers = memberRepository.findByCommunitiesContainingAndStatus(communitySlug, "APPROVED");
        int sentCount = 0;
        
        for (Member member : approvedMembers) {
            // Skip if this member should be excluded
            if (excludeGithubUsername != null && !excludeGithubUsername.isEmpty()) {
                String memberGithubUsername = extractGithubUsername(member.getGithubUrl());
                if (memberGithubUsername != null && memberGithubUsername.equalsIgnoreCase(excludeGithubUsername)) {
                    log.info("Skipping meeting invitation for excluded member: {}", member.getName());
                    continue;
                }
            }
            
            if (member.getEmail() != null && !member.getEmail().isEmpty()) {
                try {
                    emailService.sendMeetingInvitation(member.getEmail(), member.getName(), 
                                                      meetingLink, agenda, dateTime);
                    sentCount++;
                    log.info("Meeting invitation sent to: {}", member.getEmail());
                    Thread.sleep(1000); // Rate limiting
                } catch (Exception e) {
                    log.error("Failed to send meeting invitation to {}: {}", member.getEmail(), e.getMessage());
                }
            }
        }
        return sentCount;
    }

    public int sendUrgentMeetingReminder(String communitySlug, String meetingLink, String excludeGithubUsername) {
        List<Member> approvedMembers = memberRepository.findByCommunitiesContainingAndStatus(communitySlug, "APPROVED");
        int sentCount = 0;
        
        for (Member member : approvedMembers) {
            // Skip if this member should be excluded
            if (excludeGithubUsername != null && !excludeGithubUsername.isEmpty()) {
                String memberGithubUsername = extractGithubUsername(member.getGithubUrl());
                if (memberGithubUsername != null && memberGithubUsername.equalsIgnoreCase(excludeGithubUsername)) {
                    log.info("Skipping urgent reminder for excluded member: {}", member.getName());
                    continue;
                }
            }
            
            if (member.getEmail() != null && !member.getEmail().isEmpty()) {
                try {
                    emailService.sendUrgentMeetingReminder(member.getEmail(), member.getName(), meetingLink);
                    sentCount++;
                    log.info("Urgent meeting reminder sent to: {}", member.getEmail());
                    Thread.sleep(1000); // Rate limiting
                } catch (Exception e) {
                    log.error("Failed to send urgent reminder to {}: {}", member.getEmail(), e.getMessage());
                }
            }
        }
        return sentCount;
    }

    public int removeNonLeadershipMembers(String communitySlug) {
        List<Member> approvedMembers = memberRepository.findByCommunitiesContainingAndStatus(communitySlug, "APPROVED");
        int removedCount = 0;
        int emailsSent = 0;
        
        // Leadership team first names to keep
        List<String> leadershipNames = List.of(
            "chaitanya", "harshawardhan", "shrey", 
            "sakshi", "vansh", "rishab", "nitin", "ujwal", "nikita"
        );
        
        // Exclude from email (but still remove)
        String excludeFromEmail = "dhruv";
        
        for (Member member : approvedMembers) {
            String firstName = member.getName().toLowerCase().split(" ")[0];
            
            // Check if member is in leadership
            boolean isLeadership = leadershipNames.stream()
                .anyMatch(name -> firstName.contains(name) || name.contains(firstName));
            
            if (!isLeadership) {
                // Send farewell email (except to Dhruv)
                if (!firstName.contains(excludeFromEmail) && 
                    member.getEmail() != null && !member.getEmail().isEmpty()) {
                    try {
                        emailService.sendFarewellEmail(member.getEmail(), member.getName());
                        emailsSent++;
                        log.info("Farewell email sent to: {}", member.getName());
                        Thread.sleep(1000); // Rate limiting
                    } catch (Exception e) {
                        log.error("Failed to send farewell email to {}: {}", member.getName(), e.getMessage());
                    }
                }
                
                // Remove member from community
                member.getCommunities().remove(communitySlug);
                if (member.getCommunities().isEmpty()) {
                    member.setStatus("REMOVED");
                }
                memberRepository.save(member);
                removedCount++;
                log.info("Removed member from community: {}", member.getName());
            }
        }
        
        log.info("Removed {} members, sent {} farewell emails", removedCount, emailsSent);
        return removedCount;
    }

    private String extractGithubUsername(String githubUrl) {
        if (githubUrl == null || githubUrl.isEmpty()) {
            return null;
        }
        // Extract username from GitHub URL (e.g., https://github.com/username)
        String[] parts = githubUrl.split("/");
        if (parts.length > 0) {
            return parts[parts.length - 1];
        }
        return null;
    }
}
