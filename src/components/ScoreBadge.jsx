import React from 'react'
import './ScoreBadge.css'

export default function ScoreBadge({ score, label }) {
  const color = label === 'High' ? '#16a34a' : label === 'Medium' ? '#f59e0b' : '#ef4444'

  return (
    <div className="score-badge" aria-hidden>
      <div className="score-circle" style={{ borderColor: color }}>
        <div className="score-number" style={{ color }}>{score}</div>
      </div>
      <div className="score-label" style={{ color }}>{label}</div>
    </div>
  )
}
