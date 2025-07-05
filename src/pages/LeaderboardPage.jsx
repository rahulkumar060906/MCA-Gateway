import React, { useEffect, useState } from 'react';
import { FaCrown, FaUserGraduate } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const periods = [
  { label: 'All Time', value: 'all' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

const medalColors = ['text-yellow-400', 'text-gray-400', 'text-amber-700'];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('all');
  const [users, setUsers] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjectUsers, setSubjectUsers] = useState([]);
  const [subjects, setSubjects] = useState(['Algebra', 'Calculus', 'Logic', 'Geometry']);
  const [loading, setLoading] = useState(false);
  const [avgStats, setAvgStats] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard/leaderboard?period=${period}`)
      .then(res => res.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [period]);

  const fetchSubject = (subj) => {
    setSubject(subj);
    setLoading(true);
    fetch(`/api/leaderboard/leaderboard/subject?subject=${encodeURIComponent(subj)}&period=${period}`)
      .then(res => res.json())
      .then(setSubjectUsers)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch('/api/leaderboard/average-attempts')
      .then(res => res.json())
      .then(setAvgStats);
  }, []);

  const renderLoader = () => (
    <div className="flex justify-center items-center py-6 text-blue-600">
      <ImSpinner2 className="animate-spin text-3xl" />
    </div>
  );

  const renderRankIcon = (index) => {
    if (index < 3) {
      return <FaCrown className={`text-xl ${medalColors[index]}`} />;
    }
    return <FaUserGraduate className="text-gray-500" />;
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">🏆 Leaderboard</h1>

      {/* Time Filter */}
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        {periods.map(p => (
          <button
            key={p.value}
            className={`px-5 py-2 rounded-full text-sm font-medium transition 
              ${period === p.value
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => setPeriod(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Top Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
          Top Scorers ({periods.find(p => p.value === period).label})
        </h2>
        {loading ? renderLoader() : (
          <ol className="space-y-4">
            {users.map((u, i) => (
              <li key={u._id} className="flex items-center gap-4 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <span className="text-lg w-6 text-right font-bold">{i + 1}</span>
                {renderRankIcon(i)}
                <span className="font-medium dark:text-white">{u.fullName || u.userName}</span>
                <span className="ml-auto text-blue-600 font-bold">{u.totalScore}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Subject Leaderboard */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Top Scorers by Subject</h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          {subjects.map(subj => (
            <button
              key={subj}
              className={`px-4 py-1 rounded-full text-sm transition font-medium 
                ${subject === subj
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              onClick={() => fetchSubject(subj)}
            >
              {subj}
            </button>
          ))}
        </div>

        {subject && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {subject} ({periods.find(p => p.value === period).label})
            </h3>
            {loading ? renderLoader() : (
              <ol className="space-y-3">
                {subjectUsers.map((u, i) => (
                  <li key={u._id} className="flex items-center gap-4 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <span className="text-lg w-6 text-right font-bold">{i + 1}</span>
                    {renderRankIcon(i)}
                    <span className="font-medium dark:text-white">{u.fullName || u.userName}</span>
                    <span className="ml-auto text-purple-600 font-bold">{u.subjectScore}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>

      {/* Average Attempts Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400">📊 Average Attempt Stats</h2>
        <ol className="space-y-3">
          {avgStats.map((u, i) => (
            <li key={u._id} className="flex items-center gap-4 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <span className="text-lg w-6 text-right font-bold">{i + 1}</span>
              <FaUserGraduate className="text-gray-500" />
              <span className="font-medium dark:text-white">{u.fullName || u.userName}</span>
              <span className="ml-auto text-gray-800 dark:text-gray-200">
                Avg: <strong>{u.avgScore?.toFixed(2) || 0}</strong> | Attempts: <strong>{u.attempts}</strong>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
