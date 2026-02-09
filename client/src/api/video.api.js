import api from "./axios";

export const uploadVideo = (formData) =>
  api.post("/videos/upload", formData);

export const getVideos = () =>
  api.get("/videos");

export const getStatus = (id) =>
  api.get(`/videos/${id}/status`);
