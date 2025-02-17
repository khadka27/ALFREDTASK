const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // 'box' represents the Leitner box number (starting at 1)
    box: { type: Number, default: 1 },
    // nextReview stores the date when the card is due for review
    nextReview: { type: Date, default: Date.now },
    // Associate this flashcard with a user
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
