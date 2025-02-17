// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcards');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/flashcards', flashcardRoutes);

// Connect to MongoDB (replace <your_mongo_uri> with your actual MongoDB connection string)
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((err) => console.error(err));
