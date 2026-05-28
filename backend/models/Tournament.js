const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// @route   POST /api/tournaments/join
// @desc    Join a tournament (Bypasses restriction for dummy IDs)
router.post('/join', protect, async (req, res) => {
    try {
        const { tournamentId, utr, squadName } = req.body;
        const userId = req.user.id;

        // 1. DUMMY ID VALIDATION BYPASS
        // Testing ko smooth rakhne ke liye ab Validation restriction block nahi karega
        /*
        if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
            return res.status(400).json({ 
                message: "Invalid Tournament ID! Please click 'Join' from a valid tournament card." 
            });
        }
        */

        // 2. CHECK IF ALREADY JOINED
        const userCheck = await User.findOne({ 
            _id: userId, 
            "joinedTournaments.tournamentId": tournamentId 
        });

        if (userCheck) {
            return res.status(400).json({ message: "Bhai, aapne is tournament mein pehle hi register kar liya hai!" });
        }

        // 3. ATOMIC UPDATE
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    joinedTournaments: {
                        tournamentId: tournamentId, // Can be dummy string or real ObjectId string
                        squadName: squadName,
                        paymentId: utr,
                        status: 'Pending'
                    }
                }
            },
            { 
                new: true, 
                runValidators: false 
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User account nahi mila!" });
        }

        console.log(`Success: ${squadName} joined tournament ${tournamentId}`);
        res.status(200).json({ message: "Registration successful! Admin verify karega." });

    } catch (error) {
        console.error("BACKEND ERROR:", error.message);
        res.status(500).json({ message: "Server error occurred", detail: error.message });
    }
});


// models/Tournament.js
const tournamentSchema = new mongoose.Schema({
  title: String,
  totalSlots: Number,
  joinedUsers: Array,
  // YE TEEN FIELDS HONI CHAHIYE:
  startTime: { type: Date },
  roomId: { type: String, default: "" },
  roomPassword: { type: String, default: "" }
});
// @route   GET /api/tournaments/my-matches
// @desc    Fetch joined tournaments with details (Safe for Dummy Data)
router.get('/my-matches', protect, async (req, res) => {
    try {
        // Agar database mein real dynamic entries na ho, toh crash hone se bachane ke liye safe search chalegi
        const user = await User.findById(req.user.id).populate({
            path: 'joinedTournaments.tournamentId',
            strictPopulate: false // Yeh lagane se dummy ID error nahi degi
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.joinedTournaments);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Matches fetch karne mein error aayi" });
    }
});

module.exports = router;