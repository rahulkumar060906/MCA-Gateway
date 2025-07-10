import React, { useState } from 'react';
import { FaBullhorn, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Mock Test 3 Released!',
      message: 'Take the new full-length mock test to boost your confidence.',
      date: '2025-07-10',
    },
    {
      id: 2,
      title: 'New Lecture Uploaded',
      message: 'Matrices - Advanced Concepts is now live in Study section.',
      date: '2025-07-08',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.title || !form.message) return;

    const today = new Date().toISOString().split('T')[0];

    if (editId) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editId ? { ...a, ...form } : a))
      );
    } else {
      const newAnnouncement = {
        id: Date.now(),
        ...form,
        date: today,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }

    setForm({ title: '', message: '' });
    setEditId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (a) => {
    setForm({ title: a.title, message: a.message });
    setEditId(a.id);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
          <FaBullhorn /> Announcements
        </h2>
        <button
          onClick={() => {
            setForm({ title: '', message: '' });
            setEditId(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          <FaPlus /> New
        </button>
      </div>

      {announcements.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-sm">No announcements yet.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li
              key={a.id}
              className="bg-purple-50 dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300">{a.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{a.message}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 inline-block">{a.date}</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit(a)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(a.id)}
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-xl p-6 relative">
            <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">
              {editId ? 'Edit Announcement' : 'New Announcement'}
            </h3>
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded text-gray-700 dark:text-gray-200 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
