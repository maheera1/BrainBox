const StudySessionSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    zoomLink: { type: String }, // Zoom API integration
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('StudySession', StudySessionSchema);
  