import { useEffect, useState, useContext } from "react";
import { getVideos } from "../api/video.api";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);

  // 🔍 Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchDate, setSearchDate] = useState("");
  const [minSize, setMinSize] = useState("");

  const socket = useContext(SocketContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 📥 Load videos
  useEffect(() => {
    getVideos().then(res => setVideos(res.data));
  }, []);

  // 🔄 Real-time updates
  const updateVideo = ({ videoId, progress, status, sensitivityScore }) => {
    setVideos(prev =>
      prev.map(video =>
        video._id === videoId
          ? { ...video, progress, status, sensitivityScore }
          : video
      )
    );
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("video-progress", updateVideo);
    socket.on("video-completed", updateVideo);

    return () => {
      socket.off("video-progress");
      socket.off("video-completed");
    };
  }, [socket]);

  // 🚪 Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🧠 Advanced Filtering Logic
  const filteredVideos = videos.filter(video => {
    // Status filter
    if (statusFilter !== "all" && video.status !== statusFilter) return false;

    // Date filter
    if (searchDate) {
      const videoDate = new Date(video.createdAt)
        .toISOString()
        .split("T")[0];
      if (videoDate !== searchDate) return false;
    }

    // File size filter (MB)
    if (minSize && video.size < minSize * 1024 * 1024) return false;

    return true;
  });

  return (
    <div className="dashboard">
      {/* 🔝 Header */}
      <div className="dashboard-header">
        <h2>Video Dashboard</h2>

        <div className="header-actions">
          {user?.role !== "viewer" && (
            <button onClick={() => navigate("/upload")}>
              ⬆ Upload Video
            </button>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="filters">
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Videos</option>
          <option value="completed">Safe</option>
          <option value="flagged">Flagged</option>
        </select>

        <input
          type="date"
          onChange={(e) => setSearchDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min size (MB)"
          onChange={(e) => setMinSize(e.target.value)}
        />
      </div>

      {/* 🎥 Video Cards */}
     {/* 🎥 Video Cards */}
<div className="video-grid">
  {filteredVideos.map(video => (
    <div className="video-card" key={video._id}>
      <h3>{video.title}</h3>

      <span className={`badge ${video.status}`}>
        {video.status}
      </span>

      <div className="progress-bar">
        <div style={{ width: `${video.progress}%` }} />
      </div>

      <p>Progress: {video.progress}%</p>

      {video.sensitivityScore !== undefined && (
        <p>Sensitivity Score: {video.sensitivityScore}</p>
      )}

      <button
        disabled={
          video.status !== "completed" &&
          video.status !== "flagged"
        }
        onClick={() => navigate(`/player/${video._id}`)}
      >
        ▶ Play
      </button>
    </div>
  ))}
</div>

    </div>
  );
}
