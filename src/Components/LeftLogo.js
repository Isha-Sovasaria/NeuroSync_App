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
  <p className="tagline">Your mental health companion</p>

        <img
          src="/dolphin.png"
          alt="Dolphin"
          className="dolphin-img"
        />

        <h2 className="welcome-text">{isLogin?"Welcome Back!":"Welcome"}</h2>
    
    </div>
    </div>
    
  )
}