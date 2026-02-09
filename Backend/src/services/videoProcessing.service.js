const Video = require("../models/Video.model");
const { getIO } = require("../sockets");

exports.processVideo = async (videoId) => {
  let progress = 0;
  const io = getIO();

  await Video.findByIdAndUpdate(videoId, {
    status: "processing",
    progress: 0,
  });

  io.emit("video-processing-started", { videoId });

  const interval = setInterval(async () => {
    progress += 20;

    if (progress < 100) {
      await Video.findByIdAndUpdate(videoId, {
        progress,
        status: "processing",
      });

      io.emit("video-progress", {
        videoId,
        progress,
        status: "processing",
      });

      return;
    }

    clearInterval(interval);

    const sensitivityScore = Math.floor(Math.random() * 100);
    const status = sensitivityScore > 60 ? "flagged" : "completed";

    await Video.findByIdAndUpdate(videoId, {
      progress: 100,
      sensitivityScore,
      status,
    });

    io.emit("video-completed", {
      videoId,
      progress: 100,
      status,
      sensitivityScore,
    });

  }, 4000);
};
