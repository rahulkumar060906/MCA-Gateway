import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import TestManagement from './pages/TestManagement';
import LeaderboardAnalytics from './pages/LeaderboardAnalytics';
import FeedbackPage from './pages/FeedbackPage';
import AdminSettings from './pages/AdminSettings';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="tests" element={<TestManagement />} />
            <Route path="leaderboard" element={<LeaderboardAnalytics />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="settings" element={<AdminSettings />} />
        </Routes>
    );
}
