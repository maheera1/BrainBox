const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  approveTeacher,
  getAllUsers,
  updateUser,
  deleteUser,
  getDeletionRequests,
  handleDeletionRequest,
  setResourcePermissions
} = require('../controllers/adminController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');

// Admin Registration & Login
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Approve Teacher
router.put('/approve/:id', authenticateUser, authorizeRoles(['Admin']), approveTeacher);

// User Management
router.get('/users', authenticateUser, authorizeRoles(['Admin']), getAllUsers);
router.put('/users/:id', authenticateUser, authorizeRoles(['Admin']), updateUser);
router.delete('/users/:id', authenticateUser, authorizeRoles(['Admin']), deleteUser);

// Handle Deletion Requests
router.get('/deletion-requests', authenticateUser, authorizeRoles(['Admin']), getDeletionRequests);
router.put('/deletion-requests/:id', authenticateUser, authorizeRoles(['Admin']), handleDeletionRequest);

router.put('/resource/permissions', authenticateUser, authorizeRoles(['Admin']), setResourcePermissions);

module.exports = router;
