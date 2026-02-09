const fs = require("fs");
const path = require("path");

exports.streamVideo = (req, res) => {
  const { filename } = req.params;

  const videoPath = path.join(__dirname, "../../uploads", filename);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ message: "Video not found" });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;


  if (!range) {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
    });
    fs.createReadStream(videoPath).pipe(res);
    return;
  }

  const CHUNK_SIZE = 10 ** 6; 
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const stream = fs.createReadStream(videoPath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  });

  stream.pipe(res);
};
