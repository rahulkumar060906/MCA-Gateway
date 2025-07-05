import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'User Management' },
    { to: '/admin/tests', label: 'Test Management' },
    { to: '/admin/leaderboard', label: 'Leaderboard Analytics' },
    { to: '/admin/feedback', label: 'Feedback' },
    { to: '/admin/settings', label: 'Admin Settings' },
];

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    return (
        <aside className={`h-full bg-white dark:bg-blue-950 border-r border-gray-200 dark:border-blue-900 transition-all duration-200 ${open ? 'w-56' : 'w-16'} flex flex-col`}>
            <button
                className="p-2 m-2 rounded hover:bg-gray-100 dark:hover:bg-blue-900 self-end"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Toggle sidebar"
            >
                {open ? '⏴' : '⏵'}
            </button>
            <nav className="flex-1 flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2
              ${location.pathname.startsWith(link.to)
                                ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-900'}`}
                        title={link.label}
                    >
                        {open ? link.label : link.label[0]}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
