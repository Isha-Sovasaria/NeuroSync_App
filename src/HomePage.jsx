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

  // Holds the list of quotes fetched from the Hugging Face dataset
  const [allQuotes, setAllQuotes] = useState([]);
  // Holds the single quote object we’ll display today
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

        {/* ===== Quote-of-the-day Banner ===== */}
        {todayQuote.text && (
          <section className="quote-section">
            “{todayQuote.text}”
            <span className="quote-author">— {todayQuote.author}</span>
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

        <button className="chat-btn" oncClick={goChat}>
            Chat With Molly
          </button>
      </main>
    </div>
  );
}