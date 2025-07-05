const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/admin');
const adminFeedbackController = require('../controllers/adminFeedbackController');

// List all feedback
router.get('/feedback', isAdmin, adminFeedbackController.listFeedback);
// Mark feedback as read
router.patch('/feedback/:id/read', isAdmin, adminFeedbackController.markAsRead);
// Delete feedback
router.delete('/feedback/:id', isAdmin, adminFeedbackController.deleteFeedback);

module.exports = router;
