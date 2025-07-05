import React, { useEffect, useState } from 'react';
import { fetchFeedback, markFeedbackRead, deleteFeedback } from '../api/adminApi';

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // feedbackId for which action is loading

    const loadFeedback = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchFeedback();
            setFeedbacks(res.data.feedbacks);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load feedback');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadFeedback();
    }, []);

    const handleMarkRead = async (id) => {
        setActionLoading(id);
        try {
            await markFeedbackRead(id);
            setFeedbacks((prev) => prev.map((fb) => fb._id === id ? { ...fb, isRead: true } : fb));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to mark as read');
        }
        setActionLoading(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this feedback?')) return;
        setActionLoading(id);
        try {
            await deleteFeedback(id);
            setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed');
        }
        setActionLoading(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">User Feedback</h1>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading feedback...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-blue-950 border border-gray-200 dark:border-blue-900 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100">
                                <th className="px-4 py-2">User</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((fb) => (
                                <tr key={fb._id} className="border-t border-gray-200 dark:border-blue-900 hover:bg-gray-50 dark:hover:bg-blue-900">
                                    <td className="px-4 py-2">{fb.user?.fullName || 'N/A'}</td>
                                    <td className="px-4 py-2">{fb.user?.email || 'N/A'}</td>
                                    <td className="px-4 py-2">{fb.message}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${fb.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {fb.isRead ? 'Read' : 'Unread'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        {!fb.isRead && (
                                            <button
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs disabled:opacity-60"
                                                disabled={actionLoading === fb._id}
                                                onClick={() => handleMarkRead(fb._id)}
                                            >
                                                {actionLoading === fb._id ? 'Marking...' : 'Mark as Read'}
                                            </button>
                                        )}
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs disabled:opacity-60"
                                            disabled={actionLoading === fb._id}
                                            onClick={() => handleDelete(fb._id)}
                                        >
                                            {actionLoading === fb._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
