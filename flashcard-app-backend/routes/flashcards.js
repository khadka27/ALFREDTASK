const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');

// Utility function: calculates next review date based on the Leitner box
function getNextReviewDate(box) {
    const now = new Date();
    const intervals = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
    now.setDate(now.getDate() + (intervals[box] || 1));
    return now;
}

// POST /flashcards → Create a new flashcard
router.post('/', async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { question, answer } = req.body;
        if (!question || !answer) {
            throw new Error("Both question and answer are required.");
        }
        const newFlashcard = new Flashcard({ question, answer });
        const savedFlashcard = await newFlashcard.save();
        res.status(201).json(savedFlashcard);
    } catch (err) {
        console.error("Error in POST /flashcards:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET /flashcards → Get all flashcards
router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.json(flashcards);
    } catch (err) {
        console.error("Error in GET /flashcards:", err);
        res.status(500).json({ error: err.message });
    }
});

// PUT /flashcards/:id → Update flashcard based on answer correctness
router.put('/:id', async (req, res) => {
    try {
        const { correct } = req.body;
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        flashcard.box = correct ? flashcard.box + 1 : 1;
        flashcard.nextReview = getNextReviewDate(flashcard.box);
        const updatedFlashcard = await flashcard.save();
        res.json(updatedFlashcard);
    } catch (err) {
        console.error("Error in PUT /flashcards/:id:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE /flashcards/:id → Delete a flashcard
router.delete('/:id', async (req, res) => {
    try {
        const deletedFlashcard = await Flashcard.findByIdAndDelete(req.params.id);
        if (!deletedFlashcard) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        res.json({ message: 'Flashcard deleted' });
    } catch (err) {
        console.error("Error in DELETE /flashcards/:id:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
