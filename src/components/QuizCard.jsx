import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const quizData = [
  {
    question: 'What is the value of \\( \\int x^2 \\, dx \\)?',
    options: ['\\( \\frac{x^3}{3} + C \\)', '\\( x^3 + C \\)', '\\( \\frac{x^2}{2} + C \\)', '\\( \\frac{x^4}{4} + C \\)'],
    answer: [0],
    explanation: 'The integral of \\( x^n \\) is \\( \\frac{x^{n+1}}{n+1} + C \\).',
  },
  {
    question: 'What is the value of \\( \\sin 30^\\circ \\)?',
    options: ['\\( \\frac{1}{2} \\)', '\\( \\frac{\\sqrt{3}}{2} \\)', '1', '0'],
    answer: [0],
    explanation: 'The sine of \\( 30^\\circ \\) is \\( \\frac{1}{2} \\).',
  },
  // Add more questions as needed...
];

export default function QuizCard({ onComplete, onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleSelect = (optionIndex) => {
    if (!submitted) {
      setSelected(prev => ({ ...prev, [current]: optionIndex }));
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    quizData.forEach((q, i) => {
      if (selected[i] === q.answer[0]) correct++;
    });
    setScore(correct);
    setSubmitted(true);

    const attempted = Object.keys(selected).length;
    const result = {
      attempted,
      correct,
      total: quizData.length,
      percentage: Math.round((correct / quizData.length) * 100),
    };

    setAnalysis(result);
    onComplete?.(correct, attempted);
  };

  const closeQuiz = () => {
    setCurrent(0);
    setSelected({});
    setSubmitted(false);
    setAnalysis(null);
    setScore(0);
    setTimeLeft(180);
    onClose?.();
  };

  const q = quizData[current];

  return (
    <div className="w-[22rem] sm:w-[30rem] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative text-gray-800 dark:text-white">
      {!submitted && (
        <div className="text-right text-red-600 dark:text-red-400 font-semibold text-sm mb-2">
          ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!submitted && (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg font-medium mb-3">
              {current + 1}. <span dangerouslySetInnerHTML={{ __html: q.question }} />
            </p>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isChosen = selected[current] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full px-4 py-2 text-left rounded border ${isChosen
                      ? 'bg-blue-100 border-blue-500 text-blue-800'
                      : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-500 dark:text-white'
                      }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: opt }} />
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrent(prev => Math.max(prev - 1, 0))}
                disabled={current === 0}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() => setCurrent(prev => Math.min(prev + 1, quizData.length - 1))}
                className="text-blue-600 hover:underline text-sm dark:text-blue-300"
              >
                Skip this
              </button>

              {current === quizData.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setCurrent(prev => Math.min(prev + 1, quizData.length - 1))}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {submitted && analysis && (
        <div className="relative mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <button
            onClick={closeQuiz}
            className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-sm"
          >
            ✖ Close
          </button>
          <h3 className="text-center font-semibold text-green-700 dark:text-green-400 mb-2">
            📊 Your Performance
          </h3>
          <ul className="text-gray-800 dark:text-white space-y-1 text-sm">
            <li>✅ Score: {score} / {analysis.total}</li>
            <li>📝 Attempted: {analysis.attempted}</li>
            <li>🎯 Accuracy: {analysis.percentage}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}
