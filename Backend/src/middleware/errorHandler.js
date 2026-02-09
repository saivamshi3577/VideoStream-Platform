export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size too large" });
    }
  }

  if (err.message === "Only video files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({
    message: err.message || "Internal server error",
  });
};
