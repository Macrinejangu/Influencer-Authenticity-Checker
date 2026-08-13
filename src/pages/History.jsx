import { Link } from 'react-router-dom';

import Layout from '../components/Layout';

import { useProfiles } from '../hooks/useProfiles';
import { useScanHistory } from '../hooks/useScanHistory';

import { formatRelativeTime } from '../utils/formatTime';

import {
  getTrustDisplayLabel,
  getTrustBadgeClass,
} from '../utils/trustLabel';

import './History.css';

function formatNumber(number) {
  return new Intl.NumberFormat().format(number || 0);
}

function History() {
  const {
    profiles,
    loading: profilesLoading,
    error: profilesError,
  } = useProfiles();

  const {
    history,
    removeScan,
    clearHistory,
  } = useScanHistory();

  if (profilesLoading) {
    return (
      <Layout>
        <main className="history-page">
          <div className="empty-history">
            <h2>Loading history...</h2>
          </div>
        </main>
      </Layout>
    );
  }

  if (profilesError) {
    return (
      <Layout>
        <main className="history-page">
          <div className="empty-history">
            <h2>Unable to load profiles</h2>

            <p>{profilesError}</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="history-page">
        <div className="history-container">

          <header className="history-header">
            <div>
              <p className="history-eyebrow">
                SCAN RECORDS
              </p>

              <h1>Analysis History</h1>

              <p className="history-subtitle">
                Review previous influencer authenticity analyses.
              </p>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                className="clear-history-button"
                onClick={clearHistory}
              >
                Clear History
              </button>
            )}
          </header>

          {history.length === 0 ? (
            <section className="empty-history">

              <div className="empty-history-icon">
                ⟳
              </div>

              <h2>No scans yet</h2>

              <p>
                Completed influencer analyses will appear here.
              </p>

              <Link
                to="/search"
                className="history-primary-button"
              >
                Analyze an Influencer
              </Link>

            </section>
          ) : (
            <section className="history-list">

              {history.map((entry) => {
                const profile = profiles.find(
                  (item) =>
                    item.username === entry.username
                );

                if (!profile) {
                  return null;
                }

                const analysis = profile.analysis;

                const trustLabel =
                  getTrustDisplayLabel(analysis.level);

                const trustBadgeClass =
                  getTrustBadgeClass(analysis.level);

                return (
                  <article
                    className="history-card"
                    key={entry.username}
                  >

                    <div className="history-card-top">

                      <div className="history-profile">

                        <div className="profile-placeholder">
                          {profile.username
                            ? profile.username
                                .charAt(0)
                                .toUpperCase()
                            : '?'}
                        </div>

                        <div>
                          <h2>
                            {profile.handle}
                          </h2>

                          <p>
                            {profile.platform}
                          </p>

                          <span>
                            {formatRelativeTime(
                              entry.checkedAt
                            )}
                          </span>
                        </div>

                      </div>

                      <div className="history-score">

                        <span>Score</span>

                        <strong>
                          {analysis.score}
                        </strong>

                        <small
                          className={`history-trust-badge ${trustBadgeClass}`}
                        >
                          {trustLabel}
                        </small>

                      </div>

                    </div>

                    <div className="history-metrics">

                      <div>
                        <span>Followers</span>

                        <strong>
                          {formatNumber(
                            analysis.metrics.followers
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Engagement</span>

                        <strong>
                          {Number(
                            analysis.metrics.engagementRate || 0
                          ).toFixed(2)}
                          %
                        </strong>
                      </div>

                      <div>
                        <span>30-Day Growth</span>

                        <strong>
                          {Number(
                            analysis.metrics.growth30Day || 0
                          ).toFixed(2)}
                          %
                        </strong>
                      </div>

                      <div>
                        <span>Flags</span>

                        <strong>
                          {analysis.flags.length}
                        </strong>
                      </div>

                    </div>

                    {analysis.flags.length > 0 && (
                      <div className="history-flags">

                        {analysis.flags.map((flag) => (
                          <span key={flag}>
                            {flag}
                          </span>
                        ))}

                      </div>
                    )}

                    <div className="history-card-footer">

                      <Link
                        to={`/results/${profile.username}`}
                        className="view-result-button"
                      >
                        View Analysis
                      </Link>

                      <button
                        type="button"
                        className="delete-history-button"
                        onClick={() =>
                          removeScan(profile.username)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </article>
                );
              })}

            </section>
          )}

        </div>
      </main>
    </Layout>
  );
}

export default History;