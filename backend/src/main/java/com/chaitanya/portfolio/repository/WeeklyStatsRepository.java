package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.WeeklyStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeeklyStatsRepository extends MongoRepository<WeeklyStats, String> {
    
    Optional<WeeklyStats> findByMemberIdAndWeekStart(String memberId, LocalDate weekStart);
    
    Optional<WeeklyStats> findByGithubUsernameAndWeekStart(String githubUsername, LocalDate weekStart);
    
    List<WeeklyStats> findByWeekStartOrderByTotalScoreDesc(LocalDate weekStart);
    
    List<WeeklyStats> findByMemberIdOrderByWeekStartDesc(String memberId);
    
    List<WeeklyStats> findByGithubUsernameOrderByWeekStartDesc(String githubUsername);
    
    List<WeeklyStats> findTop10ByWeekStartOrderByTotalScoreDesc(LocalDate weekStart);
    
    List<WeeklyStats> findTop10ByWeekStartOrderByCommitsDesc(LocalDate weekStart);
    
    List<WeeklyStats> findTop10ByWeekStartOrderByPullRequestsMergedDesc(LocalDate weekStart);
    
    List<WeeklyStats> findTop10ByWeekStartOrderByIssuesClosedDesc(LocalDate weekStart);
}
