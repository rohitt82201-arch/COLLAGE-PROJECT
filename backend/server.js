require('dotenv').config(); // Dotenv ko sabse upar load karo taaki credentials mil sakein
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); 

// 🔥 ULTIMATE CORS CONFIGURATION (Live Signup/Login Fix)
app.use(cors({
  origin: "https://collage-project-delta.vercel.app", // Tumhara Vercel Live Link
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Pre-flight (OPTIONS) requests ko global handle karo
app.options('*', cors());

// Middlewares
app.use(express.json());

// Routes Import
const tournamentRoutes = require('./routes/tournamentRoutes');
const authRoutes = require('./routes/authRoutes');

// Routes Usage
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes); 

// 🔥 DYNAMIC DATABASE CONNECTION (Local backend par local chalega, Cloud par Atlas)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/supersEsports';

mongoose.connect(MONGO_URI)
  .then(() => console.log("DB Connected Successfully!"))
  .catch(err => console.error("DB Connection Error:", err));

// Base route test karne ke liye (Browser me check karne ke kaam aega)
app.get('/', (req, res) => {
  res.send("Supers Esports Backend is Running Live!");
});

// 🔥 DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));