import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="layout-content">
        {children}
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default Layout;