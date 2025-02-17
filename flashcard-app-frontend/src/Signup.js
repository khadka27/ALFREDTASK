// src/Signup.js
import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const backendUrl = process.env.BACKEND_URL;

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post(`${backendUrl}/auth/register`, { username, password });
            setSuccess('Account created! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Username already taken.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg border-light" style={{ width: '350px', backgroundColor: '#F9FAFB' }}>
                <div className="text-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg"
                        alt="profile"
                        className="rounded-circle mb-3"
                        style={{ width: '80px', height: '80px' }}
                    />
                </div>
                <h4 className="text-center text-dark mb-3">Create Account</h4>
                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}
                <Form onSubmit={handleSignup}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100" style={{ backgroundColor: '#1F2937', border: 'none' }}>
                        Sign Up
                    </Button>
                </Form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login" className="fw-bold">Login</Link>
                </p>
            </Card>
        </Container>
    );
};

export default Signup;
