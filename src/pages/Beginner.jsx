import React, { useState } from 'react';

const BEGINNER_LEVELS = [
  {
    title: 'Level 1: Foundation',
    description: 'Start with core math and reasoning basics.',
    chapters: [
      {
        title: 'Sets & Venn Diagrams',
        resources: {
          video: 'https://example.com/sets-video',
          notes: 'https://example.com/sets-notes',
          test: 'https://example.com/sets-test',
        },
      },
      {
        title: 'Number Systems',
        resources: {
          video: 'https://example.com/number-video',
          notes: 'https://example.com/number-notes',
          test: 'https://example.com/number-test',
        },
      },
    ],
  },
  {
    title: 'Level 2: Core Concepts',
    description: 'Continue with algebra, logic, and basics of computers.',
    chapters: [
      {
        title: 'Algebra Basics',
        resources: {
          video: 'https://example.com/algebra-video',
          notes: 'https://example.com/algebra-notes',
          test: 'https://example.com/algebra-test',
        },
      },
      {
        title: 'Computer Fundamentals',
        resources: {
          video: 'https://example.com/computer-video',
          notes: 'https://example.com/computer-notes',
          test: 'https://example.com/computer-test',
        },
      },
    ],
  },
];

export default function BeginnerPath() {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">🧭 Beginner Journey</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {BEGINNER_LEVELS.map((level, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">{level.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{level.description}</p>
            </div>

            {level.chapters.map((chapter, j) => (
              <div
                key={j}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-4"
              >
                <button
                  onClick={() =>
                    setSelectedChapter(
                      selectedChapter?.title === chapter.title ? null : chapter
                    )
                  }
                  className="text-left w-full text-lg font-semibold text-blue-600 hover:underline"
                >
                  📘 {chapter.title}
                </button>

                {selectedChapter?.title === chapter.title && (
                  <div className="mt-4 grid sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center shadow">
                      <p className="font-bold text-blue-600 mb-2">📺 Video Lecture</p>
                      <a
                        href={chapter.resources.video}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        Watch
                      </a>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center shadow">
                      <p className="font-bold text-blue-600 mb-2">📝 Notes</p>
                      <a
                        href={chapter.resources.notes}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        Download
                      </a>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center shadow">
                      <p className="font-bold text-blue-600 mb-2">🧪 Test</p>
                      <a
                        href={chapter.resources.test}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        Take Test
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
