const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Assignment', AssignmentSchema);
  