// routes/flashcards.js
const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');

// Utility function to calculate next review date based on the box level
function getNextReviewDate(box) {
  const now = new Date();
  // Define intervals (in days) for each box (customize as needed)
  const intervals = {
    1: 1,   // Box 1: review in 1 day
    2: 2,   // Box 2: review in 2 days
    3: 4,   // Box 3: review in 4 days
    4: 8,   // Box 4: review in 8 days
    5: 16,  // Box 5: review in 16 days
  };
  const days = intervals[box] || 1;
  now.setDate(now.getDate() + days);
  return now;
}

// POST /flashcards → Add a new flashcard
router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = new Flashcard({ question, answer });
    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /flashcards → Get all flashcards (optionally filter by due date)
router.get('/', async (req, res) => {
  try {
    // Optionally, filter to return only flashcards due for review:
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /flashcards/:id → Update a flashcard based on user answer
// Expecting a payload: { correct: true/false }
router.put('/:id', async (req, res) => {
  try {
    const { correct } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    // Update Leitner box level
    if (correct) {
      flashcard.box = flashcard.box + 1;
    } else {
      flashcard.box = 1; // Reset on failure
    }
    // Set the next review date based on the new box level
    flashcard.nextReview = getNextReviewDate(flashcard.box);

    const updatedFlashcard = await flashcard.save();
    res.json(updatedFlashcard);
  } catch (err) {
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
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
