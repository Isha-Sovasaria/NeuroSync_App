import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  signInWithEmailAndPassword,

} from 'firebase/auth';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  setUsername as setUsernameAction,
  setTokens,
} from '../store/authSlice';
import { handleGoogleSignIn } from '../utils/googleAuthHandlers';
import LeftLogo from '../Components/LeftLogo';
import { signOut} from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../StylingAndLayout/LoginAndSignUp.css';
import GoogleSignInButton from '../Components/GoogleSignInButton';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const signupInfo = location.state?.info || '';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const handleGoogleClick = () => {
    handleGoogleSignIn(dispatch, setError, navigate); // pass it in
  };
  useEffect(() => {
    if (signupInfo) {
      toast(signupInfo);
    }
  }, [signupInfo]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const { user } = await signInWithEmailAndPassword(auth, username, password);
      await user.reload();
      if (!user.emailVerified) {
        console.log(user);
        await signOut(auth);
        setError('🚫 Please verify your email before logging in.');
        return;
      }
      const accessToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      dispatch(setUsernameAction(username));
      dispatch(setTokens({ accessToken, refreshToken }));
      localStorage.setItem('auth', JSON.stringify({ username, accessToken, refreshToken }));
      navigate('/homepage');
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('❌ Invalid email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('⚠️ Too many failed login attempts. Try again later.');
      } else if (err.code === 'auth/invalid-email') {
        setError('❌ Invalid email format. Please enter a valid email address.');
      }
      else if (err.code === 'auth/invalid-credential') {
        setError('❌ Login failed. Invalid credentials. Please try again.');
      }
      else {
        setError(err.message); // default message for any other errors
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!username) {
      setError('Please enter your email first to reset your password.');
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, username);
      toast.info('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <div className="parent-container">
    
     <LeftLogo isLogin={true} />

      <div className="login-container">
        <h2 className="login-title">Log In</h2>
        <p className="subtitle">
          Don’t have an account? <Link to="/signup" className="signup-link">Sign Up</Link> now!
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Username</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <label htmlFor="pass">Password</label>
          <div className="password-field">
            <input
              id="pass"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
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
          <span
  onClick={handleForgotPassword}
  className="forgot-password"
  style={{
    cursor: 'pointer',
    color: '#007BFF',
    textDecoration: 'underline',
  }}
>
  Forgot Password?
</span>

          <button type="submit" className="btn primary">Sign In</button>
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