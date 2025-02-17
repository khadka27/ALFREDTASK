// models/Flashcard.js
const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // 'box' represents the Leitner box number (starting at 1)
    box: { type: Number, default: 1 },
    // nextReview stores the date when the card is due for review
    nextReview: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
