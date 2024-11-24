const bcrypt = require('bcrypt'); // For hashing and comparing passwords
const jwt = require('jsonwebtoken'); // For generating and verifying JWT tokens
const User = require('../models/User'); // To interact with the User schema
const GroupMember = require('../models/GroupMember'); // To manage group membership logic
const Assignment = require('../models/Assignment'); // For assignment-related logic
const Submission = require('../models/Submission'); // To handle student submissions
const Notification = require('../models/Notification');

exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find student by email
      const student = await User.findOne({ email, role: 'Student' });
      if (!student) {
        return res.status(404).send({ message: 'Student not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, student.passwordHash);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: student._id, role: student.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.send({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).send({ message: 'Server Error', error: err.message });
    }
  };
  
  exports.viewProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user.id).select('-passwordHash');
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        res.send(student);
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
  const updates = req.body;

  try {
      const student = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-passwordHash');
      if (!student) {
          return res.status(404).send({ message: 'Student not found' });
      }
      res.send({ message: 'Profile updated successfully', student });
  } catch (err) {
      res.status(500).send({ message: 'Server Error', error: err.message });
  }
};


exports.requestAccountDeletion = async (req, res) => {
    try {
        const notification = new Notification({
            message: `Student ${req.user.fullName} has requested account deletion.`,
            type: 'DeletionRequest',
            userId: req.user.id,
        });

        await notification.save();
        res.send({ message: 'Account deletion request submitted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err.message });
    }
};
