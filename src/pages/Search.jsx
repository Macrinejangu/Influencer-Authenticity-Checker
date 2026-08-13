import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import { useProfiles } from '../hooks/useProfiles';

import './Search.css';
import BottomNav from '../components/BottomNav'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Platforms = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'x', label: 'X/Twitter' },
];

function Search() {
  const navigate = useNavigate();

  const { profiles, loading, error } = useProfiles();

  const [selectedPlatform, setSelectedPlatform] = useState('instagram');

  const [query, setQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const cleanQuery = query.replace('@', '').trim().toLowerCase();

    const results = profiles.filter((profile) => {
      const matchesQuery = profile.username.toLowerCase().includes(cleanQuery);

      const matchesPlatform =
        profile.platform?.toLowerCase() === selectedPlatform.toLowerCase();

      return matchesQuery && matchesPlatform;
    });

    setSearchResults(results);
  }

  function selectProfile(profile) {
    navigate(`/results/${profile.username}`);
  }

  return (
    <Layout>
      <section className="search-section">
        <label htmlFor="platform">Platform</label>

        <select
          id="platform"
          className="search-select"
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
        >
          {Platforms.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>

        <form className="search-wrap" onSubmit={handleSearch}>
          <label htmlFor="search">Search profile</label>

          <div className="search-row">
            <input
              id="search"
              className="search-input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="@handle or profile name"
            />

            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </form>

        {loading && <p>Loading influencer profiles...</p>}

        {error && <p>Failed to load influencer profiles: {error}</p>}

        {!loading && !error && searchResults.length > 0 && (
          <section>
            <h2>Search Results</h2>

            <div className="results-list">
              {searchResults.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  className="profile-card"
                  onClick={() => selectProfile(profile)}
                >
                  <span className="profile-handle">{profile.handle}</span>

                  <span className="profile-name">{profile.platform}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {!loading && !error && query.trim() && searchResults.length === 0 && (
          <p>No matching profile found.</p>
        )}
      </section>
    </Layout>
  );
}

export default Search;
