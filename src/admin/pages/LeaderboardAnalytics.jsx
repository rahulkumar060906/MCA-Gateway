import React, { useEffect, useState } from 'react';
import { fetchTopScorers } from '../api/adminApi';
// import { Bar } from 'react-chartjs-2'; // For real charting

export default function LeaderboardAnalytics() {
    const [topScorers, setTopScorers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchTopScorers()
            .then(res => setTopScorers(res.data))
            .catch(err => setError(err.response?.data?.message || 'Failed to load leaderboard'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Leaderboard Analytics</h1>
            {/* Add filters for subject/time period here */}
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading leaderboard...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-blue-950 border border-gray-200 dark:border-blue-900 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Total Score</th>
                                <th className="px-4 py-2">Attempts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topScorers.map((user, idx) => (
                                <tr key={idx} className="border-t border-gray-200 dark:border-blue-900 hover:bg-gray-50 dark:hover:bg-blue-900">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.totalScore}</td>
                                    <td className="px-4 py-2">{user.attempts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Example chart placeholder */}
            {/* <Bar data={...} options={...} /> */}
        </div>
    );
}
