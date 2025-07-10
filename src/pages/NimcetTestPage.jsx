import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaFlag, FaEraser, FaSignOutAlt, FaPaperPlane } from 'react-icons/fa';
import TestAnalysis from '../components/TestAnalysis';

const questions = [
    // Mathematics
    {
        id: 1,
        subject: 'Mathematics',
        question: 'If f(x) = x^n, then f(1) + f\'(1)/1! + f\'\'(1)/2! + ... + f^(n)(1)/n! is equal to:',
        options: ['0', '2^n', '2^{n-1}', 'n(n+1)/2'],
    },
    {
        id: 2,
        subject: 'Mathematics',
        question: 'The value of the determinant |1 2 3; 2 3 4; 3 4 5| is:',
        options: ['0', '1', '2', '-1'],
    },
    {
        id: 3,
        subject: 'Mathematics',
        question: 'If A = {1, 2, 3}, then number of binary relations on A × A is:',
        options: ['2^9', '2^6', '2^3', '2^5'],
    },

    // Reasoning
    {
        id: 4,
        subject: 'Reasoning',
        question: 'Find the missing number: 4, 9, 16, 25, ?, 49',
        options: ['36', '30', '38', '42'],
    },
    {
        id: 5,
        subject: 'Reasoning',
        question: 'If "HOSPITAL" is written as "32574618", how will you write "SLIP"?',
        options: ['6584', '6548', '6258', '6184'],
    },
    {
        id: 6,
        subject: 'Reasoning',
        question: 'Find the odd one out: Apple, Mango, Banana, Carrot, Guava',
        options: ['Apple', 'Mango', 'Banana', 'Carrot'],
    },

    // Computer Awareness
    {
        id: 7,
        subject: 'Computer',
        question: 'Which of the following is not an operating system?',
        options: ['Windows', 'Linux', 'Oracle', 'macOS'],
    },
    {
        id: 8,
        subject: 'Computer',
        question: 'Which data structure uses LIFO?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
    },
    {
        id: 9,
        subject: 'Computer',
        question: 'What is the binary equivalent of decimal number 13?',
        options: ['1101', '1011', '1110', '1001'],
    },
];

const totalQuestions = questions.length;

export default function NimcetTestPage() {
    const [started, setStarted] = useState(false);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(Array(totalQuestions).fill(null));
    const [marked, setMarked] = useState([]);
    const [timer, setTimer] = useState(30 * 60); // 30 min
    const [showSummary, setShowSummary] = useState(false);
    const [showLeave, setShowLeave] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [testEndTime, setTestEndTime] = useState(null);
    const [finalDuration, setFinalDuration] = useState('00:00');
    const handleSubmit = () => setShowSummary(true);
    const handleCancelSummary = () => setShowSummary(false);
    const handleFinalSubmit = () => {
        setShowSummary(false);
        setShowAnalysis(true);
        // Calculate and store duration at submit time
        const elapsed = 30 * 60 - timer; // seconds elapsed
        const min = Math.floor(elapsed / 60);
        const sec = elapsed % 60;
        setFinalDuration(`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`);
    };
    const handleLeave = () => setShowLeave(true);
    const handleCancelLeave = () => setShowLeave(false);
    const handleConfirmLeave = () => {
        setShowLeave(false);
        window.location.href = '/';
    };

    useEffect(() => {
        if (!started) return;
        if (timer > 0) {
            const t = setInterval(() => setTimer((tm) => tm - 1), 1000);
            return () => clearInterval(t);
        }
    }, [started, timer]);

    const handleStart = () => setStarted(true);
    const handleSelect = (idx) => {
        setSelected((prev) => {
            const copy = [...prev];
            copy[current] = idx;
            return copy;
        });
    };
    const handleMark = () => {
        setMarked((prev) =>
            prev.includes(current) ? prev.filter((i) => i !== current) : [...prev, current]
        );
    };
    const handleClear = () => handleSelect(null);
    const handlePrev = () => setCurrent((c) => (c > 0 ? c - 1 : c));
    const handleNext = () => setCurrent((c) => (c < totalQuestions - 1 ? c + 1 : c));
    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    // Section list for summary
    const sectionList = ['Mathematics', 'Reasoning', 'Computer'];

    // Compute summary counts
    const summary = sectionList.map(section => {
        const qIdxs = questions.map((q, idx) => ({ ...q, idx })).filter(q => q.subject === section);
        let answered = 0, unattempted = 0, markedNotAnswered = 0, markedAnswered = 0;
        qIdxs.forEach(q => {
            const isAnswered = selected[q.idx] !== null;
            const isMarked = marked.includes(q.idx);
            if (isAnswered && isMarked) markedAnswered++;
            else if (!isAnswered && isMarked) markedNotAnswered++;
            else if (isAnswered) answered++;
            else unattempted++;
        });
        return {
            section,
            answered,
            unattempted,
            markedNotAnswered,
            markedAnswered,
            total: qIdxs.length
        };
    });

    // Modal summary card
    const renderSummaryModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: 'blur(2px)', background: 'rgba(0,0,0,0.25)' }}>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-fadeIn">
                <button onClick={handleCancelSummary} className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
                <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">Are you absolutely sure?</h2>
                <p className="mb-4 text-gray-500 dark:text-gray-300 text-sm">This action cannot be undone. This will submit your test in your records permanently.</p>
                <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Category-wise Summary (Transposed)</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-center text-sm">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="border px-2 py-1 font-semibold">Status</th>
                                    {sectionList.map(sec => (
                                        <th key={sec} className="border px-2 py-1 font-semibold">{sec}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-2 py-1 font-medium">Answered</td>
                                    {summary.map(s => <td key={s.section} className="border px-2 py-1 text-green-600">{s.answered}</td>)}
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1 font-medium">Unattempted</td>
                                    {summary.map(s => <td key={s.section} className="border px-2 py-1 text-red-500">{s.unattempted}</td>)}
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1 font-medium">Marked (Not Answered)</td>
                                    {summary.map(s => <td key={s.section} className="border px-2 py-1 text-sky-600">{s.markedNotAnswered}</td>)}
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1 font-medium">Marked (Answered)</td>
                                    {summary.map(s => <td key={s.section} className="border px-2 py-1 text-yellow-600">{s.markedAnswered}</td>)}
                                </tr>
                                <tr className="bg-gray-50 dark:bg-gray-800">
                                    <td className="border px-2 py-1 font-semibold">Total</td>
                                    {summary.map(s => <td key={s.section} className="border px-2 py-1 font-semibold">{s.total}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={handleCancelSummary} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold">Cancel</button>
                    <button onClick={handleFinalSubmit} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">Submit</button>
                </div>
            </div>
        </div>
    );

    // Modal for leave confirmation
    const renderLeaveModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: 'blur(2px)', background: 'rgba(0,0,0,0.25)' }}>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
                <button onClick={handleCancelLeave} className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Leave Test?</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-300 text-sm">Are you sure you want to leave? Your progress will be lost.</p>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={handleCancelLeave} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold">Cancel</button>
                    <button onClick={handleConfirmLeave} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold">Leave</button>
                </div>
            </div>
        </div>
    );

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-xl w-full">
                    <h1 className="text-2xl font-bold mb-4 text-indigo-700">NIMCET Practice Exam Instructions</h1>
                    <ul className="list-disc pl-6 mb-6 text-left text-gray-700 dark:text-gray-200">
                        <li>Do not refresh or close the tab during the test.</li>
                        <li>Read each question carefully before answering.</li>
                        <li>Use the navigation panel to move between questions.</li>
                        <li>Mark questions for review if needed.</li>
                        <li>Click Submit when you are finished.</li>
                    </ul>
                    <button onClick={handleStart} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold w-full transition">Start Test</button>
                </div>
            </div>
        );
    }

    if (showAnalysis) {
        return <TestAnalysis questions={questions} selected={selected} marked={marked} duration={finalDuration} onGoToTests={() => window.location.href = '/'} onShowSolutions={() => alert('Show solutions!')} />;
    }

    return (
        <>
            {showSummary && renderSummaryModal()}
            {showLeave && renderLeaveModal()}
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
    {/* Main test area */}
    <div className="w-full lg:w-3/4 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-8 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <button onClick={handleLeave} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold text-sm mb-2 sm:mb-0"><FaSignOutAlt className='inline mr-1' /> Leave</button>
            <span className="font-bold text-md lg:text-lg text-indigo-700 order-first w-full sm:w-auto sm:order-none text-center mb-2 sm:mb-0">NIMCET PRACTICE 2007</span>
            <span className="text-gray-700 dark:text-gray-200 font-semibold text-sm">Time Left: <span className="font-mono">{formatTime(timer)}</span></span>
            <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg font-semibold text-sm mt-2 sm:mt-0">Submit<FaPaperPlane className='inline ml-1' /></button>
        </div>

        {/* Main question area */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg rounded-xl flex flex-col justify-center">
                <div className="mb-4 text-gray-800 dark:text-gray-100 font-semibold text-xl sm:text-2xl">Question {current + 1}:</div>
                <div className="mb-6 text-gray-700 dark:text-gray-200 text-base sm:text-lg min-h-[50px] sm:min-h-[60px]">{questions[current].question}</div>
                <div className="space-y-3 sm:space-y-5">
                    {questions[current].options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`block w-full text-left px-4 py-3 sm:px-6 sm:py-4 rounded-lg border-2 transition text-base sm:text-lg
                                ${selected[current] === idx ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500 font-bold' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600'}
                            `}
                        >
                            {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-12 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full flex items-center text-sm sm:text-lg mb-2 sm:mb-0"><FaArrowLeft className="mr-2" /> Prev</button>
            <button onClick={handleMark} className={`px-4 py-2 rounded-full flex items-center font-semibold text-sm sm:text-lg ${marked.includes(current) ? 'bg-yellow-400 text-white' : 'bg-yellow-200 text-yellow-900'}`}><FaFlag className="mr-2" /> Mark</button>
            <span className="text-gray-700 dark:text-gray-200 font-semibold text-sm sm:text-lg order-first w-full sm:w-auto sm:order-none text-center mb-2 sm:mb-0">{current + 1} / {totalQuestions}</span>
            <button onClick={handleClear} className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-full flex items-center text-sm sm:text-lg"><FaEraser className="mr-2" /> Clear</button>
            <button onClick={handleNext} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full flex items-center text-sm sm:text-lg mb-2 sm:mb-0">Next <FaArrowRight className="ml-2" /></button>
        </div>
    </div>

    {/* Navigation column */}
    <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-4 border-l-0 lg:border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="text-center py-2 bg-white dark:bg-gray-800 border-b border-gray-400 dark:border-gray-700 mb-1">
            <span className="text-gray-700 dark:text-gray-200 font-bold">Review and Summary</span>
        </div>
        <div className="my-2 p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg shadow text-left">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-200 mb-2 text-base">Tips</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
                <li>Do not refresh or close the tab.</li>
                <li>Use the navigation panel to move between questions.</li>
            </ul>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-400 border border-green-500"></span>
                <span className="text-sm">Answered</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300"></span>
                <span className="text-sm">Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-sky-600 border border-sky-500"></span>
                <span className="text-sm">Marked</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500 border border-yellow-600"></span>
                <span className="text-sm">Answered & Marked</span>
            </div>
        </div>

        {/* Sectioned question navigation */}
        <div className="mt-4 flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {['Mathematics', 'Reasoning', 'Computer'].map((section) => (
                <div key={section}>
                    <h3 className="font-bold text-indigo-600 dark:text-indigo-300 mb-2 text-lg pl-1">{section}</h3>
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-5 gap-2">
                        {questions
                            .map((q, idx) => ({ ...q, idx }))
                            .filter(q => q.subject === section)
                            .map(q => {
                                const isAnswered = selected[q.idx] !== null;
                                const isMarked = marked.includes(q.idx);
                                let buttonClass = 'bg-gray-200 border-gray-300 text-gray-700';
                                if (isAnswered && isMarked) buttonClass = 'bg-yellow-500 border-yellow-600 text-white';
                                else if (isMarked) buttonClass = 'bg-sky-600 border-sky-500 text-white';
                                else if (isAnswered) buttonClass = 'bg-green-400 border-green-500 text-green-900';
                                
                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => setCurrent(q.idx)}
                                        className={`w-8 h-8 rounded-full border font-semibold text-xs transition-colors ${buttonClass} ${current === q.idx ? 'ring-2 ring-indigo-500' : ''}`}
                                        title={`Q${q.idx + 1}`}
                                    >
                                        {q.idx + 1}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

        </>
    );
}
