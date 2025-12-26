package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.JoinCommunityRequest;
import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

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
        
        // Set default avatar
        member.setImage(MALE_AVATAR);
        
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
        member.setStatus(status);
        member.setUpdatedAt(LocalDateTime.now());
        if (status.equals("APPROVED")) {
            member.setJoinedAt(LocalDateTime.now());
        }
        return memberRepository.save(member);
    }

    public Member updateMember(String id, Member updated) {
        Member member = memberRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        if (updated.getName() != null) member.setName(updated.getName());
        if (updated.getImage() != null) member.setImage(updated.getImage());
        if (updated.getRole() != null) member.setRole(updated.getRole());
        if (updated.getTeams() != null) member.setTeams(updated.getTeams());
        if (updated.getPastWork() != null) member.setPastWork(updated.getPastWork());
        member.setUpdatedAt(LocalDateTime.now());
        return memberRepository.save(member);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
}
