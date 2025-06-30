import React from 'react';
import ProgressCard from '../components/ProgressCard';
import ActivityFeed from '../components/ActivityFeed';
import LevelTracker from '../components/LevelTracker';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    
} from 'recharts';

const mockStats = {
    xp: 1200,
    level: 5,
    nextLevelXP: 1500,
    completedChapters: 18,
    totalChapters: 25,
    streak: 7,
    name: 'Arka Maulana',
    location: 'Surakarta, INA',
    avatar: 'https://i.pravatar.cc/100',
};

const mockActivities = [
    { id: 1, type: 'challenge', text: 'Completed Daily Challenge: Algebra', time: '2 hours ago' },
    { id: 2, type: 'test', text: 'Scored 85% in Matrices Test', time: '1 day ago' },
    { id: 3, type: 'xp', text: 'Earned 100 XP for clearing Level 4', time: '2 days ago' },
];

const mockChartData = [
    { month: 'Aug', study: 20, exam: 10 },
    { month: 'Sep', study: 25, exam: 15 },
    { month: 'Oct', study: 30, exam: 22 },
    { month: 'Nov', study: 42, exam: 35 },
    { month: 'Dec', study: 38, exam: 20 },
    { month: 'Jan', study: 45, exam: 25 },
];

const dailyTip = "Break big problems into small ones — consistency beats intensity.";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-20 hidden md:w-60 bg-gray-200 text-gray-800 dark:bg-blue-950 dark:text-white p-4 md:flex flex-col gap-6">
                <nav className="flex flex-col items-center md:items-start gap-4 mt-4">
                    <a href="#" className="hover:opacity-80">📊 Overview</a>
                    <a href="#" className="hover:opacity-80">⚙️ Settings</a>
                    <a href="#" className="hover:opacity-80">🧭 Activity</a>
                    <a href="#" className="hover:opacity-80">📈 Progress</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hello, Arka 👋</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Nice to have you back. What an exciting day! Get ready and continue your lesson today.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <ProgressCard completed={mockStats.completedChapters} total={mockStats.totalChapters} streak={mockStats.streak} />
                    <LevelTracker level={mockStats.level} xp={mockStats.xp} nextLevelXP={mockStats.nextLevelXP} />
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center md:col-span-1 animate-pulse">
                        <div className="text-purple-600 dark:text-purple-300 font-bold text-2xl mb-2 animate-glow">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">{mockStats.xp} XP</span>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded shadow">Redeem</button>
                            <button className="bg-green-600 text-white px-3 py-1 rounded shadow">Collect</button>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center text-center">
                        <img src={mockStats.avatar} alt="avatar" className="rounded-full w-16 h-16 mb-2" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{mockStats.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{mockStats.location}</p>
                        <div className="mt-4 text-sm italic text-blue-600 dark:text-blue-400">"{dailyTip}"</div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📊 Learning Activity</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockChartData}>
                            <defs>
                                <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="examGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="study" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#studyGradient)" />
                            <Line type="monotone" dataKey="exam" stroke="#EC4899" strokeWidth={3} fillOpacity={1} fill="url(#examGradient)" />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                <section className="mt-8">
                    <ActivityFeed activities={mockActivities} />
                </section>
            </main>
        </div>
    );
}