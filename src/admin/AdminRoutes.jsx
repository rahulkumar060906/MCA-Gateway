import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../admin/components/AdminLayout';
import AdminRoute from '../admin/components/AdminRoute';
import AdminDashboard from '../admin/pages/AdminDashboard';
import UserManagement from '../admin/pages/UserManagement';
import TestManagement from '../admin/pages/TestManagement';
import LeaderboardAnalytics from '../admin/pages/LeaderboardAnalytics';
import FeedbackPage from '../admin/pages/FeedbackPage';
import AdminSettings from '../admin/pages/AdminSettings';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="tests" element={<TestManagement />} />
                <Route path="leaderboard" element={<LeaderboardAnalytics />} />
                <Route path="feedback" element={<FeedbackPage />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* Fallback for unknown admin routes */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    );
}
