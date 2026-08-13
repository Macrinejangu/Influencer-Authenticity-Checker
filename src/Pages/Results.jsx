import React from 'react'
import ScoreBadge from './ScoreBadge.jsx'
import MetricsBreakdown from './MetricsBreakdown.jsx'
import './Results.css'

export default function Results({ profile, metrics }) {
  if (!profile || !metrics) {
    return <div className="results-empty">Select a profile to see results.</div>
  }

  const analysis = profile.analysis ?? {
    score: metrics.score,
    level: metrics.label,
    flags: metrics.flags,
  }

  return (
    <section className="results-card">
      <header className="results-header">
        <div>
          <h2>{profile.username}</h2>
          <div className="handle">{profile.platform}</div>
        </div>
      </div>

      <div className="results-body">
        <MetricsBreakdown profile={profile} metrics={metrics} />

        {analysis.flags && analysis.flags.length > 0 && (
          <div className="flags">
            <h3>Flags</h3>
            <ul>
              {analysis.flags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
        </div>
        )}
      </div>
    </section>
  )
}
