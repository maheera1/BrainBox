const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  approveTeacher
} = require('../controllers/adminController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');

// Admin Registration & Login
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Approve Teacher
router.put('/approve/:id', authenticateUser, authorizeRoles(['Admin']), approveTeacher);

module.exports = router;
