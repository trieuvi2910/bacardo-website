"use client";
import { useState, useEffect, useRef } from "react";

interface Track {
    id: number;
    title: string;
    artist: string;
    file: string;
    duration: string;
}

export default function Tokenomics() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const playlistRef = useRef<HTMLDivElement>(null);

    // Playlist data
    const playlist: Track[] = [
        { id: 1, title: "APE IN HARD", artist: "Bardo", file: "/music/1 APE IN HARD.mp3", duration: "0:55" },
        { id: 2, title: "JAKE & RODNEY JRo", artist: "Bardo", file: "/music/4 JAKE & RODNEY JRo.mp3", duration: "1:19" },
        { id: 3, title: "MEME REVOLUTION", artist: "Bardo", file: "/music/5 MEME REVOLUTION.mp3", duration: "0:55" },
        { id: 4, title: "BLOCKCHAIN ANTHEM", artist: "Bardo", file: "/music/7 BLOCKCHAIN ANTHEM.mp3", duration: "0:42" },
        { id: 5, title: "ROCKSTAR IN YOUR HOMETOWN", artist: "Bardo", file: "/music/9 ROCKSTAR IN YOUR HOMETOWN.mp3", duration: "1:11" },
    ];

    // Lock/unlock body scroll when playlist is open
    useEffect(() => {
        if (showPlaylist) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showPlaylist]);

    // Handle ESC key to close playlist
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && showPlaylist) {
                setShowPlaylist(false);
            }
        };
        if (showPlaylist) {
            document.addEventListener("keydown", handleEscKey);
        }
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [showPlaylist]);

    // Handle click outside to close playlist
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (playlistRef.current && !playlistRef.current.contains(event.target as Node)) {
                setShowPlaylist(false);
            }
        };
        if (showPlaylist) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPlaylist]);

    // Audio playback logic
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => handleNext();

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    // Auto-play first track when component first loads
    useEffect(() => {
        const audio = audioRef.current;
        if (audio && playlist.length > 0) {
            audio.src = playlist[0].file;
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                    setCurrentTrackIndex(0);
                })
                .catch((error) => {
                    console.log("Auto-play prevented by browser:", error);
                    // Set the first track as current even if auto-play is blocked
                    setCurrentTrackIndex(0);
                });
        }
    }, []); // Empty dependency array means this runs only once on mount

    const playTrack = (index: number) => {
        setCurrentTrackIndex(index);
        const audio = audioRef.current;
        if (audio) {
            audio.src = playlist[index].file;
            audio.play();
            setIsPlaying(true);
        }
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        let nextIndex = currentTrackIndex + 1;
        if (nextIndex >= playlist.length) {
            nextIndex = 0;
        }
        playTrack(nextIndex);
    };

    const handlePrevious = () => {
        let prevIndex = currentTrackIndex - 1;
        if (prevIndex < 0) {
            prevIndex = playlist.length - 1;
        }
        playTrack(prevIndex);
    };

    const toggleShuffle = () => {
        setIsShuffled(!isShuffled);
    };

    const toggleRepeat = () => {
        setIsRepeated(!isRepeated);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const togglePlaylist = () => {
        setShowPlaylist(!showPlaylist);
    };

    const closePlaylist = () => {
        setShowPlaylist(false);
    };

    return (
        <section className="tokenomics">
            <div className="tokenomics-decorations">
                <img
                    src="/assets/7baa78680df88b2f4aebbcb8365e1c56f8f9f7aa.svg"
                    alt="Decoration"
                    className="decoration-ellipse decoration-1"
                />
                <img
                    src="/assets/512576d1ec526b005dae6296ca20f96db47ba95d.svg"
                    alt="Decoration"
                    className="decoration-ellipse decoration-2"
                />
            </div>
            <h2>TOKENOMICS REVEAL</h2>
            <div className="tokenomics-group">
                <div className="tokenomics-bg"></div>
                <div className="tokenomics-visual">
                    <div className="rotating-content">
                        <div className="chart-container">
                            <img src="/assets/93e4e343fdb2e73859a68337a4ad8e1956279a8e.png" alt="Tokenomics Chart" className="chart" />
                        </div>
                        <div className="chart-text">$BARDO</div>
                    </div>
                </div>
                <div className="tokenomics-player">
                    <div className="player-bg"></div>
                    <div className="player-info">
                        <div className="info-carousel">
                            <div className="info-slide">
                                <span>Total Supply : 10.000.000.000 $Bardo</span>
                                <span className="separator">-</span>
                                <span>No Taxes / Just Rocking</span>
                            </div>
                            <div className="info-slide">
                                <span>Community Driven</span>
                                <span className="separator">-</span>
                                <span>100% Decentralized</span>
                            </div>
                            <div className="info-slide">
                                <span>Rock the Blockchain</span>
                                <span className="separator">-</span>
                                <span>Music Meets Crypto</span>
                            </div>
                            <div className="info-slide">
                                <span>LP Locked Forever</span>
                                <span className="separator">-</span>
                                <span>Safe & Secure</span>
                            </div>
                            <div className="info-slide">
                                <span>Total Supply : 10.000.000.000 $Bardo</span>
                                <span className="separator">-</span>
                                <span>No Taxes / Just Rocking</span>
                            </div>
                        </div>
                    </div>
                    <div className="player-controls">
                        <button className="control-btn skip-back" id="skipBackBtn" onClick={handlePrevious}>
                            <img src="/assets/f40a911c9a0d50b472ac56fc335a2cfd92a0b3f4.svg" alt="Skip Back" />
                        </button>
                        <button className="control-btn play-pause" id="playPauseBtn" onClick={togglePlayPause}>
                            {isPlaying ? (
                                <img src="/assets/pause-icon.svg" alt="Pause" />
                            ) : (
                                <img src="/assets/play.svg" alt="Play" />
                            )}
                        </button>
                        <button className="control-btn skip-forward" id="skipForwardBtn" onClick={handleNext}>
                            <img src="/assets/c3364925561a5be073a203d85403eab09fe3cbbf.svg" alt="Skip Forward" />
                        </button>
                    </div>

                    {/* Hidden Audio Player */}
                    <audio ref={audioRef} preload="auto"></audio>
                    <div className="player-options">
                        <button className="option-btn">
                            <img src="/assets/9c8eedd3ab8fa74cdcd84d060589064ffddb5fef.svg" alt="Sliders" />
                        </button>
                        {/* Music Button - Added for playlist functionality */}
                        <button className="music-btn" onClick={togglePlaylist} title="Music Playlist">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#8f00ff">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        </button>
                    </div>
                    <div className="player-options1">
                        <img src="/assets/repeat.svg" alt="Repeat" className="option-icon" onClick={toggleRepeat} />
                        <img src="/assets/shuffle.svg" alt="Shuffle" className="option-icon" onClick={toggleShuffle} />
                    </div>

                    {/* Current Track Display UI - Inside tokenomics-player */}
                    <div className="current-track-display">
                        <div className="track-info">
                            <h4 className="track-title">{playlist[currentTrackIndex].title}</h4>
                            <p className="track-artist">{playlist[currentTrackIndex].artist}</p>
                        </div>
                        <div className="track-progress">
                            <div className="progress-fill" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>
                        </div>
                        <div className="track-time">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Music Playlist Popup */}
            {showPlaylist && (
                <div className="playlist-overlay">
                    <div className="playlist-popup" ref={playlistRef}>
                        <div className="playlist-header">
                            <h3>🎵 Music Playlist</h3>
                            <button className="close-btn" onClick={closePlaylist}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>
                        <div className="playlist-content">
                            {playlist.map((track, index) => (
                                <div
                                    key={track.id}
                                    className={`playlist-item ${index === currentTrackIndex ? "active" : ""}`}
                                    onClick={() => playTrack(index)}
                                >
                                    <div className="track-info">
                                        <span className="track-title">{track.title}</span>
                                        <span className="track-artist">{track.artist}</span>
                                    </div>
                                    <div className="track-duration">{track.duration}</div>
                                    <div className="track-controls">
                                        {index === currentTrackIndex && isPlaying ? (
                                            <button
                                                className="play-pause-btn pause"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    togglePlayPause();
                                                }}
                                                title="Pause"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <rect x="6" y="4" width="4" height="16" rx="1" ry="1" />
                                                    <rect x="14" y="4" width="4" height="16" rx="1" ry="1" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                className="play-pause-btn play"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (index === currentTrackIndex) {
                                                        togglePlayPause();
                                                    } else {
                                                        playTrack(index);
                                                    }
                                                }}
                                                title="Play"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
