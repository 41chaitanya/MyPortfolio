package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponse;
import com.chaitanya.portfolio.dto.JoinCommunityRequest;
import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
