import { useState } from 'react';
import './Search.css';

const Platforms = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X/Twitter" },
];

 function Search({
  selectedPlatform,
  setSelectedPlatform,
  query,
  setQuery,
  handleSearch,
  searchResults,
  selectProfile,
}) {
  return (
      <section className="search-section">
      <label htmlFor="platform">Platform</label>
      <select
        id="platform"
        className="search-select"
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
      >
        {Platforms.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="@handle or profile name"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <section>
          <h2>Search Results</h2>
          <div className="results-list">
            {searchResults.map((profile) => (
              <button
                key={profile.id}
                className="profile-card"
                onClick={() => selectProfile(profile)}
              >
                <span className="profile-handle">{profile.handle}</span>
                <span className="profile-name">{profile.displayName}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </section>
  )};

export default Search;
