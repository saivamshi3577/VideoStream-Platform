const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const videoRoutes = require("./routes/video.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/videos", videoRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
