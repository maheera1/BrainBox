const ResourceSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    resourceType: { type: String, enum: ['PDF', 'Link', 'Video', 'Image'], required: true },
    url: { type: String }, // For external resources (e.g., YouTube, Google Drive)
    filePath: { type: String }, // For uploaded files
    tags: [{ type: String }], // Array of tags for categorization
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Resource', ResourceSchema);
  