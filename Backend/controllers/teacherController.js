const bcrypt = require('bcrypt'); // For hashing passwords and comparing them
const jwt = require('jsonwebtoken'); // For generating and verifying JWT tokens
const User = require('../models/User'); // To interact with the User schema
const Group = require('../models/Group'); // To handle groups if needed in teacher logic
const GroupMember = require('../models/GroupMember'); // To handle group memberships
const Notification = require('../models/Notification'); // Import the Notification model

exports.registerTeacher = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Teacher account
    const newTeacher = new User({
      fullName,
      email,
      passwordHash: hashedPassword,
      role: 'Teacher',
      isApproved: false, // Pending admin approval
    });

    await newTeacher.save();

    // Create notification for Admin
    const notification = new Notification({
      message: `New teacher registered: ${fullName} (${email}). Awaiting approval.`,
      data: { teacherId: newTeacher._id },
    });

    await notification.save();

    res.status(201).send({ message: 'Teacher registration successful! Pending approval.' });
  } catch (err) {
    res.status(500).send({ message: 'Server Error', error: err.message });
  }
};  
  exports.loginTeacher = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find teacher by email
      const teacher = await User.findOne({ email, role: 'Teacher' });
      if (!teacher) {
        return res.status(404).send({ message: 'Teacher not found' });
      }
  
      // Check if teacher is approved
      if (!teacher.isApproved) {
        return res.status(403).send({ message: 'Account not approved by Admin yet.' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, teacher.passwordHash);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: teacher._id, role: teacher.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.send({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).send({ message: 'Server Error', error: err.message });
    }
  };
  
  exports.addStudent = async (req, res) => {
    const { studentDetails } = req.body;
  
    try {
      const teacherId = req.user.id;
  
      // Ensure the requester is an approved teacher
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.role !== 'Teacher' || !teacher.isApproved) {
        return res.status(403).send({ message: 'Unauthorized or unapproved teacher' });
      }
  
      // Validate and create student
      const existingStudent = await User.findOne({ email: studentDetails.email });
      if (existingStudent) {
        return res.status(400).send({ message: 'Student email already registered' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(studentDetails.password, salt);
  
      const newStudent = new User({
        ...studentDetails,
        passwordHash: hashedPassword,
        role: 'Student',
        isApproved: true,
        referredBy: teacherId
      });
  
      await newStudent.save();
  
      res.status(201).send({ message: 'Student added successfully!', student: newStudent });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server Error', error: err.message });
    }
  };
  