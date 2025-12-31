package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponse;
import com.chaitanya.portfolio.dto.ChangePasswordRequest;
import com.chaitanya.portfolio.dto.JoinCommunityRequest;
import com.chaitanya.portfolio.dto.LoginRequest;
import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // Submit join request (creates pending member)
    @PostMapping("/join")
    public ResponseEntity<ApiResponse> submitJoinRequest(@Valid @RequestBody JoinCommunityRequest request) {
        try {
            Member member = memberService.createMemberFromJoinRequest(request);
            return ResponseEntity.ok(ApiResponse.success("Join request submitted successfully!", member));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to submit request: " + e.getMessage()));
        }
    }

    // Get all members
    @GetMapping
    public ResponseEntity<ApiResponse> getAllMembers() {
        List<Member> members = memberService.getAllMembers();
        return ResponseEntity.ok(ApiResponse.success("Members retrieved", members));
    }

    // Get approved members by community
    @GetMapping("/community/{communitySlug}")
    public ResponseEntity<ApiResponse> getMembersByCommunity(@PathVariable String communitySlug) {
        List<Member> members = memberService.getMembersByCommunity(communitySlug);
        return ResponseEntity.ok(ApiResponse.success("Members retrieved", members));
    }

    // Get all members by community (including pending) - admin
    @GetMapping("/community/{communitySlug}/all")
    public ResponseEntity<ApiResponse> getAllMembersByCommunity(@PathVariable String communitySlug) {
        List<Member> members = memberService.getAllMembersByCommunity(communitySlug);
        return ResponseEntity.ok(ApiResponse.success("All members retrieved", members));
    }

    // Get pending members - admin
    @GetMapping("/pending")
    public ResponseEntity<ApiResponse> getPendingMembers() {
        List<Member> members = memberService.getPendingMembers();
        return ResponseEntity.ok(ApiResponse.success("Pending members retrieved", members));
    }

    // Get member by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMemberById(@PathVariable String id) {
        return memberService.getMemberById(id)
            .map(member -> ResponseEntity.ok(ApiResponse.success("Member found", member)))
            .orElse(ResponseEntity.notFound().build());
    }

    // Update member status - admin
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateMemberStatus(
            @PathVariable String id,
            @RequestParam String status) {
        try {
            Member member = memberService.updateMemberStatus(id, status.toUpperCase());
            return ResponseEntity.ok(ApiResponse.success("Member status updated", member));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update status: " + e.getMessage()));
        }
    }

    // Update member details - admin
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateMember(
            @PathVariable String id,
            @RequestBody Member updatedMember) {
        try {
            Member member = memberService.updateMember(id, updatedMember);
            return ResponseEntity.ok(ApiResponse.success("Member updated", member));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update member: " + e.getMessage()));
        }
    }

    // Delete member - admin
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteMember(@PathVariable String id) {
        try {
            memberService.deleteMember(id);
            return ResponseEntity.ok(ApiResponse.success("Member deleted"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to delete member: " + e.getMessage()));
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Member member = memberService.authenticate(request.getEmail(), request.getPassword(), request.getCommunitySlug());
            if (member == null) {
                return ResponseEntity.status(401).body(ApiResponse.error("Invalid email or password"));
            }
            // Return member data without password
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", member.getId());
            userData.put("name", member.getName());
            userData.put("email", member.getEmail());
            userData.put("role", member.getRole());
            userData.put("image", member.getImage());
            userData.put("teams", member.getTeams());
            userData.put("githubUrl", member.getGithubUrl());
            userData.put("linkedinUrl", member.getLinkedinUrl());
            return ResponseEntity.ok(ApiResponse.success("Login successful", userData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Login failed: " + e.getMessage()));
        }
    }

    // Change password
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        try {
            Member member = memberService.changePassword(request.getEmail(), request.getNewPassword());
            return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to change password: " + e.getMessage()));
        }
    }

    // Kick member from community - admin only
    @DeleteMapping("/{id}/kick/{communitySlug}")
    public ResponseEntity<ApiResponse> kickMember(@PathVariable String id, @PathVariable String communitySlug) {
        try {
            memberService.kickFromCommunity(id, communitySlug);
            return ResponseEntity.ok(ApiResponse.success("Member removed from community"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to kick member: " + e.getMessage()));
        }
    }

    @PostMapping("/send-welcome-emails/{communitySlug}")
    public ResponseEntity<ApiResponse> sendWelcomeEmailsToAll(@PathVariable String communitySlug) {
        try {
            int count = memberService.sendWelcomeEmailToAllApprovedMembers(communitySlug);
            return ResponseEntity.ok(ApiResponse.success("Welcome emails sent to " + count + " members"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to send emails: " + e.getMessage()));
        }
    }
}
