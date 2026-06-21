import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-backend.onrender.com",
});

export default API;