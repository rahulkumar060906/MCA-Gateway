import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import {
    MdSettingsSuggest, MdVolumeUp, MdVolumeOff,
    MdFullscreen, MdFullscreenExit, MdPlayArrow, MdPause, MdNote
} from 'react-icons/md';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import QuizCard from './QuizCard';
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
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState(localStorage.getItem(`notes-${videoId}`) || '');
    const [quizEnabled, setQuizEnabled] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [triggeredQuizzes, setTriggeredQuizzes] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [analytics, setAnalytics] = useState(null);
    const [showAnalytics, setShowAnalytics] = useState(false);

    const quizTimestamps = [15, 45, 90];

    const questions = [
        {
            q: 'What is the capital of India?',
            options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
            answer: 1
        },
        {
            q: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            answer: 1
        },
        {
            q: 'React is a...',
            options: ['Library', 'Framework', 'Database', 'Language'],
            answer: 0
        }
    ];

    const COLORS = ['#4ade80', '#facc15'];

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

    const handleOptionChange = (e) => {
        setSelectedOptions({
            ...selectedOptions,
            [currentQuestion]: parseInt(e.target.value)
        });
    };

    const handleAnswer = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(q => q + 1);
        } else {
            setShowQuiz(false);
            setCurrentQuestion(0);
            setQuizCompleted(true);
            playerRef.current?.pauseVideo();

            const correct = questions.filter((q, idx) => q.answer === selectedOptions[idx]).length;
            const attempted = Object.keys(selectedOptions).length;

            setAnalytics([
                { name: 'Correct', value: correct },
                { name: 'Attempted', value: attempted - correct }
            ]);
        }
    };

    return (
        <div className="flex max-w-full max-h-full">
            {/* Video/Quiz/Controls container */}
            <div ref={fullscreenRef} className={`relative aspect-video rounded overflow-hidden bg-black flex-1 transition-all duration-300 ${showNotes ? 'sm:w-2/3 w-full' : 'w-full'}`}>
                {/* Video player container, always fills parent */}
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

                <div className="absolute bottom-0 left-0 right-0 z-10 bg-violet-100/90">
                    <input
                        type="range"
                        min={0}
                        max={duration || 1}
                        value={currentTime || 0}
                        step={0.1}
                        onChange={handleSeek}
                        className="w-full accent-blue-700"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2 text-xs sm:text-sm">
                        <button onClick={togglePlay} className="text-xl">
                            {isPlaying ? <MdPause /> : <MdPlayArrow />}
                        </button>
                        <span className="font-mono text-violet-700">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                        <button onClick={toggleMute} className="text-xl">
                            {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                        </button>
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

                        <button onClick={() => setShowNotes(p => !p)} className="text-xl">
                            <MdNote />
                        </button>
                        <label className="text-xs flex items-center gap-1">
                            <input type="checkbox" checked={quizEnabled} onChange={() => setQuizEnabled(p => !p)} /> Enable Quiz
                        </label>
                        <details>
                            <summary className="cursor-pointer text-sm text-violet-700 hover:text-violet-900">Advanced</summary>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-white bg-black/80 p-2 rounded">
                                <button onClick={() => setLoopStart(currentTime)} className="bg-blue-600 px-2 py-1 rounded">
                                    ⏱ Start: {loopStart ? formatTime(loopStart) : '--:--'}
                                </button>
                                <button onClick={() => setLoopEnd(currentTime)} className="bg-blue-600 px-2 py-1 rounded">
                                    ⏱ End: {loopEnd ? formatTime(loopEnd) : '--:--'}
                                </button>
                                <button
                                    onClick={() => setIsLooping(!isLooping)}
                                    className={`px-2 py-1 rounded ${isLooping ? 'bg-green-600' : 'bg-gray-600'}`}
                                >
                                    {isLooping ? 'Looping On' : 'Looping Off'}
                                </button>
                                {bookmarks.map((time, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => playerRef.current?.seekTo(time)}
                                        className="bg-yellow-500 text-black px-2 py-1 rounded"
                                    >
                                        ⭐ {formatTime(time)}
                                    </button>
                                ))}
                            </div>
                        </details>
                        <button onClick={toggleFullscreen} className="text-xl">
                            {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                        </button>
                    </div>
                </div>

                {showQuiz && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white p-4 rounded shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">Quiz</h2>
                            <QuizCard />
                        </div>
                    </div>
                )}
            </div>
            {/* Notes panel, outside video container */}
            {showNotes && (
                <div className="relative w-1/3 h-full bg-white z-20 p-4 shadow-lg overflow-auto transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">📝 Your Notes</h2>
                        <button
                            onClick={() => setShowNotes(false)}
                            className="text-sm px-2 py-1 bg-red-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                    <textarea
                        className="w-full flex-1 border border-gray-300 p-2 rounded text-sm resize-none"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here..."
                    />
                </div>
            )}
        </div>
    );
}
