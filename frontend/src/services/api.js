import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-chatbox-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
