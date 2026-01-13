// src/App.jsx
import { useState } from 'react';
import Home from './home';
import ChatInterface from './ChatInterface';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'chat'

  return (
    <>
      {view === 'home' ? (
        <Home onStart={() => setView('chat')} />
      ) : (
        <ChatInterface onBack={() => setView('home')} />
      )}
    </>
  );
}

export default App;