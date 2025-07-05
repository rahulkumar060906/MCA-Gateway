const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Middleware to authenticate JWT
function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Get user progress
router.get('/progress', auth, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
        testHistory: user.testHistory,
        recentLevel: user.recentLevel,
        recentVideo: user.recentVideo
    });
});

// Add a test attempt
router.post('/test-history', auth, [
    body('testId').notEmpty(),
    body('sectionScores').isObject(),
    body('totalScore').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.testHistory.push({
        testId: req.body.testId,
        sectionScores: req.body.sectionScores,
        totalScore: req.body.totalScore
    });
    await user.save();
    res.json({ success: true });
});

// Update recent level
router.post('/recent-level', auth, [body('recentLevel').notEmpty()], async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.recentLevel = req.body.recentLevel;
    await user.save();
    res.json({ success: true });
});

// Update recent video
router.post('/recent-video', auth, [body('recentVideo').notEmpty()], async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.recentVideo = req.body.recentVideo;
    await user.save();
    res.json({ success: true });
});

module.exports = router;
