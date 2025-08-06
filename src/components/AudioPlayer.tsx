
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, SkipForward, SkipBack, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = (speed: string) => {
    const rate = parseFloat(speed);
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (compact) {
    return (
      <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
        
        {/* Listen What is dKloud text */}
        <div className="text-center">
          <h4 className="text-sm font-semibold text-foreground mb-1">Listen: What is dKloud?</h4>
          <p className="text-xs text-muted-foreground">Discover our audio introduction</p>
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={skipBackward}
            disabled={isLoading}
            size="sm"
            variant="ghost"
            className="rounded-full w-8 h-8 p-0"
          >
            <SkipBack className="w-3 h-3" />
          </Button>
          
          <Button
            onClick={togglePlayPause}
            disabled={isLoading}
            size="sm"
            className="bg-primary/20 hover:bg-primary/30 rounded-full w-10 h-10 p-0 transition-all duration-300"
          >
            {isLoading ? (
              <div className="w-4 h-4 border border-primary/50 border-t-primary rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
          
          <Button
            onClick={skipForward}
            disabled={isLoading}
            size="sm"
            variant="ghost"
            className="rounded-full w-8 h-8 p-0"
          >
            <SkipForward className="w-3 h-3" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="w-full h-1.5 bg-muted rounded-full cursor-pointer hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-200"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <Gauge className="w-3 h-3 text-muted-foreground" />
          <Select value={playbackRate.toString()} onValueChange={handleSpeedChange}>
            <SelectTrigger className="w-16 h-6 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
            </SelectContent>
          </Select>
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
