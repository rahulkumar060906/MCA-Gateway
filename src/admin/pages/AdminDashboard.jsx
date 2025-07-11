import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaChartBar, FaBullhorn, FaComments, FaClipboardList, FaCogs
} from 'react-icons/fa';

export default function AdminDashboardLayout() {
  const navItems = [
    { path: 'leaderboard', label: 'Leaderboard', icon: <FaChartBar /> },
    { path: 'announcements', label: 'Announcements', icon: <FaBullhorn /> },
    { path: 'feedback', label: 'Feedback', icon: <FaComments /> },
    { path: 'tests', label: 'Tests', icon: <FaClipboardList /> },
    { path: 'settings', label: 'Settings', icon: <FaCogs /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-blue-950 shadow-lg p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-8 text-purple-600">🛠 Admin Panel</h2>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/dashboard/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded font-medium transition 
                 ${isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-blue-800'}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
