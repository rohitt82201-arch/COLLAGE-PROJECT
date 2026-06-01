require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); 

// 🔥 STABLE & SAFE CORS CONFIGURATION (No Crash Guaranteed)
app.use(cors({
  origin: "https://collage-project-delta.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Routes Import
const tournamentRoutes = require('./routes/tournamentRoutes');
const authRoutes = require('./routes/authRoutes');

// Routes Usage
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes); 

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/supersEsports';

mongoose.connect(MONGO_URI)
  .then(() => console.log("DB Connected Successfully!"))
  .catch(err => console.error("DB Connection Error:", err));

// Base route for testing
app.get('/', (req, res) => {
  res.send("Supers Esports Backend is Running Live!");
});

// Dynamic Port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));