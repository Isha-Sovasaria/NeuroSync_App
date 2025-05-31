import React from 'react';
import HomePage from './HomePage';
import './App.css';        // optional, just for CRA’s default styles

function App() {
  const name = 'user';
  return <HomePage userName={name} />;
}

export default App;
