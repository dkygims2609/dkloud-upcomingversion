
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
      <div className="bg-[#191414] rounded-xl p-4 w-80 mx-auto text-white relative">
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
        
        {/* Header with title and artist */}
        <div className="text-center mb-4">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <p className="text-gray-300 text-sm">dKloud Tech</p>
        </div>

        {/* Time display */}
        <div className="text-center mb-2">
          <div className="text-gray-300 text-sm">{formatTime(currentTime)}</div>
          <div className="text-gray-300 text-sm">{formatTime(duration)}</div>
        </div>

        {/* Play button */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={togglePlayPause} 
            disabled={isLoading}
            className="bg-transparent border-0 text-white p-2 rounded-full hover:text-[#1db954] transition-colors"
          >
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex justify-center gap-2">
          {[0.8, 1.25].map((rate) => (
            <button
              key={rate}
              onClick={() => changePlaybackRate(rate)}
              className={`px-3 py-1 text-sm rounded border transition-colors ${
                playbackRate === rate 
                  ? 'bg-[#1db954] border-[#1db954] text-white' 
                  : 'bg-transparent border-gray-500 text-white hover:border-[#1db954] hover:text-[#1db954]'
              }`}
            >
              {rate}x
            </button>
          ))}
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
