const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- AUTH MIDDLEWARE (Isse bina login wala user /me nahi dekh payega) ---
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Ensure this matches login
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// 1. SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone, ign } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            phone, 
            ign 
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. PROFILE ROUTE (Isse hi Profile Page par data dikhega)
router.get('/me', protect, async (req, res) => {
    try {
        // .populate('joinedTournaments') se tournaments ki details milengi
        const user = await User.findById(req.user.id).populate('joinedTournaments');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 3. LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });
        
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                ign: user.ign,
                email: user.email,
                phone: user.phone
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;