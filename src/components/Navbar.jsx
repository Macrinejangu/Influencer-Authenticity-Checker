import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="web-navbar">
      <Link to="/" className="logo">
        <span className="logo-badge">V</span>
        <span className="logo-text">VERIFY.AI</span>
      </Link>

      <div className="nav-links">
        <Link to="/search">Search</Link>
        <Link to="/history">History</Link>
        <Link to="/account">Account</Link>
      </div>
    </nav>
  );
}

export default Navbar;