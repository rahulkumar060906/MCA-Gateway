// POST /api/auth/reset-password
router.post('/reset-password', [
    body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }
        // Here you would send a real email with a reset link/token
        // For demo, just return success
        return res.json({ success: true, message: 'Password reset link sent to your email (demo only)' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
require('dotenv').config();

// POST /api/auth/signup
router.post('/signup', [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('userName').notEmpty().withMessage('Username is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, userName, phone, email, password } = req.body;
    try {
        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ userName }, { email }, { phone }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username, email, or phone already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, userName, phone, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Duplicate field value' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/auth/login
router.post('/login', [
    body('identifier').notEmpty().withMessage('Identifier is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { identifier, password } = req.body;
    try {
        // Find user by email, username, or phone
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { userName: identifier },
                { phone: identifier }
            ]
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token, user: { fullName: user.fullName, userName: user.userName, email: user.email, phone: user.phone } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
