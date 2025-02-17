// src/Login.js
import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate('/review'); // Redirect after login
        } catch (err) {
            setError('Invalid username or password.');
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
                <h4 className="text-center text-dark mb-3">Login</h4>
                {error && <p className="text-danger text-center">{error}</p>}
                <Form onSubmit={handleLogin}>
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
                        Login
                    </Button>
                </Form>
                <p className="text-center mt-3">
                    Not Registered? <Link to="/signup" className="fw-bold">Create an Account</Link>
                </p>
            </Card>
        </Container>
    );
};

export default Login;
