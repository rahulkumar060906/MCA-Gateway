import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';

const mockUsers = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', role: 'Student' },
  { id: 2, name: 'Meera Kapoor', email: 'meera@example.com', role: 'Student' },
  { id: 3, name: 'Rohit Verma', email: 'rohit@example.com', role: 'Admin' },
];

export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for user ID ${id} is not implemented yet.`);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">
        👥 User Management
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 pl-10 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-800"
                >
                  <td className="flex items-center gap-2 py-3 px-3">
                    <FaUserCircle className="text-lg text-purple-500" />
                    {user.name}
                  </td>
                  <td className="py-3 px-3">{user.email}</td>
                  <td className="py-3 px-3">{user.role}</td>
                  <td className="py-3 px-3 text-center space-x-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(user.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
