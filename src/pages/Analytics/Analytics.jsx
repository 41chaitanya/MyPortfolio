import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Analytics.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Analytics = () => {
  const [dashboard, setDashboard] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [performer, setPerformer] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashRes, leaderRes, performerRes, reposRes] = await Promise.all([
        fetch(`${API_URL}/api/analytics/dashboard`),
        fetch(`${API_URL}/api/analytics/leaderboard`),
        fetch(`${API_URL}/api/analytics/performer`),
        fetch(`${API_URL}/api/analytics/repos`)
      ]);

      if (dashRes.ok) setDashboard(await dashRes.json());
      if (leaderRes.ok) setLeaderboard(await leaderRes.json());
      if (performerRes.ok) setPerformer(await performerRes.json());
      if (reposRes.ok) setRepos(await reposRes.json());
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <div className="loading-spinner"></div>
          <p>Loading GitHub Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <motion.div 
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>📊 GitHub Analytics</h1>
        <p>com-the-boys-dev Organization Dashboard</p>
      </motion.div>

      {/* Performer of the Week Banner */}
      {performer && (
        <motion.div 
          className="performer-banner"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="performer-crown">👑</div>
          <div className="performer-info">
            <h2>Performer of the Week</h2>
            <div className="performer-details">
              <img src={performer.memberImage} alt={performer.memberName} />
              <div>
                <h3>{performer.memberName}</h3>
                <p>@{performer.githubUsername}</p>
              </div>
            </div>
            <div className="performer-stats">
              <span>🔥 {performer.commits} commits</span>
              <span>🚀 {performer.pullRequestsMerged} PRs</span>
              <span>🔧 {performer.issuesClosed} issues</span>
              <span className="total-score">Score: {performer.totalScore}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="analytics-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'leaderboard' ? 'active' : ''} 
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
        <button 
          className={activeTab === 'repos' ? 'active' : ''} 
          onClick={() => setActiveTab('repos')}
        >
          Repositories
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div 
          className="analytics-overview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">📁</span>
              <h3>{repos.length}</h3>
              <p>Repositories</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <h3>{leaderboard.length}</h3>
              <p>Active Contributors</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <h3>{repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)}</h3>
              <p>Total Stars</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🍴</span>
              <h3>{repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)}</h3>
              <p>Total Forks</p>
            </div>
          </div>

          {/* Weekly Badges */}
          {dashboard?.weeklyBadges?.length > 0 && (
            <div className="weekly-badges-section">
              <h2>🏆 This Week's Badges</h2>
              <div className="badges-grid">
                {dashboard.weeklyBadges.map((badge, idx) => (
                  <div key={idx} className="badge-card">
                    <span className="badge-emoji">{getBadgeEmoji(badge.type)}</span>
                    <h4>{badge.type.replace(/_/g, ' ')}</h4>
                    <p>@{badge.githubUsername}</p>
                    <span className="badge-value">{badge.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}


      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <motion.div 
          className="leaderboard-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>🏅 Weekly Leaderboard</h2>
          <div className="leaderboard-table">
            <div className="leaderboard-header">
              <span>Rank</span>
              <span>Contributor</span>
              <span>Commits</span>
              <span>PRs</span>
              <span>Issues</span>
              <span>Score</span>
            </div>
            {leaderboard.map((stat, idx) => (
              <motion.div 
                key={stat.id} 
                className={`leaderboard-row ${idx < 3 ? 'top-three' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="rank">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                </span>
                <span className="contributor">@{stat.githubUsername}</span>
                <span>{stat.commits}</span>
                <span>{stat.pullRequestsMerged}</span>
                <span>{stat.issuesClosed}</span>
                <span className="score">{stat.totalScore}</span>
              </motion.div>
            ))}
            {leaderboard.length === 0 && (
              <div className="no-data">No stats available yet. Check back after the weekly calculation!</div>
            )}
          </div>
        </motion.div>
      )}

      {/* Repos Tab */}
      {activeTab === 'repos' && (
        <motion.div 
          className="repos-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>📁 Organization Repositories</h2>
          <div className="repos-grid">
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3>{repo.name}</h3>
                <p>{repo.description || 'No description'}</p>
                <div className="repo-meta">
                  {repo.language && <span className="language">{repo.language}</span>}
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>🔓 {repo.open_issues_count} issues</span>
                </div>
              </motion.a>
            ))}
            {repos.length === 0 && (
              <div className="no-data">No repositories found.</div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getBadgeEmoji = (type) => {
  const emojis = {
    TOP_CONTRIBUTOR: '🏆',
    ISSUE_RESOLVER: '🔧',
    PR_CHAMPION: '🚀',
    STREAK_MASTER: '🔥',
    FIRST_TIMER: '⭐',
    PERFORMER_OF_WEEK: '👑'
  };
  return emojis[type] || '🎖️';
};

export default Analytics;
