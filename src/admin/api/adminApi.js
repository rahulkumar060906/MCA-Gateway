import axios from 'axios';

const API = axios.create({
    baseURL: '/api/admin',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// User Management
export const fetchUsers = (params) => API.get('/users', { params });
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const promoteUser = (id) => API.patch(`/users/${id}/promote`);

// Test Management
export const fetchTests = (params) => API.get('/tests', { params });
export const createTest = (data) => API.post('/tests', data);
export const updateTest = (id, data) => API.put(`/tests/${id}`, data);
export const deleteTest = (id) => API.delete(`/tests/${id}`);
export const addQuestion = (testId, data) => API.post(`/tests/${testId}/questions`, data);
export const updateQuestion = (testId, qid, data) => API.put(`/tests/${testId}/questions/${qid}`, data);
export const deleteQuestion = (testId, qid) => API.delete(`/tests/${testId}/questions/${qid}`);

// Leaderboard Analytics
export const fetchTopScorers = (params) => API.get('/leaderboard/top-scorers', { params });

// Feedback
export const fetchFeedback = (params) => API.get('/feedback', { params });
export const markFeedbackRead = (id) => API.patch(`/feedback/${id}/read`);
export const deleteFeedback = (id) => API.delete(`/feedback/${id}`);

// Admin Settings
export const fetchSettings = () => API.get('/settings');
export const updateSettings = (data) => API.put('/settings', data);

export default API;
