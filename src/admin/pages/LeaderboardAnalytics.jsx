import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Dialog } from '@headlessui/react';
import { fetchTopScorers } from '../api/adminApi';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899'];

const periods = ['daily', 'weekly', 'monthly'];

export default function LeaderboardAnalytics() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [allLeaderboard, setAllLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchTopScorers(selectedPeriod); // pass filter
      setLeaderboard(res.data.topUsers || []);
      setAllLeaderboard(res.data.allUsers || []);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [selectedPeriod]);

  const pieData = leaderboard.map(user => ({
    name: user.username || user.fullName || 'User',
    score: user.score,
  }));

  const barData = leaderboard.map((user, index) => ({
    rank: `#${index + 1}`,
    user: user.username || user.fullName || `User ${index + 1}`,
    score: user.score,
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Leaderboard Analytics</h2>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1 rounded text-sm font-medium capitalize ${
                selectedPeriod === p
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            View Full Leaderboard
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading leaderboard...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-blue-950 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Top Performers</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="user" tick={{ fill: '#6B7280' }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-blue-950 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="score"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Modal for full leaderboard */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="relative bg-white dark:bg-blue-950 rounded-lg max-w-3xl w-full mx-auto p-6 shadow-xl z-10">
            <Dialog.Title className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Full Leaderboard – {selectedPeriod}
            </Dialog.Title>
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Rank</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {allLeaderboard.map((user, i) => (
                    <tr key={i} className="border-t border-gray-200 dark:border-gray-800">
                      <td className="px-4 py-2">#{i + 1}</td>
                      <td className="px-4 py-2">{user.username || user.fullName || 'N/A'}</td>
                      <td className="px-4 py-2">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
