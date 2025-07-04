import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: '/api', // Adjust if your backend runs on a different port
});

// Add a request interceptor to include JWT token
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
