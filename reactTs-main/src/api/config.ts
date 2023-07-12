import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5353/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers":"Content-Type",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default instance;
