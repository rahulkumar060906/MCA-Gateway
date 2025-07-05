import React, { useEffect, useState } from 'react';
import { fetchTests, deleteTest } from '../api/adminApi';

export default function TestManagement() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // testId for which action is loading

    const loadTests = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchTests();
            setTests(res.data.tests.map(t => ({
                ...t,
                questions: t.questions?.length || 0
            })));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load tests');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadTests();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this test?')) return;
        setActionLoading(id);
        try {
            await deleteTest(id);
            setTests((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed');
        }
        setActionLoading(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Test Management</h1>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading tests...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-blue-950 border border-gray-200 dark:border-blue-900 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100">
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Questions</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test._id} className="border-t border-gray-200 dark:border-blue-900 hover:bg-gray-50 dark:hover:bg-blue-900">
                                    <td className="px-4 py-2">{test.title}</td>
                                    <td className="px-4 py-2">{test.subject}</td>
                                    <td className="px-4 py-2">{test.questions}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${test.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                            {test.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs"
                                        // onClick={() => handleEdit(test._id)}
                                        >Edit</button>
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs disabled:opacity-60"
                                            disabled={actionLoading === test._id}
                                            onClick={() => handleDelete(test._id)}
                                        >
                                            {actionLoading === test._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 font-semibold">Add New Test</button>
            </div>
        </div>
    );
}
