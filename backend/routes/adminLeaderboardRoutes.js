const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/admin');
const adminLeaderboardController = require('../controllers/adminLeaderboardController');

// GET /api/admin/leaderboard/top-scorers?subject=...&startDate=...&endDate=...&limit=...
router.get('/leaderboard/top-scorers', isAdmin, adminLeaderboardController.topScorers);

module.exports = router;
