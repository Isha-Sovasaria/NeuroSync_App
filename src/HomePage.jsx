import React, { useState, useEffect } from 'react';
import './HomePage.css';
import dolphinImg from './assets/clear_dolphin.png';
import logoImg from './assets/app_logo.png';
import bgImg from './assets/lightocean.png';

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

  // Holds the list of quotes fetched from the Hugging Face dataset
  const [allQuotes, setAllQuotes] = useState([]);
  // Holds the single quote object we'll display today
  const [todayQuote, setTodayQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    fetch(
      'https://datasets-server.huggingface.co/rows?dataset=asuender%2Fmotivational-quotes&config=quotes&split=train&offset=0&length=100'
    )
      .then((res) => res.json())
      .then((data) => {
        // The API returns an object; the quotes are in data.rows
        // Each row has a `row` field containing a `quote` and an `author`
        if (data && Array.isArray(data.rows)) {
          const quotesArray = data.rows.map((entry) => {
            return {
              text: entry.row.quote,
              author: entry.row.author
            };
          });
          setAllQuotes(quotesArray);

          // 2️⃣ Once we have the full array, pick a deterministic "quote of the day"
          pickTodaysQuote(quotesArray);
        }
      })
      .catch((err) => console.error('❌ Failed to fetch quotes:', err));
  }, []);

  // 3️⃣ Helper: pick one quote from the array based on current day
  function pickTodaysQuote(quotesArray) {
    if (quotesArray.length === 0) return;

    // Compute day-of-year (0-based)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear; // milliseconds since start of year
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay); // e.g. Jan 1 => 1, Jan 2 => 2, etc.

    // Use modulo to pick an index in [0 .. quotesArray.length-1]
    const index = dayOfYear % quotesArray.length;
    const chosen = quotesArray[index];
    setTodayQuote(chosen);
  }

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
        <div className="logo-container">
          <img src={logoImg} className="logo-large" alt="NeuroSync" />
        </div>

        <nav className="nav-links">
          <a href="#mood">Mood Map</a>
          <a href="#meditate">Guided Meditation</a>
          <a href="#journal">Daily Journal</a>
          <a href="#forum">Discussion Forum</a>
          <a href="#help">Get Help</a>
        </nav>

        <div className="profile-container">
          <button className="profile-btn" onClick={goProfile}>
            My Profile
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* ===== Quote-of-the-day Banner ===== */}
        {todayQuote.text && (
          <section className="quote-section">
            <div className="quote-text">{todayQuote.text}</div>
            <div className="quote-author">— {todayQuote.author}</div>
          </section>
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

        <button className="chat-btn" onClick={goChat}>
          Chat With Molly
        </button>
      </main>
    </div>
  );
}