
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  description?: string;
  compact?: boolean;
}

export const AudioPlayer = ({ audioSrc, title, description, compact = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (compact) {
    return (
      <div className="w-full max-w-[560px] mx-auto">
        <audio ref={audioRef} src={audioSrc} preload="metadata" />

        <div className="flex items-center gap-3 bg-[#121212] text-white rounded-full px-4 py-2 border border-[#1DB954]/20 shadow-lg shadow-[#1DB954]/10">
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="w-10 h-10 rounded-full grid place-items-center bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 transition-all text-black"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Title and mini EQ */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white truncate max-w-[160px]">{title}</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
                  <span className="block origin-bottom w-0.5 h-2 bg-[#1DB954] animate-[playing_1s_ease-in-out_infinite_0.2s]" />
                  <span className="block origin-bottom w-0.5 h-3 bg-[#1DB954] animate-[playing_1s_ease-in-out_infinite_0.4s]" />
                  <span className="block origin-bottom w-0.5 h-2 bg-[#1DB954] animate-[playing_1s_ease-in-out_infinite_0s]" />
                </div>
              )}
            </div>
            <div 
              className="mt-1.5 w-full h-1 bg-[#404040] rounded-full cursor-pointer group overflow-hidden"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-[#1DB954] rounded-full group-hover:bg-[#1ed760] transition-all relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity -mr-1.5" />
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="hidden sm:flex flex-col items-end text-[10px] text-[#a7a7a7] ml-2 min-w-[35px]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-1 ml-2">
            {[0.8, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => changePlaybackRate(rate)}
                className={`px-2 py-1 text-[10px] rounded-full border transition-all ${
                  playbackRate === rate 
                    ? 'bg-[#1DB954] border-[#1DB954] text-black font-medium' 
                    : 'bg-transparent border-[#404040] text-[#a7a7a7] hover:border-[#1DB954] hover:text-[#1DB954]'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dkloud-card dkloud-card-interactive p-6 max-w-md mx-auto fade-in" style={{animationDelay: "0.5s"}}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-1 bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
          🎧 {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="btn-gradient rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform duration-300"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>

        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-muted rounded-full cursor-pointer hover:h-3 transition-all duration-200 group"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-200 group-hover:shadow-lg group-hover:shadow-purple-500/30"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <Volume2 className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Visual Enhancement */}
      <div className="flex justify-center">
        <div className="flex gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-to-t from-purple-500/30 to-blue-500/30 rounded-full transition-all duration-200 ${
                isPlaying && i < (progressPercentage / 5) 
                  ? 'h-4 bg-gradient-to-t from-purple-500 to-blue-500' 
                  : 'h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
