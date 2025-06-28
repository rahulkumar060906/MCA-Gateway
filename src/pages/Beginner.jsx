import React, { useState, useEffect } from 'react';
import LevelCard from '../components/LevelCard';

export default function BeginnerPath() {
  const [levels, setLevels] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [scores, setScores] = useState({});

  useEffect(() => {
    fetch('/nimcet_levels_with_real_topics.json')
      .then((res) => res.json())
      .then((data) => {
        setLevels(data.beginner || []);
      })
      .catch((err) => console.error('Failed to load levels:', err));
  }, []);

  const isLevelComplete = (level, index) => {
    return Object.entries(level.sections).every(([subject, section]) => {
      return scores[`${index}-${section.topic}`] >= 70;
    });
  };

  return (
    <div className="max-w-6xl text-center mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">🧭 Beginner Journey</h1>
      <div>
        {levels.map((level, i) => {
          const unlocked = i === 0 || isLevelComplete(levels[i - 1], i - 1);
          return (
            unlocked && (
              <LevelCard
                key={i}
                level={level}
                levelIndex={i}
                unlocked={unlocked}
                scores={scores}
                selectedChapter={selectedChapter}
                setSelectedChapter={setSelectedChapter}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
