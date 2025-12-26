package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
    List<Member> findByCommunitiesContaining(String communitySlug);
    List<Member> findByCommunitiesContainingAndStatus(String communitySlug, String status);
    List<Member> findByStatus(String status);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByGithubUrl(String githubUrl);
    List<Member> findAllByOrderByCreatedAtDesc();
    List<Member> findByTeamsContaining(String team);
}
