const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/admin');
const adminUserController = require('../controllers/adminUserController');

// All routes below are protected and admin-only
router.get('/users', isAdmin, adminUserController.listUsers);
router.delete('/users/:id', isAdmin, adminUserController.deleteUser);
router.patch('/users/:id/promote', isAdmin, adminUserController.promoteUser);

module.exports = router;
