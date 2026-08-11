import { NavLink } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-tab active' : 'nav-tab'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Search</span>
      </NavLink>

      <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-tab active' : 'nav-tab'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
        <span>History</span>
      </NavLink>

      <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-tab active' : 'nav-tab'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
        <span>Account</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;