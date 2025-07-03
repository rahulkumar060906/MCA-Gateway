const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find or create user
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            // Try to find by email
            const email = profile.emails && profile.emails[0]?.value;
            user = await User.findOne({ email });
            if (user) {
                user.googleId = profile.id;
                await user.save();
            } else {
                user = await User.create({
                    fullName: profile.displayName,
                    userName: profile.displayName.replace(/\s+/g, '').toLowerCase() + profile.id.slice(-4),
                    phone: '',
                    email: email || '',
                    password: '',
                    googleId: profile.id,
                });
            }
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
