const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Helper: get time window
function getWindowStart(period) {
    const now = new Date();
    if (period === 'daily') {
        now.setHours(0, 0, 0, 0);
        return now;
    } else if (period === 'weekly') {
        const day = now.getDay();
        now.setDate(now.getDate() - day);
        now.setHours(0, 0, 0, 0);
        return now;
    } else if (period === 'monthly') {
        now.setDate(1);
        now.setHours(0, 0, 0, 0);
        return now;
    }
    return null;
}

// Leaderboard: overall top scorers (optionally by period)
router.get('/leaderboard', async (req, res) => {
    const { period = 'all' } = req.query;
    let match = {};
    if (period !== 'all') {
        match['testHistory.attemptedAt'] = { $gte: getWindowStart(period) };
    }
    const users = await User.aggregate([
        { $unwind: '$testHistory' },
        ...(period !== 'all' ? [{ $match: match }] : []),
        {
            $group: {
                _id: '$_id',
                userName: { $first: '$userName' },
                fullName: { $first: '$fullName' },
                totalScore: { $sum: '$testHistory.totalScore' },
            }
        },
        { $sort: { totalScore: -1 } },
        { $limit: 20 }
    ]);
    res.json(users);
});

// Leaderboard: top scorers per subject/section
router.get('/leaderboard/subject', async (req, res) => {
    const { subject, period = 'all' } = req.query;
    if (!subject) return res.status(400).json({ message: 'Subject required' });
    let match = { [`testHistory.sectionScores.${subject}`]: { $exists: true } };
    if (period !== 'all') {
        match['testHistory.attemptedAt'] = { $gte: getWindowStart(period) };
    }
    const users = await User.aggregate([
        { $unwind: '$testHistory' },
        { $match: match },
        {
            $group: {
                _id: '$_id',
                userName: { $first: '$userName' },
                fullName: { $first: '$fullName' },
                subjectScore: { $sum: { $ifNull: [{ $toDouble: `$testHistory.sectionScores.${subject}` }, 0] } },
            }
        },
        { $sort: { subjectScore: -1 } },
        { $limit: 20 }
    ]);
    res.json(users);
});

// Average attempt stats (per user)
router.get('/average-attempts', async (req, res) => {
    const users = await User.aggregate([
        { $unwind: '$testHistory' },
        {
            $group: {
                _id: '$_id',
                userName: { $first: '$userName' },
                fullName: { $first: '$fullName' },
                avgScore: { $avg: '$testHistory.totalScore' },
                attempts: { $sum: 1 }
            }
        },
        { $sort: { avgScore: -1 } },
        { $limit: 20 }
    ]);
    res.json(users);
});

module.exports = router;
