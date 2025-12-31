package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.PerformerOfWeek;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PerformerOfWeekRepository extends MongoRepository<PerformerOfWeek, String> {
    
    Optional<PerformerOfWeek> findByWeekStart(LocalDate weekStart);
    
    Optional<PerformerOfWeek> findFirstByOrderByWeekStartDesc();
    
    List<PerformerOfWeek> findAllByOrderByWeekStartDesc();
    
    List<PerformerOfWeek> findByMemberIdOrderByWeekStartDesc(String memberId);
    
    long countByMemberId(String memberId);
}
