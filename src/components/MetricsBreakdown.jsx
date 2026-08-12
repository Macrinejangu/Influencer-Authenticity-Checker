import React from 'react'

function metricRow(label, value, unit = '') {
  return (
    <div className="metric-row" key={label}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value} {unit}</div>
    </div>
  )
}

export default function MetricsBreakdown({ profile, metrics }) {
  return (
    <div className="metrics">
      <h3>Metrics</h3>
      {metricRow('Followers', profile.followers.toLocaleString())}
      {metricRow('Following', profile.following.toLocaleString())}
      {metricRow('Follower/Following', metrics.followerFollowingRatio)}
      {metricRow('Engagement Rate', metrics.engagementRate, '%')}
      {metricRow('Comment/Like Ratio', metrics.commentLikeRatio)}
      {metricRow('Posts', profile.posts)}
    </div>
  )
}
