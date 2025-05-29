import React, { useState } from 'react';
import './HomePage.css';
import dolphinImg from './assets/dolphin.png';
import logoImg from './logo.png';

const EMOTIONS = [
  { label: 'Happy',    emoji: '😊' },
  { label: 'Sad',      emoji: '😢' },
  { label: 'Stressed', emoji: '😬' },
//   { label: 'Sleepy',   emoji: '😴' },
  { label: 'Tired',    emoji: '😫' },
  { label: 'Excited',  emoji: '🤩' },
//   { label: 'Nervous',  emoji: '😬' },
  { label: 'Annoyed',  emoji: '😠' },
];

export default function HomePage({ userName = 'Friend' }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (emotion) => {
    setSelected(emotion);
    console.log(`📝 User feels: ${emotion}`);
    // TODO: send to your backend/api here
  };

  return (
    <div className="home-page">
      <header className="nav">
        {/* <img src={dolphinImg} alt="NeuroSync logo" className="logo" /> */}
        <img src={logoImg} className="logo-large" alt="NeuroSync" />
        <nav>
          <a href="#mood">Mood Map</a>
          <a href="#meditate">Guided Meditation</a>
          <a href="#journal">Daily Journal</a>
          <a href="#forum">Discussion Forum</a>
          <a href="#help">Get Help</a>
          <button className="profile-btn">My Profile</button>
        </nav>
      </header>

      <main>
        <div className="hero">
          <div className="speech-bubble">
            Hey there <strong>{userName}</strong>!<br/>
            How are you feeling today?
          </div>
          <img src={dolphinImg} alt="Dolphin mascot" className="dolphin" />
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

        {selected && (
          <button className="chat-btn">
            Chat With Molly
          </button>
        )}
      </main>
    </div>
  );
}
