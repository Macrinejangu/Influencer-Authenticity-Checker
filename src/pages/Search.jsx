import './Search.css';

function Search() {
  return (
    <div className="search-screen">
      <h1>Scan Handles</h1>
      <p className="subtitle">Enter a username across any platform to analyze</p>

      <div className="search-bar">
        <span>@</span>
        <input type="text" placeholder="username_to_verify" />
        <button className="search-icon-btn">🔍</button>
      </div>

      <div className="platform-select">
        <span>Instagram</span>
        <span>▾</span>
      </div>

      <button className="cta-btn">Check Authenticity</button>

      <h2>Recently Verified</h2>
      <div className="recents-placeholder">
        <p>Sample profile cards go here once data is wired in.</p>
      </div>
    </div>
  );
}

export default Search;