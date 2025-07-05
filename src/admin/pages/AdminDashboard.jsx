import React from 'react';

export default function AdminDashboard() {
    // Placeholder stats, replace with API data
    const stats = [
        { label: 'Total Users', value: 0 },
        { label: 'Total Tests', value: 0 },
        { label: 'Feedback', value: 0 },
        { label: 'Active Admins', value: 0 },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-blue-950 rounded-lg shadow p-6 flex flex-col items-center justify-center border border-gray-200 dark:border-blue-900"
                    >
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">{stat.value}</div>
                        <div className="text-gray-700 dark:text-gray-200 text-sm font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
