const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/admin');
const adminTestController = require('../controllers/adminTestController');

// All routes below are protected and admin-only
router.get('/tests', isAdmin, adminTestController.listTests);
router.get('/tests/:id', isAdmin, adminTestController.getTest);
router.post('/tests', isAdmin, adminTestController.createTest);
router.put('/tests/:id', isAdmin, adminTestController.updateTest);
router.delete('/tests/:id', isAdmin, adminTestController.deleteTest);

// Question management within a test
router.post('/tests/:id/questions', isAdmin, adminTestController.addQuestion);
router.put('/tests/:id/questions/:qid', isAdmin, adminTestController.updateQuestion);
router.delete('/tests/:id/questions/:qid', isAdmin, adminTestController.deleteQuestion);

module.exports = router;
