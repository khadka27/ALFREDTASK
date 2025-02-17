# FlashLearn - Flashcard Learning App with Leitner System

FlashLearn is a web application that leverages the power of the Leitner System—a spaced repetition technique—to help users learn and retain information more effectively using flashcards. Built with the MERN stack, this app allows users to create, review, and manage flashcards, with features such as user authentication, dark mode, and smooth animations.

## Features

- **Leitner System**:
  - Flashcards start in Box 1.
  - Correct answers move a flashcard to the next box (with longer review intervals).
  - Incorrect answers reset the flashcard back to Box 1.
- **CRUD API**:
  - **POST /flashcards**: Add a new flashcard.
  - **GET /flashcards**: Retrieve all flashcards due for review.
  - **PUT /flashcards/:id**: Update a flashcard’s level based on user response.
  - **DELETE /flashcards/:id**: Delete a flashcard.
- **User Authentication**:
  - Secure signup and login using JWT and bcrypt.
- **Responsive UI**:
  - Built with React, React Bootstrap, and Framer Motion for smooth transitions.
  - Mobile-friendly and includes a dark mode toggle.
- **Theming**:
  - **Light Mode (Soft & Neutral)**:
    - Primary: `#3B82F6`
    - Secondary: `#10B981`
    - Background: `#F9FAFB`
    - Text: `#1F2937`
    - Card Background: `#FFFFFF`
    - Border: `#E5E7EB`
  - **Dark Mode (Calm & Focused)**:
    - Primary: `#60A5FA`
    - Secondary: `#34D399`
    - Background: `#111827`
    - Text: `#F3F4F6`
    - Card Background: `#1E293B`
    - Border: `#374151`

## Tech Stack

- **Frontend**:
  - React, React Router, Axios, React Bootstrap, Framer Motion
- **Backend**:
  - Node.js, Express, MongoDB, Mongoose
- **Authentication**:
  - JSON Web Tokens (JWT) and bcrypt

## Project Structure

```
flashlearn/
├── flashcard-app-backend/
│   ├── models/
│   │   ├── Flashcard.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── flashcards.js
│   ├── server.js
│   └── .env
└── flashcard-app-frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── Navbar.js
    │   ├── Login.js
    │   ├── Signup.js
    │   ├── ReviewFlashcards.js
    │   ├── AddFlashcard.js
    │   └── (other components)
    ├── package.json
    └── ...
```

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/flashlearn.git
   cd flashlearn/flashcard-app-backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the backend directory with:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server:**

   ```bash
   node server.js
   ```

   The backend server will run on port `5000`.

### Frontend Setup

1. **Navigate to the Frontend Folder:**

   ```bash
   cd flashlearn/flashcard-app-frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the React App:**

   ```bash
   npm start
   ```

   The frontend will run on [http://localhost:3000](http://localhost:3000).

## Usage

- **User Authentication:**
  - Navigate to the Login or Signup page to create an account or log in.
  - Upon successful login, a JWT is stored in `localStorage` and used to authenticate subsequent API requests.
- **Review Flashcards:**
  - Once logged in, navigate to the "Review" section to see flashcards due for review.
  - Use the "Show Answer" button to reveal the answer.
  - Mark the flashcard as "Got it right" or "Got it wrong" to update its position in the Leitner system.
- **Add Flashcards:**
  - Use the "Add" section to create new flashcards.
- **Dark Mode:**
  - Toggle between light and dark themes using the switch in the Navbar.

## Deployment

- **Backend:**  
  Deploy to platforms like Heroku, Render, or any Node.js hosting service.
- **Frontend:**  
  Deploy to services like Vercel, Netlify, or similar platforms.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Special thanks to the developers of the MERN stack and all open-source contributors.
- Inspired by spaced repetition and the Leitner System for effective learning.

---

This README file provides a comprehensive overview of the project, installation instructions, usage details, and other important information that can help evaluators and users understand and run your FlashLearn project.
