
const mongoose = require('mongoose');

const testHistorySchema = new mongoose.Schema({
    testId: String,
    sectionScores: {
        type: Map,
        of: Number
    },
    totalScore: Number,
    attemptedAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: function () { return !this.googleId; },
        trim: true
    },
    userName: {
        type: String,
        required: function () { return !this.googleId; },
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: function () { return !this.googleId; },
        unique: true,
        sparse: true,
        trim: true
    },
    email: {
        type: String,
        required: function () { return !this.googleId; },
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false // Not required for Google users
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    testHistory: [testHistorySchema],
    recentLevel: { type: String, default: '' },
    recentVideo: { type: String, default: '' },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
