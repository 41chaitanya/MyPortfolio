package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.RepoStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RepoStatsRepository extends MongoRepository<RepoStats, String> {
    
    Optional<RepoStats> findByRepoNameAndWeekStart(String repoName, LocalDate weekStart);
    
    List<RepoStats> findByWeekStartOrderByWeeklyCommitsDesc(LocalDate weekStart);
    
    List<RepoStats> findByRepoNameOrderByWeekStartDesc(String repoName);
    
    // Get latest stats for each repo
    Optional<RepoStats> findFirstByRepoNameOrderByWeekStartDesc(String repoName);
    
    List<RepoStats> findByWeekStart(LocalDate weekStart);
}
