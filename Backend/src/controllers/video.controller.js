

const Video = require("../models/Video.model");
const { processVideo } = require("../services/videoProcessing.service");
const cloudinary = require("../config/cloudinary");


exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file required" });
    }

 
    if (!req.file.mimetype.startsWith("video/")) {
      return res.status(400).json({ message: "Invalid video format" });
    }

    if (req.file.size > 100 * 1024 * 1024) {
      return res.status(400).json({ message: "Video size exceeds 100MB limit" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "videos",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        try {
          const video = await Video.create({
            title: req.body.title || req.file.originalname,

          
            videoUrl: result.secure_url,
            cloudinaryId: result.public_id,

            ownerId: req.user.userId,
            tenantId: req.user.tenantId,

            size: req.file.size,
            mimeType: req.file.mimetype,

            status: "processing",
            progress: 0,
          });

          processVideo(video._id);

          return res.status(201).json({
            message: "Video uploaded successfully",
            video,
          });
        } catch (dbError) {
          console.error("DB ERROR:", dbError);
          return res.status(500).json({ message: "Failed to save video" });
        }
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};



exports.getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      ownerId: req.user.userId,
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    console.error("GET SINGLE VIDEO ERROR:", error);
    res.status(500).json({ message: "Failed to fetch video" });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const videos = await Video.find({
      ownerId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    console.error("GET VIDEOS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};


exports.getVideoStatus = async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      ownerId: req.user.userId,
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({
      progress: video.progress,
      status: video.status,
      sensitivityScore: video.sensitivityScore,
    });
  } catch (error) {
    console.error("STATUS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch status" });
  }
};
