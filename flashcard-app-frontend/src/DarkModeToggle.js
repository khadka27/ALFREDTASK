// src/DarkModeToggle.js
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition-colors duration-300"
        >
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
        </button>
    );
};

export default DarkModeToggle;
