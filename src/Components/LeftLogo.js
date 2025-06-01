import React from 'react'

export default function LeftLogo({isLogin}) {
  return (
    <div className="left-panel">
      <div className="logo-wrapper">
        <img
        src="/NeuroSync.png"
        alt="NeuroSync Logo"
        className="logo-img"
        />
        <h3 className="tagline">Your mental health companion</h3>
      </div>
        <img
          src="/clear_dolphin.png"
          alt="Dolphin"
          className="dolphin-img"
        />
        <p className="welcome-text">{isLogin?"Welcome Back!":"Welcome"}</p>
    
    </div>
  )
}