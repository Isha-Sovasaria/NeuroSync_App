import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/HomePage';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {
  setUsername ,
  setPassword,
  setTokens,
} from './store/authSlice';


function App() {
 const dispatch=useDispatch();
  useEffect(() => {
    // Try to retrieve user session on app load
    const authData = JSON.parse(localStorage.getItem('auth'));

    if (authData && authData.accessToken && authData.username) {
      dispatch(setUsername(authData.username));
      dispatch(
        setTokens({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;