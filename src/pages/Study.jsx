import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BeginnerPath from './Beginner';
import Intermediate from './Intermediate';
import Advanced from './Advanced';

const SUBJECTS = [
  {
    name: 'Mathematics',
    topics: [
      { title: 'Algebra', notes: 'Algebra covers equations, polynomials, and more.', level: 'Beginner' },
      { title: 'Matrices', notes: 'Matrices are arrays of numbers used in linear algebra.', level: 'Intermediate' },
      { title: 'Calculus', notes: 'Calculus involves limits, derivatives, and integrals.', level: 'Advanced' },
      { title: 'Probability', notes: 'Probability is the study of chance and random events.', level: 'Advanced' },
    ],
  },
  {
    name: 'Logical Reasoning',
    topics: [
      { title: 'Series', notes: 'Series questions test your ability to find patterns.', level: 'Beginner' },
      { title: 'Puzzles', notes: 'Puzzles require logical deduction and reasoning.', level: 'Intermediate' },
      { title: 'Coding-Decoding', notes: 'Coding-Decoding involves symbol/letter manipulation.', level: 'Advanced' },
    ],
  },
  {
    name: 'Computer Awareness',
    topics: [
      { title: 'Operating Systems', notes: 'OS manages hardware and software resources.', level: 'Beginner' },
      { title: 'Networking', notes: 'Networking covers data communication and protocols.', level: 'Intermediate' },
      { title: 'DBMS', notes: 'DBMS is about database management systems.', level: 'Advanced' },
    ],
  },
  {
    name: 'General English',
    topics: [
      { title: 'Vocabulary', notes: 'Vocabulary includes word meanings and usage.', level: 'Beginner' },
      { title: 'Grammar', notes: 'Grammar covers sentence structure and rules.', level: 'Intermediate' },
      { title: 'Comprehension', notes: 'Comprehension tests reading and understanding.', level: 'Advanced' },
    ],
  },
];

export default function Study() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedLevel = params.get('level');

  // Show level-specific component if level is set
  if (selectedLevel) {
    if (selectedLevel.toLowerCase() === 'beginner') return <BeginnerPath />;
    if (selectedLevel.toLowerCase() === 'intermediate') return <Intermediate />;
    if (selectedLevel.toLowerCase() === 'advanced') return <Advanced />;
  }

  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState('');

  const handleToggle = (topic) => {
    setExpanded((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const filteredTopics = selectedSubject.topics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-0">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">Subjects</h2>
        <ul className="space-y-2">
          {SUBJECTS.map((subj) => (
            <li key={subj.name}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedSubject.name === subj.name ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-600'}`}
                onClick={() => setSelectedSubject(subj)}
              >
                {subj.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="grid gap-4">
          {filteredTopics.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400">No topics found.</div>
          ) : (
            filteredTopics.map((topic) => (
              <div key={topic.title} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <button
                  className="w-full flex justify-between items-center text-lg font-semibold text-left text-gray-800 dark:text-gray-100 focus:outline-none"
                  onClick={() => handleToggle(topic.title)}
                >
                  {topic.title} <span className="text-sm text-blue-500 ml-2">({topic.level})</span>
                  <span className="ml-auto text-blue-600 dark:text-blue-400">{expanded[topic.title] ? '-' : '+'}</span>
                </button>
                {expanded[topic.title] && (
                  <div className="mt-2 text-gray-700 dark:text-gray-300 text-base border-t border-gray-200 dark:border-gray-700 pt-2">
                    {topic.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
