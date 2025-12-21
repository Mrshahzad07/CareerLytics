import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://careerlytics-production-2bd8.up.railway.app",
});

export default api;
