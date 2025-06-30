import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StudyLecturePlayer from '../components/StudyPage';
const notesContent = `\
## Key Concepts\n\n- Topic 1: Introduction and overview.\n- Topic 2: Important formulas and examples.\n- Topic 3: Common mistakes to avoid.\n\n### Tips\n- Review the notes before attempting the quiz.\n- Pause the video to take notes.\n`;

const quizQuestions = [
    {
        question: 'Which of the following is true about NIMCET?',
        options: [
            'It is for MBA admissions',
            'It is for MCA admissions',
            'It is for B.Tech admissions',
            'It is for PhD admissions',
        ],
        answer: 1,
    },
    {
        question: 'What is the duration of the NIMCET exam?',
        options: ['1 hour', '2 hours', '3 hours', '4 hours'],
        answer: 1,
    },
];

export default function LectureViewPage() {
    const [selected, setSelected] = useState(Array(quizQuestions.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoLink = searchParams.get("video") || "https://www.youtube.com/embed/1O1Vn2y7tQw";
    const videoId = videoLink.includes("embed/") ? videoLink.split("embed/")[1].split(/[?&]/)[0] : videoLink
    const handleOptionChange = (qIdx, optIdx) => {
        if (!submitted) {
            const updated = [...selected];
            updated[qIdx] = optIdx;
            setSelected(updated);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let sc = 0;
        selected.forEach((ans, idx) => {
            if (ans === quizQuestions[idx].answer) sc++;
        });
        setScore(sc);
        setSubmitted(true);
    };

    return (
        <div className="w-full px-0 py-10">
            {/* Top Section: Video + Notes */}
            <div className="flex flex-col lg:flex-row gap-8 mb-10 ml-3 mr-3 md:ml-8">
                {/* Video */}
                <div className="w-full lg:w-[70%]  bg-black rounded-xl overflow-hidden shadow flex-shrink-0">
                    {/* <iframe
                        className="w-full h-full"
                        src={videoLink}
                        title="Lecture Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe> */}
                    <StudyLecturePlayer videoId={videoId} />
                </div>
                {/* Notes */}
                <div className="w-full lg:w-[30%] bg-white dark:bg-gray-800 shadow rounded-xl p-6 overflow-y-auto max-h-[420px] mr-2 md:mr-4">
                    <h2 className="text-xl font-bold text-purple-600 mb-4">Lecture Notes</h2>
                    <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 text-base whitespace-pre-wrap">
                        {notesContent}
                    </div>
                </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <h2 className="text-xl font-bold text-purple-600 mb-4">Quiz</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        {quizQuestions.map((q, qIdx) => (
                            <div key={qIdx} className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 shadow">
                                <p className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{qIdx + 1}. {q.question}</p>
                                <div className="space-y-2">
                                    {q.options.map((opt, optIdx) => (
                                        <label key={optIdx} className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
                                            <input
                                                type="radio"
                                                name={`q${qIdx}`}
                                                value={optIdx}
                                                checked={selected[qIdx] === optIdx}
                                                onChange={() => handleOptionChange(qIdx, optIdx)}
                                                disabled={submitted}
                                                className="accent-purple-600"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!submitted ? (
                        <button
                            type="submit"
                            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <div className="mt-6 text-lg font-bold text-green-600 dark:text-green-400">
                            Your Score: {score} / {quizQuestions.length}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
