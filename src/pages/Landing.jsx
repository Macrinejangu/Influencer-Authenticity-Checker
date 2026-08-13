

import "./Landing.css";
import BottomNav from '../components/BottomNav'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


export default function Landing({
  onGetStarted,
  imageSrc,
  imageAlt = 'Bot authenticity analysis',
  title = 'Check if any account is real',
  description = ' Our automated systems cross-references engagement rates, following patterns and comment quality to deliver real time transparency into audience authenticity',
}) {
  return (
    <div className="landing">
      <div className="landing_hero">
        <div className="landing_content">
          <h1 className="landing_title">
         Check if any <span className="landing_accent"> account </span>
         <b/>
          is real
         </h1>
            <p className="landing_description">{description}</p>

            <button className="landing_button" onClick={onGetStarted}>
              Get Started
            </button>
          </div>

          <div className="landing_visual">
            <div className="landing_card"></div>

            <div className="landing_badge landing_badge-real">
              <span className="Landing_badge-dot"></span>
              98% real
            </div>

            <div className="landing_badge landing_badge-bot">Bot Pattern</div>

            {imageSrc ? (
              <img className="landing_image" src={imageSrc} alt={imageAlt} />
            ) : (
              <div className="landing_image-placeholder">
                <div className="landing_face-glow"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
