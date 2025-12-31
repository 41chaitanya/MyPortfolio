package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Badge;
import com.chaitanya.portfolio.model.Badge.BadgeType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BadgeRepository extends MongoRepository<Badge, String> {
    
    List<Badge> findByMemberIdOrderByCreatedAtDesc(String memberId);
    
    List<Badge> findByGithubUsernameOrderByCreatedAtDesc(String githubUsername);
    
    List<Badge> findByWeekAwardedOrderByTypeAsc(LocalDate weekAwarded);
    
    Optional<Badge> findByMemberIdAndType(String memberId, BadgeType type);
    
    Optional<Badge> findByMemberIdAndTypeAndWeekAwarded(String memberId, BadgeType type, LocalDate weekAwarded);
    
    boolean existsByMemberIdAndType(String memberId, BadgeType type);
    
    List<Badge> findByTypeOrderByCreatedAtDesc(BadgeType type);
    
    long countByMemberId(String memberId);
}
