import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video/")) {
    return cb(new Error("Only video files are allowed"), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
  fileFilter,
});
