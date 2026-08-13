import React, { useState } from 'react'
import Results from './Pages/Results.jsx'
import './App.css'

const sampleProfiles = [
  {
    username: 'real_influencer',
    followers: 500000,
    following: 90,
    posts: 2000,
    avg_likes: 10000,
    avg_comments: 3000,
    analysis: { score: 87, level: 'High', flags: ['Strong engagement', 'Healthy follower ratio'] },
  },
  {
    username: 'medium_profile',
    followers: 230000,
    following: 190,
    posts: 900,
    avg_likes: 4000,
    avg_comments: 1500,
    analysis: { score: 63, level: 'Medium', flags: ['Moderate engagement'] },
  },
  {
    username: 'fake_profile',
    followers: 50000,
    following: 800,
    posts: 300,
    avg_likes: 800,
    avg_comments: 60,
    analysis: { score: 21, level: 'Low', flags: ['Low engagement rate', 'High following compared to followers'] },
  },
  {
    username: 'elliude',
    followers: 20000,
    following: 1100,
    posts: 180,
    avg_likes: 400,
    avg_comments: 20,
    analysis: { score: 14, level: 'Low', flags: ['Low engagement rate', 'High following compared to followers'] },
  },
]

function computeMetrics(profile) {
  if (!profile) return null
  const { followers, following, avg_likes, avg_comments } = profile
  const followerFollowingRatio = Number(((followers || 0) / (following || 1)).toFixed(2))
  const engagementRate = Number((((avg_likes || 0) + (avg_comments || 0)) / (followers || 1) * 100).toFixed(2))
  const commentLikeRatio = Number(((avg_comments || 0) / (avg_likes || 1)).toFixed(3))

  // Simple heuristic scoring (client-side demo only)
  const erScore = Math.max(0, Math.min(60, engagementRate * 2))
  const ffScore = followerFollowingRatio >= 2 ? 20 : followerFollowingRatio >= 1 ? 10 : 5
  const clrScore = Math.max(0, Math.min(20, commentLikeRatio * 100))
  let score = Math.round(erScore + ffScore + clrScore)
  score = Math.max(0, Math.min(100, score))

  const label = score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low'

  const flags = []
  if (engagementRate < 1) flags.push('Low engagement rate')
  if (commentLikeRatio < 0.02) flags.push('Low comment-to-like ratio')
  if (followerFollowingRatio < 0.5) flags.push('High following compared to followers')

  return { followerFollowingRatio, engagementRate, commentLikeRatio, score, label, flags }
}

function getProfileAnalysis(profile) {
  if (!profile) return null
  const metrics = computeMetrics(profile)

  if (profile.analysis) {
    return {
      score: profile.analysis.score ?? metrics.score,
      level: profile.analysis.level ?? metrics.label,
      flags: profile.analysis.flags ?? metrics.flags,
    }
  }

  return {
    score: metrics.score,
    level: metrics.label,
    flags: metrics.flags,
  }
}

export default function App() {
  const [selected, setSelected] = useState(sampleProfiles[0])
  const metrics = computeMetrics(selected)
  const profile = { ...selected, analysis: getProfileAnalysis(selected) }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <h2>Sample Profiles</h2>
        <ul className="profile-list">
          {sampleProfiles.map(p => (
            <li key={p.username} className={p.username === selected.username ? 'selected' : ''}>
              <button onClick={() => setSelected(p)}>@{p.username}</button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-view">
        <h1>Influencer Authenticator — Results</h1>
        <Results profile={profile} metrics={metrics} />
      </main>
    </div>
  )
}
