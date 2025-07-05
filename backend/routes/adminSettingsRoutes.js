const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/admin');
const adminSettingsController = require('../controllers/adminSettingsController');

// Get admin settings
router.get('/settings', isAdmin, adminSettingsController.getSettings);
// Update admin settings
router.put('/settings', isAdmin, adminSettingsController.updateSettings);

module.exports = router;
