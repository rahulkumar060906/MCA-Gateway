const AdminSettings = require('../models/AdminSettings');

// Get admin settings (singleton)
exports.getSettings = async (req, res) => {
    try {
        let settings = await AdminSettings.findOne();
        if (!settings) {
            settings = await AdminSettings.create({});
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update admin settings
exports.updateSettings = async (req, res) => {
    try {
        const { instantFeedback, timerEnabled, timerDuration } = req.body;
        let settings = await AdminSettings.findOne();
        if (!settings) {
            settings = await AdminSettings.create({ instantFeedback, timerEnabled, timerDuration });
        } else {
            settings.instantFeedback = instantFeedback ?? settings.instantFeedback;
            settings.timerEnabled = timerEnabled ?? settings.timerEnabled;
            settings.timerDuration = timerDuration ?? settings.timerDuration;
            settings.updatedAt = Date.now();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};
