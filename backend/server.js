require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); 

// 🔥 DYNAMIC CORS JUGAD: Saare Vercel aur Localhost domains ko handle karega bina crash huye
const allowedOrigins = [
  "https://collage-project-delta.vercel.app", // Tumhara purana domain
  "https://supers-esports-delta.vercel.app",  // Tumhara naya domain
  "http://localhost:3000",                     // Local React development
  "http://localhost:5173"                      // Local Vite development (agar use kar rahe ho)
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar request bina origin ke ho (jaise Postman/Mobile app) ya allowedOrigins list mein ho
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy of Supers Esports!'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
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