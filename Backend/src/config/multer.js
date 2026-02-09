// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["video/mp4", "video/x-matroska"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only MP4 & MKV files allowed"), false);
//   }
// };

// module.exports = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 200 * 1024 * 1024 } // 200MB
// });


const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/x-matroska"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only MP4 & MKV files allowed"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 },
});
