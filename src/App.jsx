import { useEffect, useState } from 'react';
import { analyzeProfile } from './utils/scoring';
import influencersUrl from './data/influencers.json?url';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfiles() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(influencersUrl);

        if (!response.ok) {
          throw new Error('Failed to load influencer data');
        }

        const data = await response.json();

        const analyzedProfiles = data.map((profile) => {
          const analysis = analyzeProfile(profile);

          return {
            ...profile,
            handle: `@${profile.username}`,
            displayName: profile.username,
            analysis,
          };
        });

        setProfiles(analyzedProfiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  function searchProfiles(query) {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      setSearchResults([]);
      setSelectedProfile(null);
      return;
    }

    const results = profiles.filter((profile) => {
      const matchesPlatform =
        profile.platform.toLowerCase() === selectedPlatform.toLowerCase();

      const matchesSearch =
        profile.username.toLowerCase().includes(searchTerm) ||
        profile.handle.toLowerCase().includes(searchTerm) ||
        profile.displayName.toLowerCase().includes(searchTerm);

      return matchesPlatform && matchesSearch;
    });

    setSearchResults(results);
    setSelectedProfile(null);
  }

  function selectProfile(profile) {
    setSelectedProfile(profile);
  }

  function clearSelection() {
    setSelectedProfile(null);
  }

  return (
    <Role4Tester
      profiles={profiles}
      selectedPlatform={selectedPlatform}
      setSelectedPlatform={setSelectedPlatform}
      searchResults={searchResults}
      searchProfiles={searchProfiles}
      selectProfile={selectProfile}
      selectedProfile={selectedProfile}
      clearSelection={clearSelection}
      loading={loading}
      error={error}
    />
  );
}

function Role4Tester({
  profiles,
  selectedPlatform,
  setSelectedPlatform,
  searchResults,
  searchProfiles,
  selectProfile,
  selectedProfile,
  clearSelection,
  loading,
  error,
}) {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    setHasSearched(true);
    searchProfiles(query);
  }

  return (
    <div className="app">
      <header>
        <p className="eyebrow">ROLE 4 TEST</p>

        <h1>Influencer Data &amp; Scoring</h1>

        <p>
          Temporary test screen for the data layer, scoring logic, and shared
          state.
        </p>
      </header>

      <section className="search-section">
        <label htmlFor="platform">Platform</label>

        <select
          id="platform"
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
        >
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
          <option value="linkedin">LinkedIn</option>
          <option value="x">X/Twitter</option>
        </select>

        <form onSubmit={handleSearch}>
          <label htmlFor="search">Search profile</label>

          <div className="search-row">
            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="@handle or profile name"
            />

            <button type="submit">Search</button>
          </div>
        </form>

        <p className="profile-count">
          {profiles.length} profiles loaded from JSON
        </p>
      </section>

      {searchResults.length > 0 ? (
        <section>
          <h2>Search Results</h2>

          <div className="results-list">
            {searchResults.map((profile) => (
              <button
                className="profile-card"
                key={profile.id}
                onClick={() => selectProfile(profile)}
              >
                <strong>{profile.handle}</strong>

                <span>{profile.displayName}</span>

                <span>{profile.platform}</span>

                <span>Score: {profile.analysis.score}/100</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        hasSearched &&
        query.trim() && (
          <p className="no-results">
            No profiles match "{query}" on {selectedPlatform}.
          </p>
        )
      )}

      {selectedProfile && (
        <section className="analysis">
          <div className="analysis-header">
            <div>
              <p className="eyebrow">{selectedProfile.platform}</p>

              <h2>{selectedProfile.handle}</h2>

              <p>{selectedProfile.displayName}</p>
            </div>

            <div className="score">
              <strong>{selectedProfile.analysis.score}</strong>

              <span>{selectedProfile.analysis.level}</span>
            </div>
          </div>

          <h3>Calculated Metrics</h3>

          <div className="metrics">
            <Metric
              label="Engagement Rate"
              value={`${selectedProfile.analysis.metrics.engagementRate.toFixed(
                2,
              )}%`}
            />

            <Metric
              label="30-Day Growth"
              value={`${selectedProfile.analysis.metrics.growth30Day.toFixed(
                2,
              )}%`}
            />

            <Metric
              label="90-Day Growth"
              value={`${selectedProfile.analysis.metrics.growth90Day.toFixed(
                2,
              )}%`}
            />

            <Metric
              label="Posts / 30 Days"
              value={selectedProfile.analysis.metrics.postsLast30Days}
            />

            <Metric
              label="Comment / Like Ratio"
              value={`${selectedProfile.analysis.metrics.commentLikeRatio.toFixed(
                2,
              )}%`}
            />

            <Metric
              label="Account Age"
              value={`${selectedProfile.analysis.metrics.accountAgeMonths} months`}
            />
          </div>

          <h3>Heuristic Flags</h3>

          {selectedProfile.analysis.flags.length === 0 ? (
            <p className="no-flags">No measurable warning patterns detected.</p>
          ) : (
            <ul className="flags">
              {selectedProfile.analysis.flags.map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          )}

          <button className="clear-button" onClick={clearSelection}>
            Clear Profile
          </button>
        </section>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
