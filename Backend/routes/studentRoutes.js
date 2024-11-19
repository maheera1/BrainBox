const express = require('express');
const router = express.Router();
const { loginStudent } = require('../controllers/studentController');

// Student Login
router.post('/login', loginStudent);

module.exports = router;
