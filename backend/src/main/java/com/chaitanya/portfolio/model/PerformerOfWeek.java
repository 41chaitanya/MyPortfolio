package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "performer_of_week")
public class PerformerOfWeek {
    
    @Id
    private String id;
    
    private String memberId;
    private String githubUsername;
    private String memberName;
    private String memberImage;
    
    @Indexed(unique = true)
    private LocalDate weekStart;
    
    // Stats that earned this title
    private int commits;
    private int pullRequestsMerged;
    private int issuesClosed;
    private int totalScore;
    
    private LocalDateTime createdAt;
    
    public PerformerOfWeek(Member member, WeeklyStats stats, LocalDate weekStart) {
        this.memberId = member.getId();
        this.githubUsername = member.getGithubUsername();
        this.memberName = member.getName();
        this.memberImage = member.getImage();
        this.weekStart = weekStart;
        this.commits = stats.getCommits();
        this.pullRequestsMerged = stats.getPullRequestsMerged();
        this.issuesClosed = stats.getIssuesClosed();
        this.totalScore = stats.getTotalScore();
        this.createdAt = LocalDateTime.now();
    }
}
