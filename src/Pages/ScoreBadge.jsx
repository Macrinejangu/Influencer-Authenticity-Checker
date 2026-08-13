import React from 'react'
import { getTrustBadgeClass, getTrustDisplayLabel } from '../utils/trustLabel.js'
import './ScoreBadge.css'

export default function ScoreBadge({ score, label }) {
  const trustLabel = getTrustDisplayLabel(label)
  const badgeClass = getTrustBadgeClass(label)
  const ariaLabel = `Trust score ${score} out of 100, ${trustLabel}`

  return (
    <div className={`score-badge ${badgeClass}`} aria-label={ariaLabel} role="status">
      <div className="score-circle">
        <div className="score-number">{score}</div>
      </div>
      <div className="score-label">{trustLabel}</div>
    </div>
  )
}
