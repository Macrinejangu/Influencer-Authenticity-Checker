import React, { useState } from 'react'
import Results from './components/Results.jsx'
import './index.css'

const sampleProfiles = [
  { handle: 'real_influencer', name: 'Aurtha Johnson', followers: 500000, following: 90, posts: 2000, avg_likes: 10000, avg_comments: 3000 },
  { handle: 'medium_profile', name: 'TheHidez', followers: 230000, following: 190, posts: 900, avg_likes: 4000, avg_comments: 1500 },
  { handle: 'fake_profile', name: 'Gilbert', followers: 50000, following: 800, posts: 300, avg_likes: 800, avg_comments: 60 },
  { handle: 'fake_profile', name: 'Elliude', followers: 20000, following: 1100, posts: 180, avg_likes: 400, avg_comments: 20 },
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

export default function App() {
  const [selected, setSelected] = useState(sampleProfiles[0])
  const metrics = computeMetrics(selected)

  return (
    <div className="app-root">
      <aside className="sidebar">
        <h2>Sample Profiles</h2>
        <ul className="profile-list">
          {sampleProfiles.map(p => (
            <li key={p.handle} className={p.handle === selected.handle ? 'selected' : ''}>
              <button onClick={() => setSelected(p)}>{p.name} @{p.handle}</button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-view">
        <h1>Influencer Authenticator — Results</h1>
        <Results profile={selected} metrics={metrics} />
      </main>
    </div>
  )
}
