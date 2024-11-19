const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher/Admin who created the group
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Group', GroupSchema);
  