import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, MessageSquare } from 'lucide-react';
import { RotateCcw, RotateCw } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  onBack?: () => void;
}

const VideoPlayer = ({ src, onBack }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (playerRef.current?.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(value);
    video.volume = value;
    setIsMuted(value === 0);
    video.muted = value === 0;
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    video.muted = newMutedState;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (Number(e.target.value) / 100) * duration;
    video.currentTime = time;
    setProgress(Number(e.target.value));
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full h-screen bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        isPlaying && setShowControls(false);
        setShowVolumeControl(false);
      }}
    >
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-10">
        <button 
          className="text-white hover:text-gray-300 flex items-center gap-2"
          onClick={handleBack}
        >
          <ChevronLeft size={24} />
        </button>
        <button className="text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6l18 0" />
            <path d="M3 12l18 0" />
            <path d="M3 18l18 0" />
          </svg>
        </button>
      </div>
      
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent pb-4 pt-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="px-4">
          <div className="relative w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-red-600"
              style={{
                background: `linear-gradient(to right, #DC2626 ${progress}%, #4B5563 ${progress}%)`
              }}
            />
            <div className="absolute w-full flex justify-between text-white text-sm -bottom-6">
              <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 mt-8">
          <div className="flex items-center space-x-6">
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>

            <button
              onClick={() => skipTime(-10)}
              className="text-white hover:text-gray-300"
            >
              <RotateCcw size={24} />
            </button>

            <button
              onClick={() => skipTime(10)}
              className="text-white hover:text-gray-300"
            >
              <RotateCw size={24} />
            </button>

            <div 
              className="relative group flex items-center"
              onMouseEnter={() => setShowVolumeControl(true)}
              onMouseLeave={() => setShowVolumeControl(false)}
            >
              <div className="flex items-center">
                <button
                  onClick={handleMuteToggle}
                  className="text-white hover:text-gray-300"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <div className={`ml-4 transition-opacity duration-200 ${showVolumeControl ? 'opacity-100 w-24' : 'opacity-0 w-0'}`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-red-600"
                    style={{
                      background: `linear-gradient(to right, #DC2626 ${(isMuted ? 0 : volume) * 100}%, #4B5563 ${(isMuted ? 0 : volume) * 100}%)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-gray-300">
              <MessageSquare size={24} />
            </button>
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-gray-300"
            >
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;