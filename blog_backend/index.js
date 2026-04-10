import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4444;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://blog-4wsh.onrender.com'],
  credentials: true,
}));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Database connection
if (!process.env.DB_URL) {
  console.error('❌ DB_URL is missing in environment variables!');
}

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((error) => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error details:', error.message);
  });

// Routes
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Blog API is running' }));
app.use('/auth', authRoutes);
app.use('/', postRoutes);
app.use('/messages', messageRoutes);
app.use('/', uploadRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, (error) => {
  if (error) {
    return console.error('Failed to start server:', error);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});