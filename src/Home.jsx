// src/Home.jsx
import './App.css';

function Home({ onStart }) {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo"> AI Movie/series Recommendation </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <button className="nav-btn" onClick={onStart}>Try Now</button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Stop Scrolling.<br />Start <span className="highlight">Watching.</span></h1>
          <p className="hero-subtitle">
            Your personal AI curator. Tell us what you love, and we'll tell you 
            what to watch next. No more hour-long debates on Netflix.
          </p>
          <button className="cta-button" onClick={onStart}>
            Get Recommendations ✨
          </button>
          
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">100k+</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Instant</span>
              <span className="stat-label">AI Analysis</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Free</span>
              <span className="stat-label">Forever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;