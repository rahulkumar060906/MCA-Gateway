import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use full backend URL in production
  withCredentials: true, // Optional: If using cookies/session
});

// Automatically attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

