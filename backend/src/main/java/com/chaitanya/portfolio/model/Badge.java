package com.chaitanya.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "badges")
public class Badge {
    
    @Id
    private String id;
    
    private String memberId;
    private String githubUsername;
    private BadgeType type;
    private LocalDate weekAwarded; // Week start date when badge was awarded
    private String description;
    private int value; // The stat value that earned this badge (e.g., 15 commits)
    
    private LocalDateTime createdAt;
    
    public enum BadgeType {
        TOP_CONTRIBUTOR("Top Contributor", "Most commits this week", "🏆"),
        ISSUE_RESOLVER("Issue Resolver", "Most issues closed this week", "🔧"),
        PR_CHAMPION("PR Champion", "Most PRs merged this week", "🚀"),
        STREAK_MASTER("Streak Master", "Longest commit streak", "🔥"),
        FIRST_TIMER("First Timer", "First contribution ever", "⭐"),
        PERFORMER_OF_WEEK("Performer of the Week", "Highest overall score this week", "👑");
        
        private final String displayName;
        private final String description;
        private final String emoji;
        
        BadgeType(String displayName, String description, String emoji) {
            this.displayName = displayName;
            this.description = description;
            this.emoji = emoji;
        }
        
        public String getDisplayName() { return displayName; }
        public String getDescription() { return description; }
        public String getEmoji() { return emoji; }
    }
    
    public Badge(String memberId, String githubUsername, BadgeType type, LocalDate weekAwarded, int value) {
        this.memberId = memberId;
        this.githubUsername = githubUsername;
        this.type = type;
        this.weekAwarded = weekAwarded;
        this.value = value;
        this.description = type.getEmoji() + " " + type.getDisplayName();
        this.createdAt = LocalDateTime.now();
    }
}
