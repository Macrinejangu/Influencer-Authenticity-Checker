

import './Landing.css'
 
function Landing({
  onGetStarted,
  imageSrc,
  imageAlt = "",
  title = "Check if a social media account is real",
  description = "Our automated system cross-references engagement rates, following patterns, and comment quality to deliver real-time transparency into audience authenticity",
}) {
  return (
    <div className="landing">
      <div className="landing__hero">
        {imageSrc ? (
          <img className="landing__image" src={imageSrc} alt={imageAlt} />
        ) : (
          <div className="landing__image-placeholder" />
        )}
      </div>

      <div className="landing__content">
        <h1 className="landing__title">{title}</h1>
        <p className="landing__description">{description}</p>

        <button className="landing__button" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}
export default Landing;
