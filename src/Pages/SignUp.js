import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase';

import { Link } from 'react-router-dom';
import '../StylingAndLayout/LoginAndSignUp.css';

import { handleGoogleSignIn } from '../utils/googleAuthHandlers';
import GoogleSignInButton from '../Components/GoogleSignInButton';
import LeftLogo from '../Components/LeftLogo';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
  function isValidPassword(pw) {
    return passwordRegex.test(pw);
  }
  const handleGoogleClick = () => {
    handleGoogleSignIn(dispatch, setError, navigate); // pass it in
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isValidPassword(password)) {
      setError(
        'Password must be at least 8 characters, include uppercase, lowercase, and a special character.'
      );
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user);
      await signOut(auth);
      navigate('/', {
        state: {
          info: '✅ Verification email sent. Please check your inbox and click the link before logging in.',
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="parent-container">
      <LeftLogo isLogin={false}/>
      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>
        <p className="subtitle">
          Already have an account? <Link to="/" className="signup-link">Log In</Link>
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => {
                const newVal = e.target.value;
                setPassword(newVal);
            
                if (!isValidPassword(newVal)) {
                  setError(
                    'Password must be at least 8 characters long, ' +
                    'include uppercase, lowercase, and a special character.'
                  );
                } else {
                  setError(null);
                }
              }}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label="Toggle password visibility"
              role="button"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="password-field">
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              aria-label="Toggle confirm password visibility"
              role="button"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit" className="btn primary">Create Account</button>
        </form>

       <GoogleSignInButton onClick={handleGoogleClick}/>

        <div className="divider"><span>or</span></div>

        <div className="extra-links">
          <button className="btn guest" onClick={() => {}}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
