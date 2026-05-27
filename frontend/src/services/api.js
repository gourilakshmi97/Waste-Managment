import axios from "axios";

const API = axios.create({ 
  // Replace with your new live URL
  baseURL: "https://backend-405871201173.asia-south1.run.app/api" 
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (IMPORTANT)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Session expired ❌");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;