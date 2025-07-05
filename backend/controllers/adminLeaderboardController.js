const User = require('../models/User');
const Submission = require('../models/Submission'); // Assuming you have a Submission model

// Get top scorers by subject and time period
exports.topScorers = async (req, res) => {
    try {
        const { subject, startDate, endDate, limit = 10 } = req.query;
        const match = {};
        if (subject) match.subject = subject;
        if (startDate || endDate) {
            match.attemptedAt = {};
            if (startDate) match.attemptedAt.$gte = new Date(startDate);
            if (endDate) match.attemptedAt.$lte = new Date(endDate);
        }
        // Aggregate top scorers
        const pipeline = [
            { $match: match },
            {
                $group: {
                    _id: '$user',
                    totalScore: { $sum: '$totalScore' },
                    attempts: { $sum: 1 }
                }
            },
            { $sort: { totalScore: -1 } },
            { $limit: parseInt(limit) },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            { $unwind: '$userInfo' },
            {
                $project: {
                    _id: 0,
                    userId: '$userInfo._id',
                    name: '$userInfo.fullName',
                    email: '$userInfo.email',
                    totalScore: 1,
                    attempts: 1
                }
            }
        ];
        const top = await Submission.aggregate(pipeline);
        res.json(top);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
