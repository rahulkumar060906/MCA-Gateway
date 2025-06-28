import React from 'react';

export default function ProgressCard({ completed, total, streak }) {
    const percent = Math.round((completed / total) * 100);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">Progress</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
                <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
            <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                <span>{completed} / {total} Chapters</span>
                <span>{percent}%</span>
            </div>
            <div className="mt-4 text-green-600 dark:text-green-400 font-semibold">🔥 {streak} day streak</div>
        </div>
    );
}
