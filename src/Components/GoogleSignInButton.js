import React from 'react';

export default function GoogleSignInButton({ onClick }) {
  return (
    <button onClick={onClick} className="btn google">
      <img
        src="/GoogleLogo.png"
        alt="Google"
        className="google-icon"
       
      />
      Continue with Google
    </button>
  );
}