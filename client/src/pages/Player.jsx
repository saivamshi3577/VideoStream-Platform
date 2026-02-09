

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Player() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Failed to load video", err);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="player-container">
      <h2>{video.title}</h2>

      <video
        controls
        autoPlay
        width="100%"
        src={video.videoUrl}   
      />

    </div>
  );
}
