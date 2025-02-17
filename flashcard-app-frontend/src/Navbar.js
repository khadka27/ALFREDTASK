import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";

function AppNavbar({ token, handleLogout, darkMode, setDarkMode }) {
    return (
        <Navbar expand="lg" className={darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}>
            <Container>
                <Navbar.Brand as={Link} to={token ? "/review" : "/login"} className="fw-bold">
                    📚 FlashLearn
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {token ? (
                            <>
                                <Nav.Link as={Link} to="/review">Review</Nav.Link>
                                <Nav.Link as={Link} to="/add">Add</Nav.Link>
                                <Button variant="outline-danger" onClick={handleLogout} className="ms-3">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Form className="d-flex align-items-center ms-3">
                        <span className="me-2">{darkMode ? "🌙" : "☀️"}</span>
                        <Form.Check
                            type="switch"
                            id="darkModeSwitch"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;
