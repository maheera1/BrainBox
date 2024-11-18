require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/teacher', require('./routes/teacherRoutes'));
// app.use('/api/student', require('./routes/studentRoutes'));
// app.use('/api/groups', require('./routes/groupRoutes'));
// app.use('/api/resources', require('./routes/resourceRoutes'));

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));