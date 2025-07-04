import api from './axiosInstance';

// Reset password API
export async function resetPassword(email) {
    const res = await api.post('/auth/reset-password', { email });
    return res.data;
}

export async function signupUser(data) {
    const res = await api.post('/auth/signup', data);
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data;
}

export async function loginUser(data) {
    const res = await api.post('/auth/login', data);
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data;
}

// Get user data (protected)
export async function getUserData() {
    const res = await api.get('/auth/user-data');
    return res.data;
}

// Save test data (protected)
export async function saveTestData(testData) {
    const res = await api.post('/auth/save-test', testData);
    return res.data;
}
