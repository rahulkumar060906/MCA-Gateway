import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, promoteUser } from '../api/adminApi';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers({ page, search });
      setUsers(res.data.users);
      setPages(res.data.pages);
    } catch (err) {
      alert('Error loading users');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await deleteUser(id);
    loadUsers();
  };

  const handlePromote = async (id) => {
    await promoteUser(id);
    loadUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name/email/username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-blue-900">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.fullName}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2 space-x-2">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handlePromote(u._id)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Promote
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <button
              className="px-4 py-1 bg-gray-300 rounded"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button
              className="px-4 py-1 bg-gray-300 rounded"
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
