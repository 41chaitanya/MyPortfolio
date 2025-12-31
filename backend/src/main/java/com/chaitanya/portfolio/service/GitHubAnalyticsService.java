package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.model.*;
import com.chaitanya.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GitHubAnalyticsService {

    private final WeeklyStatsRepository weeklyStatsRepository;
    private final BadgeRepository badgeRepository;
    private final RepoStatsRepository repoStatsRepository;
    private final PerformerOfWeekRepository performerOfWeekRepository;
    private final MemberRepository memberRepository;

    @Value("${github.token:}")
    private String githubToken;

    @Value("${github.org:com-the-boys-dev}")
    private String githubOrg;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GITHUB_API = "https://api.github.com";

    // ==================== GitHub API Methods ====================

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        return headers;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getOrgRepos() {
        try {
            String url = GITHUB_API + "/orgs/" + githubOrg + "/repos?per_page=100";
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            return response.getBody() != null ? response.getBody() : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching org repos: {}", e.getMessage());
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getRepoContributors(String repoName) {
        try {
            String url = GITHUB_API + "/repos/" + githubOrg + "/" + repoName + "/stats/contributors";
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            return response.getBody() != null ? response.getBody() : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching contributors for {}: {}", repoName, e.getMessage());
            return new ArrayList<>();
        }
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getRepoCommitActivity(String repoName) {
        try {
            String url = GITHUB_API + "/repos/" + githubOrg + "/" + repoName + "/stats/commit_activity";
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            return response.getBody() != null ? response.getBody() : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching commit activity for {}: {}", repoName, e.getMessage());
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getClosedIssues(String repoName, LocalDate since) {
        try {
            String url = GITHUB_API + "/repos/" + githubOrg + "/" + repoName + 
                        "/issues?state=closed&since=" + since + "T00:00:00Z&per_page=100";
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            return response.getBody() != null ? response.getBody() : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching closed issues for {}: {}", repoName, e.getMessage());
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMergedPRs(String repoName, LocalDate since) {
        try {
            String url = GITHUB_API + "/repos/" + githubOrg + "/" + repoName + 
                        "/pulls?state=closed&per_page=100";
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            List<Map<String, Object>> prs = response.getBody() != null ? response.getBody() : new ArrayList<>();
            // Filter to only merged PRs after since date
            return prs.stream()
                .filter(pr -> pr.get("merged_at") != null)
                .filter(pr -> {
                    String mergedAt = (String) pr.get("merged_at");
                    return LocalDate.parse(mergedAt.substring(0, 10)).isAfter(since.minusDays(1));
                })
                .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching merged PRs for {}: {}", repoName, e.getMessage());
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getRepoDetails(String repoName) {
        try {
            String url = GITHUB_API + "/repos/" + githubOrg + "/" + repoName;
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody() != null ? response.getBody() : new HashMap<>();
        } catch (Exception e) {
            log.error("Error fetching repo details for {}: {}", repoName, e.getMessage());
            return new HashMap<>();
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getUserCommits(String repoName, String username, LocalDate since) {
        try {
            String url = GITHUB_API + "/repos/" + githubOrg + "/" + repoName + 
                        "/commits?author=" + username + "&since=" + since + "T00:00:00Z&per_page=100";
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, new HttpEntity<>(getHeaders()),
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            return response.getBody() != null ? response.getBody() : new ArrayList<>();
        } catch (Exception e) {
            log.error("Error fetching commits for {} in {}: {}", username, repoName, e.getMessage());
            return new ArrayList<>();
        }
    }


    // ==================== Stats Calculation Methods ====================

    public LocalDate getCurrentWeekStart() {
        return LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
    }

    public WeeklyStats calculateMemberWeeklyStats(Member member, LocalDate weekStart) {
        String username = member.getGithubUsername();
        if (username == null || username.isEmpty()) {
            log.warn("Member {} has no GitHub username", member.getName());
            return null;
        }

        LocalDate weekEnd = weekStart.plusDays(6);
        
        WeeklyStats stats = weeklyStatsRepository.findByMemberIdAndWeekStart(member.getId(), weekStart)
            .orElse(new WeeklyStats());
        
        stats.setMemberId(member.getId());
        stats.setGithubUsername(username);
        stats.setWeekStart(weekStart);
        stats.setWeekEnd(weekEnd);
        
        int totalCommits = 0;
        int totalPRsMerged = 0;
        int totalIssuesClosed = 0;
        Set<String> reposContributed = new HashSet<>();
        Set<LocalDate> activeDates = new HashSet<>();

        List<Map<String, Object>> repos = getOrgRepos();
        
        for (Map<String, Object> repo : repos) {
            String repoName = (String) repo.get("name");
            
            // Get commits by this user
            List<Map<String, Object>> commits = getUserCommits(repoName, username, weekStart);
            if (!commits.isEmpty()) {
                totalCommits += commits.size();
                reposContributed.add(repoName);
                
                // Track active dates for streak
                for (Map<String, Object> commit : commits) {
                    try {
                        @SuppressWarnings("unchecked")
                        Map<String, Object> commitData = (Map<String, Object>) commit.get("commit");
                        @SuppressWarnings("unchecked")
                        Map<String, Object> author = (Map<String, Object>) commitData.get("author");
                        String dateStr = (String) author.get("date");
                        LocalDate commitDate = LocalDate.parse(dateStr.substring(0, 10));
                        if (!commitDate.isBefore(weekStart) && !commitDate.isAfter(weekEnd)) {
                            activeDates.add(commitDate);
                        }
                    } catch (Exception e) {
                        log.debug("Error parsing commit date: {}", e.getMessage());
                    }
                }
            }
            
            // Get merged PRs by this user
            List<Map<String, Object>> prs = getMergedPRs(repoName, weekStart);
            for (Map<String, Object> pr : prs) {
                @SuppressWarnings("unchecked")
                Map<String, Object> user = (Map<String, Object>) pr.get("user");
                if (user != null && username.equalsIgnoreCase((String) user.get("login"))) {
                    totalPRsMerged++;
                    reposContributed.add(repoName);
                }
            }
            
            // Get issues closed by this user
            List<Map<String, Object>> issues = getClosedIssues(repoName, weekStart);
            for (Map<String, Object> issue : issues) {
                // Check if it's not a PR (issues API also returns PRs)
                if (issue.get("pull_request") == null) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> user = (Map<String, Object>) issue.get("user");
                    if (user != null && username.equalsIgnoreCase((String) user.get("login"))) {
                        totalIssuesClosed++;
                    }
                }
            }
            
            // Rate limiting - small delay between repos
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }
        
        stats.setCommits(totalCommits);
        stats.setPullRequestsMerged(totalPRsMerged);
        stats.setIssuesClosed(totalIssuesClosed);
        stats.setReposContributed(new ArrayList<>(reposContributed));
        stats.setActiveDays(activeDates.size());
        stats.calculateScore();
        stats.setUpdatedAt(LocalDateTime.now());
        
        if (stats.getCreatedAt() == null) {
            stats.setCreatedAt(LocalDateTime.now());
        }
        
        return weeklyStatsRepository.save(stats);
    }


    // ==================== Badge Calculation Methods ====================

    public void calculateWeeklyBadges(LocalDate weekStart) {
        log.info("Calculating badges for week starting: {}", weekStart);
        
        List<WeeklyStats> weekStats = weeklyStatsRepository.findByWeekStartOrderByTotalScoreDesc(weekStart);
        if (weekStats.isEmpty()) {
            log.warn("No stats found for week: {}", weekStart);
            return;
        }

        // Top Contributor (most commits)
        WeeklyStats topCommitter = weekStats.stream()
            .max(Comparator.comparingInt(WeeklyStats::getCommits))
            .orElse(null);
        if (topCommitter != null && topCommitter.getCommits() > 0) {
            awardBadge(topCommitter, Badge.BadgeType.TOP_CONTRIBUTOR, weekStart, topCommitter.getCommits());
        }

        // Issue Resolver (most issues closed)
        WeeklyStats topIssueResolver = weekStats.stream()
            .max(Comparator.comparingInt(WeeklyStats::getIssuesClosed))
            .orElse(null);
        if (topIssueResolver != null && topIssueResolver.getIssuesClosed() > 0) {
            awardBadge(topIssueResolver, Badge.BadgeType.ISSUE_RESOLVER, weekStart, topIssueResolver.getIssuesClosed());
        }

        // PR Champion (most PRs merged)
        WeeklyStats topPRMerger = weekStats.stream()
            .max(Comparator.comparingInt(WeeklyStats::getPullRequestsMerged))
            .orElse(null);
        if (topPRMerger != null && topPRMerger.getPullRequestsMerged() > 0) {
            awardBadge(topPRMerger, Badge.BadgeType.PR_CHAMPION, weekStart, topPRMerger.getPullRequestsMerged());
        }

        // Streak Master (most active days)
        WeeklyStats streakMaster = weekStats.stream()
            .max(Comparator.comparingInt(WeeklyStats::getActiveDays))
            .orElse(null);
        if (streakMaster != null && streakMaster.getActiveDays() >= 5) {
            awardBadge(streakMaster, Badge.BadgeType.STREAK_MASTER, weekStart, streakMaster.getActiveDays());
        }

        // Performer of the Week (highest total score)
        WeeklyStats performer = weekStats.get(0);
        if (performer.getTotalScore() > 0) {
            awardBadge(performer, Badge.BadgeType.PERFORMER_OF_WEEK, weekStart, performer.getTotalScore());
            
            // Save to PerformerOfWeek collection
            Member member = memberRepository.findById(performer.getMemberId()).orElse(null);
            if (member != null) {
                PerformerOfWeek pow = new PerformerOfWeek(member, performer, weekStart);
                performerOfWeekRepository.save(pow);
                log.info("Performer of the week: {} with score {}", member.getName(), performer.getTotalScore());
            }
        }

        // First Timer badges (check for members with first contribution)
        for (WeeklyStats stats : weekStats) {
            if (stats.getTotalScore() > 0) {
                boolean hasFirstTimerBadge = badgeRepository.existsByMemberIdAndType(
                    stats.getMemberId(), Badge.BadgeType.FIRST_TIMER);
                if (!hasFirstTimerBadge) {
                    // Check if this is their first week with contributions
                    List<WeeklyStats> memberHistory = weeklyStatsRepository
                        .findByMemberIdOrderByWeekStartDesc(stats.getMemberId());
                    if (memberHistory.size() == 1 || 
                        memberHistory.stream().filter(s -> s.getTotalScore() > 0).count() == 1) {
                        awardBadge(stats, Badge.BadgeType.FIRST_TIMER, weekStart, 1);
                    }
                }
            }
        }
    }

    private void awardBadge(WeeklyStats stats, Badge.BadgeType type, LocalDate weekStart, int value) {
        // Check if badge already awarded for this week
        if (badgeRepository.findByMemberIdAndTypeAndWeekAwarded(stats.getMemberId(), type, weekStart).isPresent()) {
            log.debug("Badge {} already awarded to {} for week {}", type, stats.getGithubUsername(), weekStart);
            return;
        }
        
        Badge badge = new Badge(stats.getMemberId(), stats.getGithubUsername(), type, weekStart, value);
        badgeRepository.save(badge);
        log.info("Awarded {} badge to {} (value: {})", type, stats.getGithubUsername(), value);
    }


    // ==================== Repo Stats Methods ====================

    public RepoStats calculateRepoStats(String repoName, LocalDate weekStart) {
        RepoStats stats = repoStatsRepository.findByRepoNameAndWeekStart(repoName, weekStart)
            .orElse(new RepoStats(repoName, githubOrg + "/" + repoName));
        
        stats.setWeekStart(weekStart);
        
        // Get repo details
        Map<String, Object> repoDetails = getRepoDetails(repoName);
        if (!repoDetails.isEmpty()) {
            stats.setDescription((String) repoDetails.get("description"));
            stats.setLanguage((String) repoDetails.get("language"));
            stats.setTotalStars(((Number) repoDetails.getOrDefault("stargazers_count", 0)).intValue());
            stats.setTotalForks(((Number) repoDetails.getOrDefault("forks_count", 0)).intValue());
            stats.setTotalOpenIssues(((Number) repoDetails.getOrDefault("open_issues_count", 0)).intValue());
        }
        
        // Get contributors
        List<Map<String, Object>> contributors = getRepoContributors(repoName);
        stats.setTotalContributors(contributors.size());
        
        // Calculate total commits from contributors
        int totalCommits = 0;
        for (Map<String, Object> contributor : contributors) {
            totalCommits += ((Number) contributor.getOrDefault("total", 0)).intValue();
        }
        stats.setTotalCommits(totalCommits);
        
        // Get commit activity for chart (last 52 weeks)
        List<Map<String, Object>> commitActivity = getRepoCommitActivity(repoName);
        List<RepoStats.WeeklyCommitData> commitHistory = new ArrayList<>();
        for (Map<String, Object> week : commitActivity) {
            long timestamp = ((Number) week.get("week")).longValue();
            LocalDate date = Instant.ofEpochSecond(timestamp).atZone(ZoneId.systemDefault()).toLocalDate();
            int commits = ((Number) week.getOrDefault("total", 0)).intValue();
            commitHistory.add(new RepoStats.WeeklyCommitData(date, commits));
        }
        stats.setCommitHistory(commitHistory);
        
        // Weekly metrics
        List<Map<String, Object>> weeklyPRs = getMergedPRs(repoName, weekStart);
        stats.setWeeklyPRsMerged(weeklyPRs.size());
        
        List<Map<String, Object>> weeklyIssues = getClosedIssues(repoName, weekStart);
        stats.setWeeklyIssuesClosed((int) weeklyIssues.stream()
            .filter(i -> i.get("pull_request") == null).count());
        
        // Weekly contributors
        Set<String> weeklyContributors = new HashSet<>();
        for (Map<String, Object> pr : weeklyPRs) {
            @SuppressWarnings("unchecked")
            Map<String, Object> user = (Map<String, Object>) pr.get("user");
            if (user != null) weeklyContributors.add((String) user.get("login"));
        }
        stats.setWeeklyContributors(new ArrayList<>(weeklyContributors));
        
        stats.setUpdatedAt(LocalDateTime.now());
        return repoStatsRepository.save(stats);
    }

    // ==================== Public API Methods ====================

    public List<WeeklyStats> getLeaderboard(LocalDate weekStart) {
        return weeklyStatsRepository.findTop10ByWeekStartOrderByTotalScoreDesc(weekStart);
    }

    public List<Badge> getMemberBadges(String memberId) {
        return badgeRepository.findByMemberIdOrderByCreatedAtDesc(memberId);
    }

    public List<Badge> getMemberBadgesByUsername(String username) {
        return badgeRepository.findByGithubUsernameOrderByCreatedAtDesc(username);
    }

    public PerformerOfWeek getCurrentPerformer() {
        return performerOfWeekRepository.findFirstByOrderByWeekStartDesc().orElse(null);
    }

    public List<PerformerOfWeek> getPerformerHistory() {
        return performerOfWeekRepository.findAllByOrderByWeekStartDesc();
    }

    public List<WeeklyStats> getMemberStatsHistory(String memberId) {
        return weeklyStatsRepository.findByMemberIdOrderByWeekStartDesc(memberId);
    }

    public Map<String, Object> getOrgDashboard() {
        LocalDate weekStart = getCurrentWeekStart();
        Map<String, Object> dashboard = new HashMap<>();
        
        // Get all repos
        List<Map<String, Object>> repos = getOrgRepos();
        dashboard.put("totalRepos", repos.size());
        dashboard.put("repos", repos.stream().map(r -> Map.of(
            "name", r.get("name"),
            "description", r.getOrDefault("description", ""),
            "language", r.getOrDefault("language", ""),
            "stars", r.getOrDefault("stargazers_count", 0),
            "forks", r.getOrDefault("forks_count", 0),
            "openIssues", r.getOrDefault("open_issues_count", 0)
        )).collect(Collectors.toList()));
        
        // Get leaderboard
        dashboard.put("leaderboard", getLeaderboard(weekStart));
        
        // Get current performer
        dashboard.put("performerOfWeek", getCurrentPerformer());
        
        // Get this week's badges
        dashboard.put("weeklyBadges", badgeRepository.findByWeekAwardedOrderByTypeAsc(weekStart));
        
        return dashboard;
    }

    // ==================== Scheduled Job Entry Point ====================

    public void runWeeklyStatsCalculation() {
        LocalDate weekStart = getCurrentWeekStart();
        log.info("Starting weekly stats calculation for week: {}", weekStart);
        
        // Get all approved members from the community
        List<Member> members = memberRepository.findByCommunitiesContainingAndStatus("com.the-boys-dev", "APPROVED");
        log.info("Found {} approved members", members.size());
        
        for (Member member : members) {
            try {
                calculateMemberWeeklyStats(member, weekStart);
                log.info("Calculated stats for: {}", member.getName());
                Thread.sleep(500); // Rate limiting
            } catch (Exception e) {
                log.error("Error calculating stats for {}: {}", member.getName(), e.getMessage());
            }
        }
        
        // Calculate repo stats
        List<Map<String, Object>> repos = getOrgRepos();
        for (Map<String, Object> repo : repos) {
            try {
                calculateRepoStats((String) repo.get("name"), weekStart);
                Thread.sleep(500);
            } catch (Exception e) {
                log.error("Error calculating repo stats for {}: {}", repo.get("name"), e.getMessage());
            }
        }
        
        // Calculate badges
        calculateWeeklyBadges(weekStart);
        
        log.info("Weekly stats calculation completed");
    }
}
