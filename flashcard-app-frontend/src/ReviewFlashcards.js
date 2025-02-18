import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner, Card, Button, Alert, Container } from 'react-bootstrap';

const ReviewFlashcards = ({ token, darkMode }) => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const backend = process.env.REACT_APP_BACKEND_URL;

    const fetchFlashcards = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`${backend}/flashcards`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Filter flashcards due for review (nextReview date <= now)
            const dueFlashcards = res.data.filter(card => new Date(card.nextReview) <= new Date());
            setFlashcards(dueFlashcards);
            setCurrentIndex(0);
            setShowAnswer(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch flashcards.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchFlashcards();
    }, [fetchFlashcards]);

    const handleAnswer = async (correct) => {
        setLoading(true);
        setError('');
        try {
            const card = flashcards[currentIndex];
            await axios.put(
                `${backend}/flashcards/${card._id}`,
                { correct },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // Re-fetch flashcards; resets currentIndex to 0
            await fetchFlashcards();
        } catch (err) {
            console.error(err);
            setError('Failed to update flashcard.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100" style={{
                backgroundColor: darkMode ? '#111827' : '#F9FAFB'
            }}>
                <Spinner animation="border" variant={darkMode ? "light" : "primary"} />
            </Container>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center mt-4">{error}</Alert>;
    }

    if (flashcards.length === 0 || currentIndex >= flashcards.length) {
        return <Alert variant="info" className="text-center mt-5">No flashcards due for review!</Alert>;
    }

    const currentCard = flashcards[currentIndex];

    return (
        <Container className="mt-4" style={{
            backgroundColor: darkMode ? '#111827' : '#F9FAFB',
            minHeight: '100vh',
            color: darkMode ? '#F3F4F6' : '#1F2937'
        }}>
            <h1 className="text-center mb-4">📚 Review Flashcards</h1>
            <AnimatePresence>
                <motion.div
                    key={currentCard._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="d-flex justify-content-center"
                >
                    <Card className="shadow-lg text-center p-4" style={{
                        maxWidth: '500px',
                        width: '100%',
                        backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
                        border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                        color: darkMode ? '#F3F4F6' : '#1F2937'
                    }}>
                        <Card.Body>
                            <Card.Title className="fw-bold">{currentCard.question}</Card.Title>
                            {showAnswer ? (
                                <>
                                    <Card.Text className="mt-3">{currentCard.answer}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            onClick={() => handleAnswer(true)}
                                            style={{
                                                backgroundColor: darkMode ? '#34D399' : '#10B981',
                                                border: 'none'
                                            }}
                                        >
                                            ✅ Got it right
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleAnswer(false)}
                                        >
                                            ❌ Got it wrong
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setShowAnswer(true)}
                                    style={{
                                        backgroundColor: darkMode ? '#60A5FA' : '#3B82F6',
                                        border: 'none'
                                    }}
                                >
                                    Show Answer
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </motion.div>
            </AnimatePresence>
            <p className="text-center mt-3">
                {flashcards.length - currentIndex - 1} flashcard(s) left for review.
            </p>
        </Container>
    );
};

export default ReviewFlashcards;
