import { useEffect, useState, useContext } from "react";
import { getVideos } from "../api/video.api";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const socket = useContext(SocketContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getVideos().then(res => setVideos(res.data));
  }, []);

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

  // 🚪 Logout handler
  const handleLogout = () => {
    logout();        // remove token + clear user
    navigate("/");  // redirect to login
  };

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

      {videos.map(video => (
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
            <p>Score: {video.sensitivityScore}</p>
          )}

          <button
            disabled={video.status !== "completed" && video.status !== "flagged"}
            onClick={() => navigate(`/player/${video._id}`)}
          >
            ▶ Play
          </button>
        </div>
      ))}
    </div>
  );
}
