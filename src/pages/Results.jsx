import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Layout from '../components/Layout';

import { useProfiles } from '../hooks/useProfiles';
import { useScanHistory } from '../hooks/useScanHistory';

import { getTrustDisplayLabel, getTrustBadgeClass } from '../utils/trustLabel';

import './Results.css';

function formatNumber(number) {
  return new Intl.NumberFormat().format(number || 0);
}

function formatPercentage(number) {
  return `${Number(number || 0).toFixed(2)}%`;
}

function Results() {
  const { handle } = useParams();

  const { profiles, loading, error } = useProfiles();

  const { history, recordScan } = useScanHistory();

  const username = handle?.replace('@', '').trim().toLowerCase();

  const profile = profiles.find(
    (item) => item.username.toLowerCase() === username,
  );

  useEffect(() => {
    if (!profile) {
      return;
    }

    const alreadyRecorded = history.some(
      (entry) => entry.username === profile.username,
    );

    if (!alreadyRecorded) {
      recordScan(profile.username);
    }
  }, [profile, history, recordScan]);

  if (loading) {
    return (
      <Layout>
        <main className="results-page">
          <div className="results-error">
            <h1>Loading Analysis...</h1>
            <p>Please wait while the profile is being loaded.</p>
          </div>
        </main>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <main className="results-page">
          <div className="results-error">
            <h1>Unable to Load Profile</h1>
            <p>{error}</p>

            <Link to="/search" className="results-secondary-button">
              Back to Search
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <main className="results-page">
          <div className="results-container">
            <section className="results-error">
              <p className="results-eyebrow">AUTHENTICITY CHECK</p>

              <h1>Profile Not Found</h1>

              <p>
                We could not find a profile for
                <strong> @{handle}</strong>.
              </p>

              <Link to="/search" className="results-secondary-button">
                Back to Search
              </Link>
            </section>
          </div>
        </main>
      </Layout>
    );
  }

  const analysis = profile.analysis;

  const trustLabel = getTrustDisplayLabel(analysis.level);

  const trustBadgeClass = getTrustBadgeClass(analysis.level);

  return (
    <Layout>
      <main className="results-page">
        <div className="results-container">
          <header className="results-header">
            <div>
              <p className="results-eyebrow">AUTHENTICITY ANALYSIS</p>

              <h1>{profile.handle}</h1>

              <p className="results-platform">{profile.platform}</p>
            </div>

            <Link to="/history" className="results-history-link">
              History
            </Link>
          </header>

          <section className="results-score-card">
            <div className="results-score-circle">
              <span className="results-score">{analysis.score}</span>

              <span className="results-score-out-of">/ 100</span>
            </div>

            <div className="results-score-info">
              <p className="results-section-label">AUTHENTICITY LEVEL</p>

              <div className={`trust-badge ${trustBadgeClass}`}>
                {trustLabel}
              </div>

              <p>
                This result is based on the available engagement, growth,
                posting activity and account-age data.
              </p>
            </div>
          </section>

          <section className="results-section">
            <div className="results-section-heading">
              <p className="results-section-label">PROFILE METRICS</p>

              <h2>Account Overview</h2>
            </div>

            <div className="results-metrics-grid">
              <div className="results-metric-card">
                <span>Followers</span>
                <strong>{formatNumber(analysis.metrics.followers)}</strong>
              </div>

              <div className="results-metric-card">
                <span>Following</span>
                <strong>{formatNumber(analysis.metrics.following)}</strong>
              </div>

              <div className="results-metric-card">
                <span>Engagement Rate</span>
                <strong>
                  {formatPercentage(analysis.metrics.engagementRate)}
                </strong>
              </div>

              <div className="results-metric-card">
                <span>30-Day Growth</span>
                <strong>
                  {formatPercentage(analysis.metrics.growth30Day)}
                </strong>
              </div>

              <div className="results-metric-card">
                <span>90-Day Growth</span>
                <strong>
                  {formatPercentage(analysis.metrics.growth90Day)}
                </strong>
              </div>

              <div className="results-metric-card">
                <span>Posts / 30 Days</span>
                <strong>
                  {formatNumber(analysis.metrics.postsLast30Days)}
                </strong>
              </div>

              <div className="results-metric-card">
                <span>Average Likes</span>
                <strong>{formatNumber(analysis.metrics.averageLikes)}</strong>
              </div>

              <div className="results-metric-card">
                <span>Average Comments</span>
                <strong>
                  {formatNumber(analysis.metrics.averageComments)}
                </strong>
              </div>

              <div className="results-metric-card">
                <span>Account Age</span>
                <strong>{analysis.metrics.accountAgeMonths} months</strong>
              </div>
            </div>
          </section>

          <section className="results-section">
            <div className="results-section-heading">
              <p className="results-section-label">HEURISTIC CHECKS</p>

              <h2>Potential Signals</h2>
            </div>

            {analysis.flags.length === 0 ? (
              <div className="results-no-flags">
                <strong>No unusual signals detected</strong>

                <p>
                  None of the current heuristic checks were triggered by this
                  profile.
                </p>
              </div>
            ) : (
              <div className="results-flags-list">
                {analysis.flags.map((flag) => (
                  <div className="results-flag" key={flag}>
                    <span className="results-flag-icon">!</span>

                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="results-actions">
            <Link to="/search" className="results-secondary-button">
              Analyze Another
            </Link>

            <Link to="/history" className="results-primary-button">
              View Scan History
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Results;
