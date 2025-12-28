package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.JoinCommunityRequest;
import com.chaitanya.portfolio.model.Community;
import com.chaitanya.portfolio.model.CommunityJoinRequest;
import com.chaitanya.portfolio.repository.CommunityJoinRequestRepository;
import com.chaitanya.portfolio.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityJoinRequestRepository joinRequestRepository;

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Optional<Community> getCommunityBySlug(String slug) {
        return communityRepository.findBySlug(slug);
    }

    public Community saveCommunity(Community community) {
        return communityRepository.save(community);
    }

    public CommunityJoinRequest submitJoinRequest(JoinCommunityRequest request) {
        CommunityJoinRequest joinRequest = new CommunityJoinRequest(
            request.getCommunityName(),
            request.getEmail(),
            request.getGithubUrl(),
            request.getLinkedinUrl(),
            request.getContactNumber()
        );
        
        CommunityJoinRequest saved = joinRequestRepository.save(joinRequest);
        log.info("Join request saved with id: {}", saved.getId());
        return saved;
    }

    public List<CommunityJoinRequest> getAllJoinRequests() {
        return joinRequestRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<CommunityJoinRequest> getJoinRequestsByStatus(String status) {
        return joinRequestRepository.findByStatus(status);
    }

    public CommunityJoinRequest updateRequestStatus(String id, String status) {
        CommunityJoinRequest request = joinRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Join request not found"));
        request.setStatus(status);
        request.setUpdatedAt(LocalDateTime.now());
        return joinRequestRepository.save(request);
    }
}
