import React, { useState } from 'react';
import { MdDeleteSweep } from 'react-icons/md';

const INITIAL_NOTICES = [
  {
    title: '🎯 Mock Test 5 Released',
    message: 'Available under Intermediate level. Test your speed and accuracy now.',
    type: 'info',
    date: 'June 28, 2025',
    link: '/mock',
  },
  {
    title: '📄 Admit Card Released',
    message: 'Download your NIMCET 2025 admit card from the official site.',
    type: 'alert',
    date: 'June 30, 2025',
    link: 'https://nimcet.admissions.nic.in',
  },
  {
    title: '🧠 New Notes Available',
    message: 'Computer Fundamentals notes have been updated with a quick summary.',
    type: 'success',
    date: 'June 27, 2025',
    link: '/study?level=Beginner',
  },
];

const typeColors = {
  info: 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-100',
  alert: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-100',
  success: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-100',
};

export default function NoticeBoard() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  const dismissNotice = (index) => {
    const updated = notices.filter((_, i) => i !== index);
    setNotices(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">📢 Notice Board</h2>
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <div
            key={index}
            className={`rounded-lg border-l-4 p-4 shadow-sm transform transition duration-300 hover:scale-[1.01] ${typeColors[notice.type]} bg-opacity-70 animate-fade-in`}
          >
            <div className="flex justify-between items-start">
              <div className="pr-4">
                <p className="font-semibold text-lg">{notice.title}</p>
                <p className="text-sm mt-1">{notice.message}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium opacity-70 whitespace-nowrap mb-2">{notice.date}</span>
                <button
                  onClick={() => dismissNotice(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-300 dark:hover:text-red-500 transition text-2xl"
                  title="Dismiss"
                >
                  <MdDeleteSweep />
                </button>
              </div>
            </div>
            {notice.link && (
              <a
                href={notice.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-sm font-medium underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                View Details ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
