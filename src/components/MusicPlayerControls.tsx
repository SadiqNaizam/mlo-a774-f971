import React, { useState, useEffect, useCallback } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Song {
  title: string;
  artist: string;
  artworkUrl: string;
  duration: number; // in seconds
}

// Placeholder for the current song
const currentSongData: Song = {
  title: "Doraemon no Uta",
  artist: "Kumiko Osugi",
  artworkUrl: "https://via.placeholder.com/64", // Placeholder image
  duration: 180, // 3 minutes
};

const MusicPlayerControls: React.FC = () => {
  console.log('MusicPlayerControls loaded');

  const [song, setSong] = useState<Song | null>(currentSongData);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && song) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / song.duration);
          if (newProgress >= 100) {
            setIsPlaying(false); // Stop playing when song ends
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, song]);

  const handlePlayPause = useCallback(() => {
    if (!song) return;
    setIsPlaying(prev => !prev);
  }, [song]);

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
    // In a real app, you would also seek the audio position
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    // In a real app, you would set the audio element's volume
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentProgressInSeconds = song ? (progress / 100) * song.duration : 0;

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  if (!song) {
    return (
        <div className="h-24 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <p className="text-sm text-gray-500">Select a song to play</p>
        </div>
    );
  }

  return (
    <div className="h-24 bg-background border-t px-4 grid grid-cols-3 items-center w-full">
      {/* Left: Song Info */}
      <div className="flex items-center gap-4">
        <img src={song.artworkUrl} alt={song.title} className="h-14 w-14 rounded-md object-cover" />
        <div>
          <p className="font-semibold text-sm truncate">{song.title}</p>
          <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
        </div>
      </div>

      {/* Center: Player Controls */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-4">
          <Button variant={isShuffle ? "secondary" : "ghost"} size="icon" onClick={() => setIsShuffle(p => !p)}>
            <Shuffle className={`h-5 w-5 ${isShuffle ? 'text-primary' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button size="icon" className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="h-6 w-6" />
          </Button>
          <Button variant={isRepeat ? "secondary" : "ghost"} size="icon" onClick={() => setIsRepeat(p => !p)}>
            <Repeat className={`h-5 w-5 ${isRepeat ? 'text-primary' : ''}`} />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-muted-foreground">{formatTime(currentProgressInSeconds)}</span>
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={1}
            className="w-full"
          />
          <span className="text-xs text-muted-foreground">{formatTime(song.duration)}</span>
        </div>
      </div>

      {/* Right: Volume Control */}
      <div className="flex items-center justify-end gap-2">
        <VolumeIcon className="h-5 w-5 text-muted-foreground" />
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default MusicPlayerControls;