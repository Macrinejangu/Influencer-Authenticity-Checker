import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import './Account.css';

const STORAGE_KEY = 'influencer-authenticity-account';
const MONTHLY_CREDITS = 25;

const nextRenewalDate = () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

function loadAccount() {
  const initialAccount = {
    name: 'Jane Wanjiru', email: 'jane.wanjiru@email.com', phone: '+254 7XX XXX XXX',
    credits: MONTHLY_CREDITS, renewalDate: nextRenewalDate().toISOString(), plan: 'Verify Premium',
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return initialAccount;
    if (new Date(saved.renewalDate) <= new Date()) {
      return { ...initialAccount, ...saved, credits: MONTHLY_CREDITS, renewalDate: nextRenewalDate().toISOString() };
    }
    return { ...initialAccount, ...saved };
  } catch {
    return initialAccount;
  }
}

function Account() {
  const [account, setAccount] = useState(loadAccount);
  const [editing, setEditing] = useState(false);
  const [buying, setBuying] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(account)), [account]);

  const update = (field, value) => setAccount((current) => ({ ...current, [field]: value }));
  const addCredits = (amount) => {
    update('credits', account.credits + amount);
    setBuying(false);
    setNotice(`${amount} credits added to your balance.`);
  };
  const changePlan = () => {
    const isPremium = account.plan === 'Verify Premium';
    setAccount((current) => ({ ...current, plan: isPremium ? 'Verify Pro' : 'Verify Premium', credits: Math.max(current.credits, isPremium ? 50 : 25) }));
    setNotice(`Plan changed to ${isPremium ? 'Verify Pro' : 'Verify Premium'}.`);
  };

  return (
    <Layout>
      <div className="account-screen">
        <h1>Account Settings</h1>
        <p className="account-subtitle">Manage your personal profile, subscription, and check credits.</p>

        <div className="account-dashboard">
          <div className="profile-section">
            <div className="avatar-large">{account.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
            {editing ? <div className="profile-form">
              <input aria-label="Name" value={account.name} onChange={(event) => update('name', event.target.value)} />
              <input aria-label="Email" type="email" value={account.email} onChange={(event) => update('email', event.target.value)} />
              <input aria-label="Phone" value={account.phone} onChange={(event) => update('phone', event.target.value)} />
            </div> : <>
              <h2>{account.name}</h2>
              <p className="email">{account.email}</p>
              <p className="phone">{account.phone}</p>
            </>}
            <hr className="profile-divider" />
            <button className="edit-profile-btn" onClick={() => { setEditing((value) => !value); if (editing) setNotice('Profile updated.'); }}>{editing ? 'Save Profile' : 'Edit Profile'}</button>
          </div>

          <div className="account-right-column">
            <div className="credits-card">
              <div className="credits-info">
                <p className="credits-label">Credits Balance</p>
                <div className="credits-row">
                  <span className="credits-value">{account.credits}</span>
                  <span className="credits-subtext">{account.credits === 1 ? 'check remaining' : 'checks remaining'}</span>
                </div>
                <p className="credits-renew">{account.credits === 0 ? 'No credits remain. Add credits or wait for renewal.' : `Your credits will renew on ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(account.renewalDate))}.`}</p>
              </div>
              <div className="credits-action">
                <button className="get-credits-btn" onClick={() => setBuying((value) => !value)}>Get More Credits</button>
                {buying && <div className="credit-options"><button onClick={() => addCredits(10)}>10 credits, $5</button><button onClick={() => addCredits(25)}>25 credits, $10</button></div>}
                <p className="credits-plans-note">Plans start from $5</p>
              </div>
            </div>

            <div className="subscription-card">
              <div className="subscription-info">
                <span className="subscription-icon">♛</span>
                <div>
                  <p className="subscription-name">{account.plan}</p>
                  <p className="subscription-tier">Professional tier account</p>
                </div>
              </div>
              <div className="subscription-actions"><span className="subscription-badge">Active Plan</span><button className="change-plan-btn" onClick={changePlan}>{account.plan === 'Verify Premium' ? 'Upgrade' : 'Downgrade'}</button></div>
            </div>
          </div>
        </div>

        {notice && <p className="account-notice" role="status">{notice}</p>}
      </div>
    </Layout>
  );
}

export default Account;
