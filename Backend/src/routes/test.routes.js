const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get(
  "/admin",
  auth,
  role("admin"),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

router.get(
  "/user",
  auth,
  (req, res) => {
    res.json({
      message: "User access granted",
      user: req.user
    });
  }
);

module.exports = router;
