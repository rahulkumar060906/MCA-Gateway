const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
    instantFeedback: { type: Boolean, default: true },
    timerEnabled: { type: Boolean, default: true },
    timerDuration: { type: Number, default: 60 }, // in minutes
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminSettings', adminSettingsSchema);
