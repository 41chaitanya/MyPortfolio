package com.chaitanya.portfolio.scheduler;

import com.chaitanya.portfolio.service.GitHubAnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GitHubStatsScheduler {

    private final GitHubAnalyticsService gitHubAnalyticsService;

    /**
     * Run every Sunday at 11:59 PM to calculate weekly stats and badges
     * Cron: second minute hour day-of-month month day-of-week
     */
    @Scheduled(cron = "0 59 23 * * SUN")
    public void calculateWeeklyStats() {
        log.info("=== Starting scheduled weekly stats calculation ===");
        try {
            gitHubAnalyticsService.runWeeklyStatsCalculation();
            log.info("=== Weekly stats calculation completed successfully ===");
        } catch (Exception e) {
            log.error("=== Weekly stats calculation failed: {} ===", e.getMessage(), e);
        }
    }

    /**
     * Run daily at 6 AM to update current week stats (for real-time leaderboard)
     */
    @Scheduled(cron = "0 0 6 * * *")
    public void updateDailyStats() {
        log.info("=== Starting daily stats update ===");
        try {
            gitHubAnalyticsService.runWeeklyStatsCalculation();
            log.info("=== Daily stats update completed ===");
        } catch (Exception e) {
            log.error("=== Daily stats update failed: {} ===", e.getMessage(), e);
        }
    }
}
