import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminLayout() {
    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-blue-950">
            <Sidebar />
            <main className="flex-1 p-2 md:p-6">
                <Outlet />
            </main>
        </div>
    );
}
