package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.model.*;
import com.chaitanya.portfolio.service.GitHubAnalyticsService;
import com.chaitanya.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class GitHubAnalyticsController {

    private final GitHubAnalyticsService analyticsService;
    private final WeeklyStatsRepository weeklyStatsRepository;
    private final BadgeRepository badgeRepository;
    private final RepoStatsRepository repoStatsRepository;
    private final PerformerOfWeekRepository performerOfWeekRepository;
    private final MemberRepository memberRepository;

    // ==================== Dashboard Endpoints ====================

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(analyticsService.getOrgDashboard());
    }

    @GetMapping("/repos")
    public ResponseEntity<List<Map<String, Object>>> getRepos() {
        return ResponseEntity.ok(analyticsService.getOrgRepos());
    }

    @GetMapping("/repos/{repoName}/stats")
    public ResponseEntity<RepoStats> getRepoStats(@PathVariable String repoName) {
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        return repoStatsRepository.findByRepoNameAndWeekStart(repoName, weekStart)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/repos/{repoName}/history")
    public ResponseEntity<List<RepoStats>> getRepoHistory(@PathVariable String repoName) {
        return ResponseEntity.ok(repoStatsRepository.findByRepoNameOrderByWeekStartDesc(repoName));
    }

    // ==================== Leaderboard Endpoints ====================

    @GetMapping("/leaderboard")
    public ResponseEntity<List<WeeklyStats>> getLeaderboard(
            @RequestParam(required = false) String week) {
        LocalDate weekStart = week != null 
            ? LocalDate.parse(week, DateTimeFormatter.ISO_DATE)
            : analyticsService.getCurrentWeekStart();
        return ResponseEntity.ok(analyticsService.getLeaderboard(weekStart));
    }

    @GetMapping("/leaderboard/commits")
    public ResponseEntity<List<WeeklyStats>> getCommitLeaderboard() {
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        return ResponseEntity.ok(weeklyStatsRepository.findTop10ByWeekStartOrderByCommitsDesc(weekStart));
    }

    @GetMapping("/leaderboard/prs")
    public ResponseEntity<List<WeeklyStats>> getPRLeaderboard() {
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        return ResponseEntity.ok(weeklyStatsRepository.findTop10ByWeekStartOrderByPullRequestsMergedDesc(weekStart));
    }

    @GetMapping("/leaderboard/issues")
    public ResponseEntity<List<WeeklyStats>> getIssueLeaderboard() {
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        return ResponseEntity.ok(weeklyStatsRepository.findTop10ByWeekStartOrderByIssuesClosedDesc(weekStart));
    }


    // ==================== Member Stats Endpoints ====================

    @GetMapping("/members/{memberId}/stats")
    public ResponseEntity<List<WeeklyStats>> getMemberStats(@PathVariable String memberId) {
        return ResponseEntity.ok(analyticsService.getMemberStatsHistory(memberId));
    }

    @GetMapping("/members/{memberId}/badges")
    public ResponseEntity<List<Badge>> getMemberBadges(@PathVariable String memberId) {
        return ResponseEntity.ok(analyticsService.getMemberBadges(memberId));
    }

    @GetMapping("/members/username/{username}/stats")
    public ResponseEntity<List<WeeklyStats>> getMemberStatsByUsername(@PathVariable String username) {
        return ResponseEntity.ok(weeklyStatsRepository.findByGithubUsernameOrderByWeekStartDesc(username));
    }

    @GetMapping("/members/username/{username}/badges")
    public ResponseEntity<List<Badge>> getMemberBadgesByUsername(@PathVariable String username) {
        return ResponseEntity.ok(analyticsService.getMemberBadgesByUsername(username));
    }

    @GetMapping("/members/{memberId}/profile")
    public ResponseEntity<Map<String, Object>> getMemberProfile(@PathVariable String memberId) {
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Member member = memberOpt.get();
        Map<String, Object> profile = new HashMap<>();
        profile.put("member", member);
        profile.put("stats", analyticsService.getMemberStatsHistory(memberId));
        profile.put("badges", analyticsService.getMemberBadges(memberId));
        profile.put("performerCount", performerOfWeekRepository.countByMemberId(memberId));
        profile.put("totalBadges", badgeRepository.countByMemberId(memberId));
        
        return ResponseEntity.ok(profile);
    }

    // ==================== Performer of Week Endpoints ====================

    @GetMapping("/performer")
    public ResponseEntity<PerformerOfWeek> getCurrentPerformer() {
        PerformerOfWeek performer = analyticsService.getCurrentPerformer();
        return performer != null 
            ? ResponseEntity.ok(performer) 
            : ResponseEntity.notFound().build();
    }

    @GetMapping("/performer/history")
    public ResponseEntity<List<PerformerOfWeek>> getPerformerHistory() {
        return ResponseEntity.ok(analyticsService.getPerformerHistory());
    }

    // ==================== Badge Endpoints ====================

    @GetMapping("/badges/week")
    public ResponseEntity<List<Badge>> getWeeklyBadges(
            @RequestParam(required = false) String week) {
        LocalDate weekStart = week != null 
            ? LocalDate.parse(week, DateTimeFormatter.ISO_DATE)
            : analyticsService.getCurrentWeekStart();
        return ResponseEntity.ok(badgeRepository.findByWeekAwardedOrderByTypeAsc(weekStart));
    }

    @GetMapping("/badges/type/{type}")
    public ResponseEntity<List<Badge>> getBadgesByType(@PathVariable String type) {
        try {
            Badge.BadgeType badgeType = Badge.BadgeType.valueOf(type.toUpperCase());
            return ResponseEntity.ok(badgeRepository.findByTypeOrderByCreatedAtDesc(badgeType));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ==================== Admin/Manual Trigger Endpoints ====================

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, String>> triggerCalculation() {
        log.info("Manual stats calculation triggered");
        try {
            analyticsService.runWeeklyStatsCalculation();
            return ResponseEntity.ok(Map.of("status", "success", "message", "Stats calculation completed"));
        } catch (Exception e) {
            log.error("Manual calculation failed: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @PostMapping("/calculate/member/{memberId}")
    public ResponseEntity<WeeklyStats> calculateMemberStats(@PathVariable String memberId) {
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        WeeklyStats stats = analyticsService.calculateMemberWeeklyStats(memberOpt.get(), weekStart);
        return stats != null ? ResponseEntity.ok(stats) : ResponseEntity.internalServerError().build();
    }

    @PostMapping("/calculate/badges")
    public ResponseEntity<Map<String, String>> calculateBadges() {
        LocalDate weekStart = analyticsService.getCurrentWeekStart();
        analyticsService.calculateWeeklyBadges(weekStart);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Badges calculated for week " + weekStart));
    }
}
