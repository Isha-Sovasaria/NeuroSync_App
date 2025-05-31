import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { setUsername, setPassword, setTokens } from '../store/authSlice';

export const handleGoogleSignIn = async (dispatch, setError) => {
  setError(null);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    dispatch(setUsername(user.email));
    dispatch(setPassword(''));
    dispatch(setTokens({ accessToken, refreshToken }));

    localStorage.setItem(
      'auth',
      JSON.stringify({ username: user.email, accessToken, refreshToken })
    );
   console.log("Sucess");
  } catch (err) {
    setError(err.message);
    return { success: false };
  }
};