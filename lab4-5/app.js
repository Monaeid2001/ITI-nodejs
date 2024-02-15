const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo_app');
const db = mongoose.connection;

// Routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
