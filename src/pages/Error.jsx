import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './Error.css';

function ErrorPage() {
  return (
    <Layout>
      <div className="error-screen">
        <div className="error-icon">!</div>
        <h2>Account Not Found</h2>
        <p className="subtitle">Double check the handle and try again</p>
        <Link to="/search" className="cta-btn">Try Again</Link>
      </div>
    </Layout>
  );
}

export default ErrorPage;