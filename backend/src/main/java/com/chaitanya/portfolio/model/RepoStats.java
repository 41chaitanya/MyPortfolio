package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "repo_stats")
@CompoundIndex(name = "repo_week_idx", def = "{'repoName': 1, 'weekStart': 1}", unique = true)
public class RepoStats {
    
    @Id
    private String id;
    
    private String repoName;
    private String repoFullName; // org/repo
    private String description;
    private String language;
    private LocalDate weekStart;
    
    // Weekly metrics
    private int weeklyCommits;
    private int weeklyPRsOpened;
    private int weeklyPRsMerged;
    private int weeklyIssuesOpened;
    private int weeklyIssuesClosed;
    
    // Cumulative metrics (as of this week)
    private int totalCommits;
    private int totalStars;
    private int totalForks;
    private int totalOpenIssues;
    private int totalContributors;
    
    // Contributors this week
    private List<String> weeklyContributors;
    
    // Commit activity (last 52 weeks for chart)
    private List<WeeklyCommitData> commitHistory;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WeeklyCommitData {
        private LocalDate weekStart;
        private int commits;
    }
    
    public RepoStats(String repoName, String repoFullName) {
        this.repoName = repoName;
        this.repoFullName = repoFullName;
        this.weeklyContributors = new ArrayList<>();
        this.commitHistory = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
