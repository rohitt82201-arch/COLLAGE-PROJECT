const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // 1. Sabse pehle app banna chahiye
app.use(cors({
  origin: "https://collage-project-delta.vercel.app", // 👈 Tumhara Vercel Live Link
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 2. Middlewares (Inka order yahi rakhna)
app.use(express.json());

// 3. Routes Import
const tournamentRoutes = require('./routes/tournamentRoutes');
const authRoutes = require('./routes/authRoutes');

// 4. Routes Usage
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes); // Saare tournament related routes ab yahan se chalenge

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/supersEsports')
  .then(() => console.log("DB Connected!"))
  .catch(err => console.error("DB Connection Error:", err));

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));