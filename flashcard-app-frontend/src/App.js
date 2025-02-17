// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Fetch flashcards from the backend when component mounts
  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get('http://localhost:5000/flashcards');
      // Filter flashcards that are due for review (nextReview date <= today)
      const dueFlashcards = res.data.filter(card => new Date(card.nextReview) <= new Date());
      setFlashcards(dueFlashcards);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswer = async (correct) => {
    const card = flashcards[currentIndex];
    try {
      await axios.put(`http://localhost:5000/flashcards/${card._id}`, { correct });
      // Refresh the flashcards list to reflect updated review dates
      await fetchFlashcards();
      setShowAnswer(false);
      // Move to next flashcard if available
      setCurrentIndex(prevIndex => prevIndex + 1);
    } catch (err) {
      console.error(err);
    }
  };

  if (flashcards.length === 0) {
    return <div className="container mx-auto text-center mt-10">No flashcards due for review!</div>;
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Flashcard Review</h1>
      <div className="bg-white shadow-md rounded p-6 mb-4">
        <h3 className="text-xl mb-2">{currentCard.question}</h3>
        {showAnswer ? (
          <>
            <p className="mb-4">{currentCard.answer}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleAnswer(true)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Got it right
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Got it wrong
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Show Answer
          </button>
        )}
      </div>
      <div className="text-center">
        {flashcards.length - currentIndex - 1} flashcard(s) left
      </div>
    </div>
  );
}

export default App;
