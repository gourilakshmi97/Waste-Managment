import axios from "axios";

const API = axios.create({
  baseURL: 'https://backend-405871201173.asia-south1.run.app/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;