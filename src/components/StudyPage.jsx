import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { MdSettingsSuggest, MdVolumeUp, MdVolumeOff, MdFullscreen, MdFullscreenExit } from "react-icons/md";
export default function StudyLecturePlayer({ videoId }) {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
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

    const onPlayerReady = (event) => {
        playerRef.current = event.target;

        // Wait for the duration to actually become available
        const checkDuration = setInterval(() => {
            const d = event.target.getDuration();
            if (d > 0) {
                setDuration(d);
                clearInterval(checkDuration);
            }
        }, 200);
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
        if (playerRef.current) {
            playerRef.current.seekTo(time, true);
        }
        setCurrentTime(time);
    };

    const addBookmark = () => {
        if (!playerRef.current) return;
        const time = playerRef.current.getCurrentTime();
        setBookmarks([...bookmarks, time]);
    };
    const handleSpeedChange = (e) => {
        const rate = parseFloat(e.target.value);
        setPlaybackRate(rate);
        if (playerRef.current) {
            playerRef.current.setPlaybackRate(rate);
        }
    };
    const handleVolumeChange = (e) => {
        const vol = parseInt(e.target.value);
        setVolume(vol);
        if (playerRef.current) {
            playerRef.current.setVolume(vol);
        }
    }
    const formatTime = (t) => {
        const min = String(Math.floor(t / 60)).padStart(2, '0');
        const sec = String(Math.floor(t % 60)).padStart(2, '0');
        return `${min}:${sec}`;
    };
    const onStateChange = (event) => {
        const state = event.data;
        setIsPlaying(state === 1); // 1 is PLAYING
    };

    useEffect(() => {
        const volumeSync = setInterval(() => {
            if (playerRef.current) {
                const actualVolume = playerRef.current.getVolume();
                setVolume(actualVolume);
                setIsMuted(actualVolume === 0);
            }
        }, 500);

        return () => clearInterval(volumeSync);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current) {
                const ct = playerRef.current.getCurrentTime();
                setCurrentTime(ct);
                if (
                    isLooping &&
                    loopStart !== null &&
                    loopEnd !== null &&
                    ct >= loopEnd
                ) {
                    playerRef.current.seekTo(loopStart);
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [loopStart, loopEnd, isLooping]);

    const percentage = duration ? Math.floor((currentTime / duration) * 100) : 0;

    useEffect(() => {
        const handleKeyDown = (e) => {
            const player = playerRef.current;
            if (!player) return;

            switch (e.key.toLowerCase()) {
                case 'm': // Mute/Unmute
                    const currentVol = player.getVolume();
                    player.setVolume(currentVol === 0 ? volume : 0);
                    break;
                case 'f': // Fullscreen toggle
                    const container = player.getIframe()?.parentElement;
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else if (container?.requestFullscreen) {
                        container.requestFullscreen();
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [volume]);

    return (
        <div className="relative w-full aspect-video rounded overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <YouTube
                    videoId={videoId}
                    className="w-full h-full"
                    onReady={onPlayerReady}
                    onStateChange={onStateChange}
                    opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                        },
                    }}
                />
            </div>
            <div className="absolute top-2 right-4 bg-purple-600 text-white px-2 py-1 text-xs rounded-full font-semibold">
                {percentage}% watched
            </div>
            {/* Controls Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end pointer-events-none z-10">
                <div className="bg-blue-100/60 p-4  pointer-events-auto  rounded-t-xl">

                    {/* Timeline */}
                    <div>
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            step={0.1}
                            onChange={handleSeek}
                            className="w-full accent-blue-800"
                        />

                    </div>

                    {/* Group A: Playback, Volume, Speed */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <button onClick={togglePlay} className="bg-purple-600 px-4 py-1 rounded text-sm">
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <div className="flex justify-between text-xs text-violet-700 mt-1 px-1 font-mono">
                            <span>{formatTime(currentTime)}</span>/
                            <span>{formatTime(duration)}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    if (!playerRef.current) return;
                                    const currentVol = playerRef.current.getVolume();
                                    const muted = currentVol === 0;
                                    setIsMuted(!muted);
                                    playerRef.current.setVolume(muted ? volume : 0);
                                }}
                                className="hover:text-red-400 text-2xl"
                            >
                                {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-32"
                            />
                        </div>
                        <select
                            value={playbackRate}
                            onChange={handleSpeedChange}
                            className="bg-gray-800 text-white text-sm rounded px-2 py-1"
                        >
                            {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                                <option key={rate} value={rate}>{rate}x</option>
                            ))}
                        </select>


                        <button onClick={() => setShowAdvanced(p => !p)} className="hover:text-blue-400">
                            <MdSettingsSuggest className='text-3xl' />
                        </button>
                        <button
                            onClick={() => {
                                const container = playerRef.current?.getIframe()?.parentElement;
                                if (document.fullscreenElement) {
                                    document.exitFullscreen();
                                    setIsFullscreen(false);
                                } else if (container?.requestFullscreen) {
                                    container.requestFullscreen();
                                    setIsFullscreen(true);
                                }
                            }}
                            className="hover:text-yellow-400 text-2xl"
                        >
                            {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                        </button>
                    </div>
                </div>

                {/* Advanced Controls Dropdown */}


                {showAdvanced && (
                    <div className="absolute right-0 mb-15 w-max  backdrop-blur-md rounded shadow-lg z-20 flex flex-col items-center pointer-events-auto gap-2 px-4 py-2">
                        <button onClick={() => setLoopStart(currentTime)} className="bg-blue-600 px-3 py-1 rounded">
                            ⏱ Start: {loopStart ? formatTime(loopStart) : '--:--'}
                        </button>
                        <button onClick={() => setLoopEnd(currentTime)} className="bg-blue-600 px-3 py-1 rounded">
                            ⏱ End: {loopEnd ? formatTime(loopEnd) : '--:--'}
                        </button>
                        <button
                            onClick={() => setIsLooping(!isLooping)}
                            className={`px-3 py-1 rounded ${isLooping ? 'bg-green-600' : 'bg-gray-600'}`}
                        >
                            {isLooping ? 'Looping On' : 'Looping Off'}
                        </button>
                        <button onClick={addBookmark} className="bg-yellow-500 text-black px-3 py-1 rounded">
                            ⭐ Add Bookmark
                        </button>
                        <div className="flex flex-wrap gap-2 ml-2">
                            {bookmarks.map((time, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => playerRef.current && playerRef.current.seekTo(time)}
                                    className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 text-xs"
                                >
                                    🔖 {formatTime(time)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}
