// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcards');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Auth Routes
app.use('/auth', authRoutes);

// Flashcard Routes
app.use('/flashcards', flashcardRoutes);

// Connect to MongoDB (replace <your_mongo_uri> with your actual MongoDB connection string)
// mongoose
//     .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB connected');
//         app.listen(5000, () => console.log('Server running on port 5000'));
//     })
//     .catch((err) => console.error(err));


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');

        // Check if the "flashcards" collection exists, if not, create it
        mongoose.connection.db.listCollections({ name: 'flashcards' })
            .next((err, collinfo) => {
                if (err) {
                    console.error('Error listing collections:', err);
                } else if (!collinfo) {
                    mongoose.connection.createCollection('flashcards', (err, collection) => {
                        if (err) {
                            console.error('Error creating collection:', err);
                        } else {
                            console.log('Collection "flashcards" created');
                        }
                    });
                } else {
                    console.log('Collection "flashcards" already exists');
                }
            });

        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((err) => console.error(err));

