import React, { useState, useEffect } from 'react';
import './HomePage.css';
import dolphinImg from './assets/dolphin.png';
import logoImg from './assets/NeuroSync_logo.png';

const EMOTIONS = [
  { label: 'Happy',    emoji: '😊' },
  { label: 'Sad',      emoji: '😢' },
  { label: 'Stressed', emoji: '😬' },
  { label: 'Tired',    emoji: '😫' },
  { label: 'Excited',  emoji: '🤩' },
  { label: 'Annoyed',  emoji: '😠' },
];

export default function HomePage({ userName = 'Friend' }) {
  const [selected, setSelected] = useState(null);
  const [quote, setQuote] = useState({ q: '', a: '' });

  useEffect(() => {
    fetch('https://zenquotes.io/api/today/')
      .then(res => res.json())
      .then(data => {
        console.log('ZenQuotes data:', data);
        if (Array.isArray(data) && data[0]) {
          setQuote({ q: data[0].q, a: data[0].a });
        }
      })
      .catch(err => console.error('Quote fetch error:', err));
  }, []);

  const handleClick = (emotion) => {
    setSelected(emotion);
    console.log(`📝 User feels: ${emotion}`);
    // TODO: send to your backend/api here
  };

  const goChat = () => {
    // replace with your chat route or external URL
    window.location.href = '/chat';
  };

  const goProfile = () => {
    // replace with your profile route
    window.location.href = '/profile';
  };

  return (
    <div className="home-page">
      <header className="nav">
        {/* NeuroSync logo on the left */}
        <img src={logoImg} className="logo-large" alt="NeuroSync" />

        {/* Centered navigation links */}
        <nav className="nav-links">
          <a href="#mood">Mood Map</a>
          <a href="#meditate">Guided Meditation</a>
          <a href="#journal">Daily Journal</a>
          <a href="#forum">Discussion Forum</a>
          <a href="#help">Get Help</a>
        </nav>

        {/* Profile button on the right */}
        <button className="profile-btn" onClick={goProfile}>
          My Profile
        </button>
      </header>

      <main>
        {quote.q && (
          <div className="quote-section">
            “{quote.q}”
            <span className="quote-author">— {quote.a}</span>
          </div>
        )}

        <div className="hero">
          {/* dolphin on the left now */}
          <img
            src={dolphinImg}
            alt="Dolphin mascot"
            className="dolphin"
          />
          {/* speech bubble still centered next to it */}
          <div className="speech-bubble">
            Hey there <strong>{userName}</strong>!<br />
            How are you feeling today?
          </div>
        </div>

        <div className="emotions-grid">
          {EMOTIONS.map(({ label, emoji }) => (
            <button
              key={label}
              className={`emotion-btn ${selected === label ? 'selected' : ''}`}
              onClick={() => handleClick(label)}
            >
              <span className="emoji">{emoji}</span>
              <span className="label">{label}</span>
            </button>
          ))}
        </div>

        <button className="chat-btn" oncClick={goChat}>
            Chat With Molly
          </button>
      </main>
    </div>
  );
}
