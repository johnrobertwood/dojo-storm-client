import React from 'react';
import './App.css';
import Clock from './Clock';
import Timer from './Timer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://woodwebdev.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wood Web Development
        </a>
      </header>
      <Clock />
      <Timer />
    </div>
  );
}

export default App;
