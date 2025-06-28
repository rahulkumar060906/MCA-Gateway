import React from 'react';

export default function LevelTracker({ level, xp, nextLevelXP }) {
    const percent = Math.round((xp / nextLevelXP) * 100);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">Level</h3>
            <div className="text-3xl font-extrabold text-purple-700 dark:text-purple-400 mb-2">{level}</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
                <div
                    className="bg-purple-600 h-4 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
            <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                <span>{xp} XP</span>
                <span>{nextLevelXP} XP</span>
            </div>
            <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold">{nextLevelXP - xp} XP to next level</div>
        </div>
    );
}
