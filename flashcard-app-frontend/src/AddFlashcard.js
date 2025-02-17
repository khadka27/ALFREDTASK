// src/AddFlashcard.js
import React, { useState } from 'react';
import axios from 'axios';

const AddFlashcard = ({ onFlashcardAdded }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/flashcards', { question, answer });
            // Clear form inputs after successful creation
            setQuestion('');
            setAnswer('');
            // Optionally, trigger a callback to update the flashcards list
            if (onFlashcardAdded) {
                onFlashcardAdded(res.data);
            }
            alert('Flashcard added successfully!');
        } catch (err) {
            console.error(err);
            alert('Error adding flashcard.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Add New Flashcard</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Answer:</label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Add Flashcard
                </button>
            </form>
        </div>
    );
};

export default AddFlashcard;
