
const mongoose = require('mongoose');

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
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
