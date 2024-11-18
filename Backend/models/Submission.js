const SubmissionSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submissionLink: { type: String }, // URL to submitted work
    submittedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Submission', SubmissionSchema);
  