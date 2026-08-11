import './Results.css';

function Results() {
  return (
    <div className="results-screen">
      <button className="back-btn">← Back</button>
      <h2>@tech_nomad</h2>

      <div className="score-circle">
        <span className="score-number">92</span>
        <span className="score-label">out of 100</span>
      </div>

      <div className="trust-badge">High Authenticity</div>

      <h3>Authenticity Metrics</h3>
      <div className="metrics-card">
        <p>Posting Consistency</p>
        <p>Engagement Quality</p>
        <p>Follower Analysis: 91/100</p>
        <p>Content Originality: 95/100</p>
      </div>

      <button className="cta-btn">Share Report</button>
    </div>
  );
}

export default Results;