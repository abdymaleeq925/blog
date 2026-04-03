# Modern Blog Platform 🌟

A modern full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). This project features a robust authentication system, nested comments, post interactions, and a polished responsive design.

---

## Core Features ✨

### 🔐 Authentication & Profile
- **Secure Auth**: JWT-based registration and login system.
- **Protected Routes**: Only authorized users can create, edit, or delete content.
- **Avatar Support**: Users can upload and manage their profile pictures.

### 📝 Content Management (CRUD)
- **Rich Text Editor**: Create and edit posts using a Markdown-supported editor (SimpleMDE).
- **Categories**: Organize your posts into themes (Quantum, Environment, etc.).
- **Image Uploads**: Integrated support for post cover images using Multer.

### 💬 Social Interactions
- **Advanced Commenting**: Full-featured system for sharing thoughts.
- **Nested Replies**: Infinite-depth tree structure for organized discussions.
- **Likes & Shares**: Appreciation system for both posts and comments.
- **View Counting**: Track post popularity automatically.

### 🎨 UI/UX Excellence
- **Responsive Layout**: Seamless experience across mobile, tablet, and desktop.
- **Modern Performance**: Optimized with Redux Toolkit for efficient state management.
- **Clean Aesthetics**: Minimalist and intuitive interface with SCSS styling.

---

## Technical Stack 🛠️

- **Frontend**: React 18, Redux Toolkit, React Router 6, SCSS, Axios.
- **Backend**: Node.js, Express, Multer, JWT, express-validator.
- **Database**: MongoDB (Mongoose ODM).
- **Date Handling**: Optimized with `dayjs`.
- **Styling**: SCSS with modern CSS variables.

---

## Quick Start 🚀

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (Local or Atlas)

### 2. Backend Setup
```bash
cd blog_backend
npm install
# Configure your .env file
cp .env.blog .env 
npm start
```

### 3. Frontend Setup
```bash
cd blog_frontend
npm install
npm start
```

The application will be running at `http://localhost:3000`.

---

## Optimization Notes ⚡

This project has been recently optimized for performance and cleanliness:
- **Dependency Audit**: Removed redundant packages like `express` from frontend and consolidated date libraries to `dayjs`.
- **Project Hygiene**: Cleaned up system files (`.DS_Store`) and IDE configurations.
- **Code Quality**: Refactored controllers and components for better consistency and readability.
