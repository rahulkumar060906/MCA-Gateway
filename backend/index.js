const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', `${process.env.FRONTEND_URL}`],
    credentials: true
}));
app.use(express.json());
const leaderboardRoutes = require('./routes/leaderboardRoutes');
app.use('/api/leaderboard', leaderboardRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);
// Admin user management routes
const adminUserRoutes = require('./routes/adminUserRoutes');
app.use('/api/admin', adminUserRoutes);
// Admin test management routes
const adminTestRoutes = require('./routes/adminTestRoutes');
app.use('/api/admin', adminTestRoutes);
// Admin leaderboard analytics routes
const adminLeaderboardRoutes = require('./routes/adminLeaderboardRoutes');
app.use('/api/admin', adminLeaderboardRoutes);
// Admin feedback management routes
const adminFeedbackRoutes = require('./routes/adminFeedbackRoutes');
app.use('/api/admin', adminFeedbackRoutes);
// Admin settings management routes
const adminSettingsRoutes = require('./routes/adminSettingsRoutes');
app.use('/api/admin', adminSettingsRoutes);

// Set security HTTP headers
app.use(helmet());

// Rate limiting for login route
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nimcet');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Passport config
const passport = require('passport');
require('./utils/passportGoogle');
app.use(passport.initialize());


// Apply rate limiter only to login route
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth/login', loginLimiter, authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', require('./routes/googleAuth'));
app.use('/api/progress', require('./routes/progressRoutes'));

// Post-login logic: protected route example
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const jwt = require('jsonwebtoken');
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid or expired token' });
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

// Example: get user profile after login (frontend should call this after login)
app.get('/api/profile', authenticateJWT, async (req, res) => {
    try {
        const User = require('./models/User');
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Basic route
app.get('/', (req, res) => {
    res.send('NIMCET Prep Game Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
