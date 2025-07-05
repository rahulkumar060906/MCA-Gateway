import React from 'react';
import { Navigate } from 'react-router-dom';

// Usage: <AdminRoute><Component /></AdminRoute>
export default function AdminRoute({ children }) {
    // Replace with your actual admin check logic (context or API)
    const isAdmin = localStorage.getItem('role') === 'admin';
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
}
