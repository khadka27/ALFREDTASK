// src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/register', { username, password });
            alert('User registered successfully!');
            navigate('/login'); // After signup, redirect to login page
        } catch (err) {
            console.error(err);
            alert('Signup failed: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block mb-1">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
