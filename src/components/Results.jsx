import React from 'react'
import ScoreBadge from './ScoreBadge.jsx'
import MetricsBreakdown from './MetricsBreakdown.jsx'
import './Results.css'

export default function Results({ profile, metrics }) {
  if (!profile || !metrics) {
    return <div className="results-empty">Select a profile to see results.</div>
  }

  return (
    <section className="results-card">
      <header className="results-header">
        <div>
          <h2>{profile.name}</h2>
          <div className="handle">@{profile.handle}</div>
        </div>
        <ScoreBadge score={metrics.score} label={metrics.label} />
      </header>

      <div className="results-body">
        <MetricsBreakdown profile={profile} metrics={metrics} />

        {metrics.flags && metrics.flags.length > 0 && (
          <div className="flags">
            <h3>Flags</h3>
            <ul>
              {metrics.flags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
