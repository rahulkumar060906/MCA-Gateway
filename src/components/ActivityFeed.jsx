import React from 'react';

export default function ActivityFeed({ activities }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
                {activities.map((activity) => (
                    <li key={activity.id} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                        <span className="text-xl">
                            {activity.type === 'challenge' && '🏆'}
                            {activity.type === 'test' && '📝'}
                            {activity.type === 'xp' && '⚡'}
                        </span>
                        <span>{activity.text}</span>
                        <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
