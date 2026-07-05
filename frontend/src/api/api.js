import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  console.log("➡️ Request:", config.method, config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Axios Error:", error);
    return Promise.reject(error);
  }
);

export default api;