// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReviewFlashcards from './ReviewFlashcards';
import AddFlashcard from './AddFlashcard';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          {token ? (
            <>
              <Link to="/review" className="mr-4">Review</Link>
              <Link to="/add" className="mr-4">Add Flashcard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
        <Routes>
          {token ? (
            <>
              <Route path="/review" element={<ReviewFlashcards token={token} />} />
              <Route path="/add" element={<AddFlashcard token={token} />} />
              <Route path="*" element={<ReviewFlashcards token={token} />} />
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
