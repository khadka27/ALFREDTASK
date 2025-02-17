// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ReviewFlashcards from './ReviewFlashcards';
import AddFlashcard from './AddFlashcard';
import Navbar from './Navbar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Set the overall style based on dark mode
  const appStyle = {
    backgroundColor: darkMode ? '#111827' : '#F9FAFB',
    color: darkMode ? '#F3F4F6' : '#1F2937',
    minHeight: '100vh'
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar
          token={token}
          handleLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Routes>
          {token ? (
            <>
              <Route path="/review" element={<ReviewFlashcards token={token} darkMode={darkMode} />} />
              <Route path="/add" element={<AddFlashcard token={token} darkMode={darkMode} />} />
              <Route path="*" element={<ReviewFlashcards token={token} darkMode={darkMode} />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login setToken={setToken} />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
