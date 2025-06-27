import React from 'react';
import { FaSeedling, FaChartLine, FaRocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LEVELS = [
    {
        icon: <FaSeedling className="text-green-500 text-4xl mb-2" />,
        title: 'Beginner',
        desc: 'Start your NIMCET journey with the basics and build a strong foundation.',
        filter: 'beginner',
    },
    {
        icon: <FaChartLine className="text-yellow-500 text-4xl mb-2" />,
        title: 'Intermediate',
        desc: 'Level up your skills with more challenging topics and practice sets.',
        filter: 'intermediate',
    },
    {
        icon: <FaRocket className="text-blue-500 text-4xl mb-2" />,
        title: 'Advanced',
        desc: 'Master advanced concepts and get exam-ready with tough problems.',
        filter: 'advanced',
    },
];

export default function Levels() {
    const navigate = useNavigate();
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-10 px-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 text-center">Choose Your Path</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl">
                Every expert was once a beginner. Select your learning level and start your personalized NIMCET preparation journey!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {LEVELS.map((level) => (
                    <div
                        key={level.title}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center p-8 hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700"
                    >
                        {level.icon}
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{level.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{level.desc}</p>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                            onClick={() => navigate(`/study?level=${level.filter}`)}
                        >
                            Explore {level.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
