const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../config/multer");

const {
  uploadVideo,
  getAllVideos,
  getSingleVideo,
  getVideoStatus
} = require("../controllers/video.controller");


router.get(
  "/",
  auth,
  role("viewer", "editor", "admin"),
  getAllVideos
);

router.get(
  "/:id",
  auth,
  role("viewer", "editor", "admin"),
  getSingleVideo
);


router.get(
  "/:id/status",
  auth,
  role("viewer", "editor", "admin"),
  getVideoStatus
);


router.post(
  "/upload",
  auth,
  role("admin", "editor"),
  upload.single("video"),
  uploadVideo
);

module.exports = router;
