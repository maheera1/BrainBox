const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');
const {
  createGroup,
  approveGroup,
  getGroups,
  editGroup,
  removeMember,
  deleteGroup,
  setResourcePermissions,
} = require('../controllers/groupController');

// Admin views all groups
router.get('/', authenticateUser, authorizeRoles(['Admin']), getGroups);

// Admin approves a group
router.put('/approve/:id', authenticateUser, authorizeRoles(['Admin']), approveGroup);

// Admin edits a group
router.put('/:id', authenticateUser, authorizeRoles(['Admin']), editGroup);

// Admin removes a member from a group
router.delete('/:groupId/member/:memberId', authenticateUser, authorizeRoles(['Admin']), removeMember);

// Admin deletes a group
router.delete('/:id', authenticateUser, authorizeRoles(['Admin']), deleteGroup);

module.exports = router;
