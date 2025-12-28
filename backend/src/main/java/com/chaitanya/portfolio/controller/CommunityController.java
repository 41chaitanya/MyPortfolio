package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponse;
import com.chaitanya.portfolio.dto.JoinCommunityRequest;
import com.chaitanya.portfolio.model.Community;
import com.chaitanya.portfolio.model.CommunityJoinRequest;
import com.chaitanya.portfolio.service.CommunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    // Get all communities
    @GetMapping
    public ResponseEntity<ApiResponse> getAllCommunities() {
        List<Community> communities = communityService.getAllCommunities();
        return ResponseEntity.ok(ApiResponse.success("Communities retrieved", communities));
    }

    // Get community by slug
    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse> getCommunityBySlug(@PathVariable String slug) {
        return communityService.getCommunityBySlug(slug)
            .map(community -> ResponseEntity.ok(ApiResponse.success("Community found", community)))
            .orElse(ResponseEntity.notFound().build());
    }

    // Submit join request
    @PostMapping("/join")
    public ResponseEntity<ApiResponse> submitJoinRequest(@Valid @RequestBody JoinCommunityRequest request) {
        try {
            CommunityJoinRequest joinRequest = communityService.submitJoinRequest(request);
            return ResponseEntity.ok(ApiResponse.success("Join request submitted successfully!", joinRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to submit request: " + e.getMessage()));
        }
    }

    // Get all join requests (admin)
    @GetMapping("/join/requests")
    public ResponseEntity<ApiResponse> getAllJoinRequests() {
        List<CommunityJoinRequest> requests = communityService.getAllJoinRequests();
        return ResponseEntity.ok(ApiResponse.success("Join requests retrieved", requests));
    }

    // Get join requests by status (admin)
    @GetMapping("/join/requests/status/{status}")
    public ResponseEntity<ApiResponse> getJoinRequestsByStatus(@PathVariable String status) {
        List<CommunityJoinRequest> requests = communityService.getJoinRequestsByStatus(status.toUpperCase());
        return ResponseEntity.ok(ApiResponse.success("Join requests retrieved", requests));
    }

    // Update join request status (admin)
    @PutMapping("/join/requests/{id}/status")
    public ResponseEntity<ApiResponse> updateRequestStatus(
            @PathVariable String id,
            @RequestParam String status) {
        try {
            CommunityJoinRequest request = communityService.updateRequestStatus(id, status.toUpperCase());
            return ResponseEntity.ok(ApiResponse.success("Request status updated", request));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update status: " + e.getMessage()));
        }
    }
}
