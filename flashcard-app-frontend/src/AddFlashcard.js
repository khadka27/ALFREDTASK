import React, { useState } from 'react';
import axios from 'axios';

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

        console.log("Token being sent:", token); // Debug log

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/flashcards`,
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
            <div className={`card shadow-lg border ${darkMode ? 'bg-dark text-light border-secondary' : 'bg-white border-light'}`}>
                {/* Card Header */}
                <div
                    className="card-header text-center"
                    style={{
                        backgroundColor: darkMode ? '#1E293B' : '#3B82F6',
                        color: darkMode ? '#F3F4F6' : '#FFFFFF',
                    }}
                >
                    <h2 className="m-0">Add New Flashcard</h2>
                </div>

                {/* Card Body */}
                <div className="card-body">
                    {/* Alerts for errors/success messages */}
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {success && <div className="alert alert-success text-center">{success}</div>}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Question:</label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : 'border-light'}`}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Answer:</label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : 'border-light'}`}
                                rows="3"
                                required
                            />
                        </div>

                        {/* Submit Button */}
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
