import React from 'react'

export default function LeftLogo({isLogin}) {
  return (
    // <div className="left-panel">
    //   <div className="logo-wrapper">
    //     <img src="/NeuroSync.png" alt="NeuroSync Logo" className="logo-img"/>
    //     <div className="tagline">Your mental health companion</div>
    //   </div>
      
    //   <div className="dolphin-wrapper"></div>
    //     <img src="/clear_dolphin.png" alt="Dolphin" className="dolphin-img" />
    //     <p className="welcome-text">{isLogin?"Welcome Back!":"Welcome"}</p>
    // </div>


    // <div className="left-panel">
    //   <div className="logo-wrapper">
    //     <img src="/NeuroSync.png" alt="NeuroSync Logo" className="logo-img" />
    //     <div className="tagline">Your mental health companion</div>
    //   </div>

    //   <div className="dolphin-wrapper">
    //     <img src="/clear_dolphin.png" alt="Dolphin" className="dolphin-img" />
    //     <div className="speech-bubble">{isLogin ? "Welcome Back!" : "Welcome!"}</div>
    //   </div>
    // </div>

    <div className="left-panel">
      <div className="logo-wrapper">
        <img src="/NeuroSync.png" alt="NeuroSync Logo" className="logo-img" />
        <div className="tagline">Your mental health companion</div>
      </div>
      
      <img src="/clear_dolphin.png" alt="Dolphin" className="dolphin-img" />
      <div className="welcome-text">{isLogin ? "Welcome Back!" : "Welcome!"}</div>
    </div>
  )
}


