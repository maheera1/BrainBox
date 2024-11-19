// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  recipientRole: {
    type: String,
    default: 'Admin',
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Can store additional data (e.g., teacherId)
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
