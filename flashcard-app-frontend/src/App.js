// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReviewFlashcards from './ReviewFlashcards'; // Create a separate component for reviewing
import AddFlashcard from './AddFlashcard';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link to="/review" className="mr-4">Review</Link>
          <Link to="/add">Add Flashcard</Link>
        </nav>
        <Routes>
          <Route path="/review" element={<ReviewFlashcards />} />
          <Route path="/add" element={<AddFlashcard />} />
          <Route path="*" element={<ReviewFlashcards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
