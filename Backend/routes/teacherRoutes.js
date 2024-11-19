const express = require('express');
const router = express.Router();
const { registerTeacher, loginTeacher, addStudent } = require('../controllers/teacherController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Teacher Registration
router.post('/register', registerTeacher);

// Teacher Login
router.post('/login', loginTeacher);

// Add Student (Teacher adding a student)
router.post('/add-student', authenticateUser, addStudent);

module.exports = router;
