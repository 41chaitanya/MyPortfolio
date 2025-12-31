package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "weekly_stats")
@CompoundIndex(name = "member_week_idx", def = "{'memberId': 1, 'weekStart': 1}", unique = true)
public class WeeklyStats {
    
    @Id
    private String id;
    
    private String memberId;
    private String githubUsername;
    private LocalDate weekStart; // Monday of the week
    private LocalDate weekEnd;   // Sunday of the week
    
    // Contribution metrics
    private int commits;
    private int pullRequestsOpened;
    private int pullRequestsMerged;
    private int issuesOpened;
    private int issuesClosed;
    private int codeReviews;
    
    // Streak tracking
    private int activeDays; // Days with at least 1 commit
    private int currentStreak; // Consecutive days with commits
    
    // Repos contributed to this week
    private java.util.List<String> reposContributed;
    
    // Calculated score for leaderboard
    private int totalScore;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public void calculateScore() {
        // Weighted scoring: commits(1) + PRs merged(5) + issues closed(3) + PRs opened(2) + issues opened(1)
        this.totalScore = (commits * 1) + (pullRequestsMerged * 5) + (issuesClosed * 3) 
                        + (pullRequestsOpened * 2) + (issuesOpened * 1);
    }
}
