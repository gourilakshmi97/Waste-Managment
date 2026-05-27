import axios from 'axios';

const API = axios.create({
  baseURL: 'https://waste-managment-backend3.onrender.com',
});

// Add the interceptor to include the token automatically
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API; // Make sure you have this export default