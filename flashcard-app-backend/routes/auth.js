const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';
// Ideally, set this in your .env

// POST /auth/register → Register a new user
router.post('/register', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user instance (password will be hashed in the User model pre-save hook)
        const user = new User({ username, password });

        // Save the user to the database
        await user.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error in /auth/register:', err);
        res.status(500).json({ error: err.message });
    }
});

// POST /auth/login → Log in an existing user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate a token valid for 1 day
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        console.error('Error in /auth/login:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
