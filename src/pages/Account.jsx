import Layout from '../components/Layout';
import './Account.css';

function Account() {
  return (
    <Layout>
      <div className="account-screen">
        <h1>Account</h1>
        <div className="account-dashboard">
          <div className="profile-section">
            <div className="avatar-large">JW</div>
            <h2>Jane Wanjiru</h2>
            <p className="email">jane.wanjiru@email.com</p>
            <p className="phone">+254 7XX XXX XXX</p>
          </div>
          <div className="credits-card">
            <p className="credits-label">Credits Balance</p>
            <p className="credits-value">24</p>
            <p className="credits-subtext">checks remaining</p>
          </div>
          {/* TODO: credits/quota logic (starting balance, renewal, zero-balance behavior)
              intentionally left unresolved, team decided to handle this after final submission
              due to the 3-day deadline. See README "Known Limitations". */}
        </div>
      </div>
    </Layout>
  );
}

export default Account;