const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Google OAuth callback
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));


// Redirect to frontend with JWT after Google login
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), async (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { userId: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  // Redirect to frontend with token and user info as query params
  const frontendUrl = 'http://localhost:5173/login/success';
  const params = new URLSearchParams({
    token,
    fullName: user.fullName || '',
    userName: user.userName || '',
    email: user.email || '',
    phone: user.phone || ''
  }).toString();
  res.redirect(`${frontendUrl}?${params}`);
});

module.exports = router;
