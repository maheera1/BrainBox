const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the Admin user
    const newAdmin = new User({
      fullName,
      email,
      passwordHash: hashedPassword,
      role: 'Admin',
      isApproved: true // Admins are automatically approved
    });

    await newAdmin.save();

    res.status(201).send({ message: 'Admin registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: 'Server Error', error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const admin = await User.findOne({ email, role: 'Admin' });
      if (!admin) {
        return res.status(404).send({ message: 'Admin not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.send({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).send({ message: 'Server Error', error: err.message });
    }
  };

  exports.approveTeacher = async (req, res) => {
    const { id } = req.params;
  
    try {
      const teacher = await User.findById(id);
      if (!teacher || teacher.role !== 'Teacher') {
        return res.status(404).send({ message: 'Teacher not found' });
      }
  
      // Approve Teacher
      teacher.isApproved = true;
      await teacher.save();
  
      res.send({ message: 'Teacher approved successfully!' });
    } catch (err) {
      res.status(500).send({ message: 'Server Error', error: err.message });
    }
  };
  