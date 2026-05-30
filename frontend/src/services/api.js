import axios from "axios";

// During local development the app must talk to the locally-running backend
// (which has the multipart/multer upload handling). When deployed it uses the
// production backend. Override anytime with a VITE_API_URL env var.
const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isLocalhost
    ? "http://localhost:8080/api"
    : "https://backend-405871201173.asia-south1.run.app/api");

// Backend origin without the trailing "/api" — used to build absolute URLs for
// uploaded files served from "/uploads/...".
export const API_ORIGIN = BASE_URL.replace(/\/api\/?$/, "");

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;