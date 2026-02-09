import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/upload.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Select a video");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);

    await axios.post("http://localhost:5000/api/videos/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      }
    });

    alert("Upload successful");
    navigate("/dashboard"); 
  };

  return (
    <div className="upload-page">
      
      <div className="upload-header">
        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Dashboard
        </button>
      </div>

      <h2>Upload Video</h2>

      <input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>

      {progress > 0 && <p>Uploading: {progress}%</p>}
    </div>
  );
}
