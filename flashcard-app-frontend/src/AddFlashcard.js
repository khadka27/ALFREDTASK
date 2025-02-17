import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const AddFlashcard = ({ onFlashcardAdded, darkMode, token }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Include the token in the Authorization header
            const res = await axios.post(
                'http://localhost:5000/flashcards',
                { question, answer },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setQuestion('');
            setAnswer('');
            if (onFlashcardAdded) onFlashcardAdded(res.data);
            setSuccess('Flashcard added successfully!');
        } catch (err) {
            console.error(err);
            setError('Error adding flashcard.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container mt-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
            <div
                className={`card shadow-lg border ${darkMode ? 'bg-dark text-light border-secondary' : 'bg-white border-light'
                    }`}
            >
                <div
                    className="card-header"
                    style={{
                        backgroundColor: darkMode ? '#1E293B' : '#3B82F6',
                        color: darkMode ? '#F3F4F6' : '#FFFFFF',
                    }}
                >
                    <h2 className="text-center m-0">Add New Flashcard</h2>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Question:</label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : 'border-light'
                                    }`}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Answer:</label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : 'border-light'
                                    }`}
                                rows="3"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Flashcard'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFlashcard;
