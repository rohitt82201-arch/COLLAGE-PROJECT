const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// --- TOURNAMENT SCHEMA REGISTRATION FIX ---
let Tournament;
if (mongoose.models.Tournament) {
    Tournament = mongoose.model('Tournament');
} else {
    const tournamentSchema = new mongoose.Schema({
        title: String,
        totalSlots: Number,
        joinedUsers: Array,
        startTime: { type: Date },
        roomId: { type: String, default: "" },
        roomPassword: { type: String, default: "" }
    });
    Tournament = mongoose.model('Tournament', tournamentSchema);
}

// 🌐 1. Fetch ALL Tournaments For Frontend Card Shuffling
// @route   GET /api/tournaments
// @desc    Get all tournaments from database
router.get('/', async (req, res) => {
    try {
        // Database se saare tournaments uthao
        const allTournaments = await Tournament.find({}).lean();
        res.status(200).json(allTournaments);
    } catch (error) {
        console.error("Error fetching all tournaments:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @route   POST /api/tournaments/join
// @desc    Join a specific tournament and save info inside user data
router.post('/join', protect, async (req, res) => {
    try {
        const { tournamentId, utr, squadName } = req.body;
        const userId = req.user.id;

        // 1. Validation: Pehle check karo user pehle se registered toh nahi hai
        const userCheck = await User.findOne({ 
            _id: userId, 
            "joinedTournaments.tournamentId": tournamentId 
        });

        if (userCheck) {
            return res.status(400).json({ message: "Bhai, aapne is tournament mein pehle hi register kar liya hai!" });
        }

        const isValidId = mongoose.Types.ObjectId.isValid(tournamentId);
        if (!isValidId) {
            return res.status(400).json({ message: "Bhai, tournament ki ID sahi nahi hai!" });
        }

        // 2. Tournament dhoondo taaki uska Title aur Slots verify kar sakein
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: "Bhai, yeh tournament database mein nahi mila!" });
        }

        // 3. Slots Validation
        const currentJoined = tournament.joinedUsers ? tournament.joinedUsers.length : 0;
        if (currentJoined >= tournament.totalSlots) {
            return res.status(400).json({ message: "Bhai, is tournament ke saare slots full ho chuke hain!" });
        }

        // 4. Tournament mein user ID push karo live slots update ke liye
        await Tournament.findByIdAndUpdate(tournamentId, {
            $addToSet: { joinedUsers: userId }
        });

        // 🔥 5. User collection mein tournamentId ke SATH tournamentTitle bhi save karo
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    joinedTournaments: {
                        tournamentId: tournamentId,
                        tournamentTitle: tournament.title || "Free Fire Tournament", // <-- Yeh line direct database mein Title degi
                        squadName: squadName,
                        paymentId: utr,
                        status: 'Pending',
                        joinedAt: new Date()
                    }
                }
            },
            { new: true, runValidators: false }
        );

        res.status(200).json({ message: "Registration successful! Slots updated live." });
    } catch (error) {
        console.error("Join Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /api/tournaments/my-matches
router.get('/my-matches', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('joinedTournaments').lean();
        
        if (!user || !user.joinedTournaments) {
            return res.status(404).json({ message: "User not found" });
        }

        const populatedTournaments = await Promise.all(user.joinedTournaments.map(async (item) => {
            const isValidId = mongoose.Types.ObjectId.isValid(item.tournamentId);
            
            let tournamentDetails = null;
            if (isValidId) {
                tournamentDetails = await Tournament.findById(item.tournamentId).lean();
            }

            return {
                tournamentId: item.tournamentId,
                tournamentTitle: item.tournamentTitle || (tournamentDetails ? tournamentDetails.title : "Free Fire Tournament"), // Safe backup fallback
                squadName: item.squadName,
                paymentId: item.paymentId,
                status: item.status || 'Pending',
                joinedAt: item.joinedAt,
                tournamentInfo: tournamentDetails || { 
                    title: item.tournamentTitle || "Free Fire Tournament",
                    roomId: "",
                    roomPassword: ""
                }
            };
        }));

        res.json(populatedTournaments);
    } catch (error) {
        console.error("Backend Error in my-matches:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;