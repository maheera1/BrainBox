const Notification = require('../models/Notification');

// Get all notifications for Admin
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientRole: 'Admin' }).sort({ createdAt: -1 });
    res.send(notifications);
  } catch (err) {
    res.status(500).send({ message: 'Server Error', error: err.message });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.send({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).send({ message: 'Server Error', error: err.message });
  }
};
