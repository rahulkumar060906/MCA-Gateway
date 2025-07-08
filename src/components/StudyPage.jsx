import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import {
    MdSettingsSuggest, MdVolumeUp, MdVolumeOff,
    MdFullscreen, MdFullscreenExit, MdPlayArrow, MdPause, MdNote
} from 'react-icons/md';
import QuizCard from './QuizCard';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function StudyLecturePlayer({ videoId }) {
    const playerRef = useRef(null);
    const fullscreenRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [lastVolume, setLastVolume] = useState(100);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopStart, setLoopStart] = useState(null);
    const [loopEnd, setLoopEnd] = useState(null);
    const [isLooping, setIsLooping] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState(localStorage.getItem(`notes-${videoId}`) || '');
    const [quizEnabled, setQuizEnabled] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [triggeredQuizzes, setTriggeredQuizzes] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [analytics, setAnalytics] = useState(null);
    const quizTimestamps = [15, 45, 90];
    const quizData = [
        {
            question: 'What is the value of \\( \\int x^2 \\, dx \\)?',
            options: ['\\( \\frac{x^3}{3} + C \\)', '\\( x^3 + C \\)', '\\( \\frac{x^2}{2} + C \\)', '\\( \\frac{x^4}{4} + C \\)'],
            answer: [0],
            explanation: 'The integral of \\( x^n \\) is \\( \\frac{x^{n+1}}{n+1} + C \\).'
        },
        {
            question: 'What is the value of \\( \\sin 30^\\circ \\)?',
            options: ['\\( \\frac{1}{2} \\)', '\\( \\frac{\\sqrt{3}}{2} \\)', '1', '0'],
            answer: [0],
            explanation: 'The sine of \\( 30^\\circ \\) is \\( \\frac{1}{2} \\).'
        }
    ];

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        const checkDuration = setInterval(() => {
            const d = event.target.getDuration();
            if (d > 0) {
                setDuration(d);
                clearInterval(checkDuration);
            }
        }, 200);

        const savedProgress = localStorage.getItem(`progress-${videoId}`);
        if (savedProgress) {
            playerRef.current.seekTo(parseFloat(savedProgress));
        }
    };

    const togglePlay = () => {
        const player = playerRef.current;
        if (!player) return;
        const state = player.getPlayerState();
        state === 1 ? player.pauseVideo() : player.playVideo();
        setIsPlaying(state !== 1);
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        if (playerRef.current) playerRef.current.seekTo(time, true);
        setCurrentTime(time);
    };

    const handleSpeedChange = (e) => {
        const rate = parseFloat(e.target.value);
        setPlaybackRate(rate);
        if (playerRef.current) playerRef.current.setPlaybackRate(rate);
    };

    const handleVolumeChange = (e) => {
        const vol = parseInt(e.target.value);
        setVolume(vol);
        if (playerRef.current) playerRef.current.setVolume(vol);
        setIsMuted(vol === 0);
    };

    const toggleMute = () => {
        if (!playerRef.current) return;
        const currentVol = playerRef.current.getVolume();
        if (currentVol === 0) {
            playerRef.current.setVolume(lastVolume);
            setIsMuted(false);
        } else {
            setLastVolume(currentVol);
            playerRef.current.setVolume(0);
            setIsMuted(true);
        }
    };

    const toggleFullscreen = async () => {
        const el = fullscreenRef.current;
        if (!el) return;
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            await el.requestFullscreen();
            setIsFullscreen(true);
            if (screen.orientation?.lock) {
                try {
                    await screen.orientation.lock("landscape");
                } catch { }
            }
        }
    };

    const formatTime = (t) => {
        const min = String(Math.floor(t / 60)).padStart(2, '0');
        const sec = String(Math.floor(t % 60)).padStart(2, '0');
        return `${min}:${sec}`;
    };

    useEffect(() => {
        const sync = setInterval(() => {
            if (playerRef.current) {
                const ct = playerRef.current.getCurrentTime();
                setCurrentTime(ct);
                localStorage.setItem(`progress-${videoId}`, ct);

                const rounded = Math.floor(ct);
                if (quizEnabled && quizTimestamps.includes(rounded) && !triggeredQuizzes.includes(rounded)) {
                    setTriggeredQuizzes(prev => [...prev, rounded]);
                    setShowQuiz(true);
                    playerRef.current.pauseVideo();
                }

                if (isLooping && loopStart !== null && loopEnd !== null && ct >= loopEnd) {
                    playerRef.current.seekTo(loopStart);
                }
            }
        }, 500);
        return () => clearInterval(sync);
    }, [loopStart, loopEnd, isLooping, quizEnabled, triggeredQuizzes]);

    useEffect(() => {
        const keyHandler = (e) => {
            if (e.key.toLowerCase() === 'm') toggleMute();
            if (e.key.toLowerCase() === 'f') toggleFullscreen();
        };
        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
    }, [lastVolume]);

    useEffect(() => {
        localStorage.setItem(`notes-${videoId}`, notes);
    }, [notes]);

    const percentage = duration ? Math.floor((currentTime / duration) * 100) : 0;

    return (
        <div className="flex flex-col sm:flex-row w-full max-h-screen px-4 py-3 gap-4 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Video Container */}
            <div
                ref={fullscreenRef}
                className={`relative aspect-video w-full sm:flex-1 mx-auto rounded overflow-hidden bg-black transition-all duration-300 ${showNotes ? 'sm:w-2/3' : 'w-full'
                    }`}
                style={{
                    maxHeight: '80vh',
                    maxWidth: '80vw',
                }}
            >
                <div className="relative w-full h-full">
                    <YouTube
                        videoId={videoId}
                        className="w-full h-full"
                        onReady={onPlayerReady}
                        opts={{
                            width: "100%",
                            height: "100%",
                            playerVars: { controls: 0, modestbranding: 1, rel: 0 }
                        }}
                    />
                </div>

                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {percentage}% watched
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 bg-violet-100/90 dark:bg-gray-800/90">
                    <input
                        type="range"
                        min={0}
                        max={duration || 1}
                        value={currentTime || 0}
                        step={0.1}
                        onChange={handleSeek}
                        className="w-full accent-blue-700 dark:accent-blue-300"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2 text-xs sm:text-sm">
                        <button onClick={togglePlay} className="text-xl">{isPlaying ? <MdPause /> : <MdPlayArrow />}</button>
                        <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                        <button onClick={toggleMute} className="text-xl">{isMuted ? <MdVolumeOff /> : <MdVolumeUp />}</button>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume ?? 100}
                            onChange={handleVolumeChange}
                            className="w-20 sm:w-32"
                        />
                        <select
                            value={playbackRate}
                            onChange={handleSpeedChange}
                            className="bg-gray-800 text-white rounded px-2 py-1"
                        >
                            {[0.5, 1, 1.25, 1.5, 2].map(rate => (
                                <option key={rate} value={rate}>{rate}x</option>
                            ))}
                        </select>
                        <button onClick={() => setShowNotes(p => !p)} className="text-xl"><MdNote /></button>
                        <label className="text-xs flex items-center gap-1">
                            <input type="checkbox" checked={quizEnabled} onChange={() => setQuizEnabled(p => !p)} /> Quiz
                        </label>
                        <details>
                            <summary className="cursor-pointer">Advanced</summary>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs dark:text-white bg-black/80 p-2 rounded">
                                <button onClick={() => setLoopStart(currentTime)} className="bg-blue-600 px-2 py-1 rounded">⏱ Start</button>
                                <button onClick={() => setLoopEnd(currentTime)} className="bg-blue-600 px-2 py-1 rounded">⏱ End</button>
                                <button onClick={() => setIsLooping(!isLooping)} className={`px-2 py-1 rounded ${isLooping ? 'bg-green-600' : 'bg-gray-600'}`}>
                                    {isLooping ? 'Loop On' : 'Loop Off'}
                                </button>
                                {bookmarks.map((time, idx) => (
                                    <button key={idx} onClick={() => playerRef.current?.seekTo(time)} className="bg-yellow-500 text-black px-2 py-1 rounded">⭐ {formatTime(time)}</button>
                                ))}
                            </div>
                        </details>
                        <button onClick={toggleFullscreen} className="text-xl">{isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}</button>
                    </div>
                </div>

                {showQuiz && (
                    <div className="absolute inset-0 bg-black/70 z-40 flex items-center justify-center px-4">
                        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg shadow-xl w-full max-w-xl">
                            {!quizCompleted ? (
                                <>
                                    {!quizStarted ? (
                                        <>
                                            <h2 className="text-xl font-bold mb-3">📘 Enough learning for now?</h2>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                                                Let's test your knowledge and solidify what you've learned.
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={() => setQuizStarted(true)}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                                >
                                                    ✅ Yes, I’m ready!
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowQuiz(false);
                                                        playerRef.current?.playVideo();
                                                    }}
                                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded"
                                                >
                                                    ❌ No, continue watching
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <QuizCard
                                            question={quizData[triggeredQuizzes.length - 1]}
                                            onComplete={(correct, attempted) => {
                                                setQuizCompleted(true);
                                                setAnalytics([
                                                    { name: 'Correct', value: correct },
                                                    { name: 'Incorrect', value: attempted - correct },
                                                ]);
                                            }}
                                            onClose={() => {
                                                setShowQuiz(false);
                                                setQuizStarted(false);
                                                setQuizCompleted(false);
                                                setAnalytics(null);
                                                playerRef.current?.playVideo();
                                            }}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <h3 className="text-center font-semibold text-lg text-green-600 dark:text-green-400">🎯 Quiz Results</h3>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={analytics}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={60}
                                                dataKey="value"
                                                label
                                            >
                                                <Cell fill="#10B981" />
                                                <Cell fill="#EF4444" />
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                setShowQuiz(false);
                                                setQuizStarted(false);
                                                setQuizCompleted(false);
                                                setAnalytics(null);
                                                playerRef.current?.playVideo();
                                            }}
                                            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                        >
                                            🚀 Continue Watching
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>

            {/* Notes */}
            {showNotes && (
                <div className="relative w-full sm:w-1/3 bg-white dark:bg-gray-800 z-20 p-4 shadow-lg overflow-auto transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">📝 Notes</h2>
                        <button onClick={() => setShowNotes(false)} className="text-sm px-2 py-1 bg-red-500 text-white rounded">Close</button>
                    </div>
                    <textarea
                        className="w-full flex-1 border border-gray-300 dark:border-gray-600 p-2 rounded text-sm bg-white dark:bg-gray-900 text-black dark:text-white resize-none"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here..."
                    />
                </div>
            )}
        </div>
    );
}
