const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const authMiddleware = require('../middleware/auth');

// All flashcard routes require authentication
router.use(authMiddleware);

// Utility function: calculates next review date based on the Leitner box
function getNextReviewDate(box) {
    const now = new Date();
    // Define review intervals (in days) for each box level
    const intervals = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
    now.setDate(now.getDate() + (intervals[box] || 1));
    return now;
}

// POST /flashcards → Create a new flashcard (for the authenticated user)
router.post('/', async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ error: 'Both question and answer are required.' });
        }
        // Create a new flashcard with the user ID from the token
        const newFlashcard = new Flashcard({ question, answer, user: req.user.id });
        const savedFlashcard = await newFlashcard.save();
        res.status(201).json(savedFlashcard);
    } catch (err) {
        console.error('Error in POST /flashcards:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET /flashcards → Get all flashcards for the authenticated user
router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find({ user: req.user.id });
        res.json(flashcards);
    } catch (err) {
        console.error('Error in GET /flashcards:', err);
        res.status(500).json({ error: err.message });
    }
});

// PUT /flashcards/:id → Update a flashcard (move to next box if answered correctly)
// Only update if the flashcard belongs to the logged-in user
router.put('/:id', async (req, res) => {
    try {
        const { correct } = req.body;
        const flashcard = await Flashcard.findOne({ _id: req.params.id, user: req.user.id });
        if (!flashcard) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        flashcard.box = correct ? flashcard.box + 1 : 1;
        flashcard.nextReview = getNextReviewDate(flashcard.box);
        const updatedFlashcard = await flashcard.save();
        res.json(updatedFlashcard);
    } catch (err) {
        console.error('Error in PUT /flashcards/:id:', err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE /flashcards/:id → Delete a flashcard
// Only delete if the flashcard belongs to the logged-in user
router.delete('/:id', async (req, res) => {
    try {
        const deletedFlashcard = await Flashcard.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deletedFlashcard) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        res.json({ message: 'Flashcard deleted' });
    } catch (err) {
        console.error('Error in DELETE /flashcards/:id:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
