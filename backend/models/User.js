const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Basic User Details
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ign: { // In-Game Name (Free Fire ID)
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    // Tournaments Linking Section 
    joinedTournaments: [
        {
            tournamentId: {
                type: String, // String testing aur compatibility dono ke liye sahi hai
                ref: 'Tournament', 
                required: true
            },
            // 🔥 YEH NAYA FIELD HAI: Confusion door karne ke liye direct title save hoga
            tournamentTitle: {
                type: String,
                required: true
            },
            squadName: {
                type: String,
                required: true
            },
            paymentId: { 
                type: String,
                required: true
            },
            status: {
                type: String,
                // Screenshot ke 'APPROVED' aur 'Approved' dono cases ko handle karne ke liye enum update kiya
                enum: ['Pending', 'Confirmed', 'Rejected', 'Approved', 'APPROVED'],
                default: 'Pending'
            },
            joinedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;