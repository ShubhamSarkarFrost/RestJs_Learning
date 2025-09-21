const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    imageUrl: { type: String }, // full URL to /uploads/filename
  },
  { timestamps: true },
);

module.exports = mongoose.model('Post', PostSchema);
