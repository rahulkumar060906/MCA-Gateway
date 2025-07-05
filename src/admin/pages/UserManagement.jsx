import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, promoteUser } from '../api/adminApi';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // userId for which action is loading

    const loadUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchUsers();
            setUsers(res.data.users);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load users');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        setActionLoading(id);
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed');
        }
        setActionLoading(null);
    };

    const handlePromote = async (id) => {
        setActionLoading(id);
        try {
            await promoteUser(id);
            setUsers((prev) => prev.map((u) => u._id === id ? { ...u, role: 'admin' } : u));
        } catch (err) {
            alert(err.response?.data?.message || 'Promote failed');
        }
        setActionLoading(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">User Management</h1>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading users...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-blue-950 border border-gray-200 dark:border-blue-900 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t border-gray-200 dark:border-blue-900 hover:bg-gray-50 dark:hover:bg-blue-900">
                                    <td className="px-4 py-2">{user.fullName}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 capitalize">{user.role}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs disabled:opacity-60"
                                            disabled={actionLoading === user._id}
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            {actionLoading === user._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                        {user.role !== 'admin' && (
                                            <button
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs disabled:opacity-60"
                                                disabled={actionLoading === user._id}
                                                onClick={() => handlePromote(user._id)}
                                            >
                                                {actionLoading === user._id ? 'Promoting...' : 'Promote'}
                                            </button>
                                        )}
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
