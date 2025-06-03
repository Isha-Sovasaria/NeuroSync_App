import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { setUsername, setTokens } from '../store/authSlice';

export const handleGoogleSignIn = async (dispatch, setError,navigate) => {
  setError(null);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    dispatch(setUsername(user.email));
    dispatch(setTokens({ accessToken, refreshToken }));

    localStorage.setItem(
      'auth',
      JSON.stringify({ username: user.email, accessToken, refreshToken })
    );
    navigate('/homepage');
  } catch (err) {
    setError(err.message);
  }
};