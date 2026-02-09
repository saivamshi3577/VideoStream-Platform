import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="card">
      <h4>{video.title}</h4>
      <p>Status: {video.status}</p>
      <Link to={`/player/${video._id}`}>Play</Link>
    </div>
  );
}
