import React from 'react';
import HomePage from './HomePage';
import './App.css';        // optional, just for CRA’s default styles

function App() {
  const name = 'Alex';
  return <HomePage userName={name} />;
}

export default App;
