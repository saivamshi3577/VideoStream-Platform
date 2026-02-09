
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  videoUrl: {
    type: String,
    required: true,
  },

  cloudinaryId: {
    type: String,
    required: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tenantId: String,

  status: {
    type: String,
    enum: ["processing", "completed", "flagged"],
    default: "processing",
  },

  progress: {
    type: Number,
    default: 0,
  },

  sensitivityScore: Number,

  size: Number,
  mimeType: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", videoSchema);
