// src/ReviewFlashcards.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewFlashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const res = await axios.get('http://localhost:5000/flashcards');
            // Only include cards due for review (nextReview date <= now)
            const dueFlashcards = res.data.filter(card => new Date(card.nextReview) <= new Date());
            setFlashcards(dueFlashcards);
            setCurrentIndex(0);
            setShowAnswer(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAnswer = async (correct) => {
        const card = flashcards[currentIndex];
        try {
            await axios.put(`http://localhost:5000/flashcards/${card._id}`, { correct });
            // Refresh flashcards list after updating the card
            await fetchFlashcards();
            setShowAnswer(false);
            setCurrentIndex(prevIndex => prevIndex + 1);
        } catch (error) {
            console.error(error);
        }
    };

    if (flashcards.length === 0 || currentIndex >= flashcards.length) {
        return <div className="text-center mt-10">No flashcards due for review!</div>;
    }

    const currentCard = flashcards[currentIndex];

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Review Flashcards</h1>
            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-xl font-semibold mb-2">{currentCard.question}</h2>
                {showAnswer ? (
                    <>
                        <p className="mb-4">{currentCard.answer}</p>
                        <div className="flex justify-around">
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
            <div className="text-center mt-4">
                {flashcards.length - currentIndex - 1} flashcard(s) left for review.
            </div>
        </div>
    );
};

export default ReviewFlashcards;
