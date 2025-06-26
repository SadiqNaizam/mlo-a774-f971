import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, MoreHorizontal, PlusCircle, ListMusic, User } from 'lucide-react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string; // e.g., "3:45"
  imageUrl: string;
}

interface SongListItemProps {
  song: Song;
  trackNumber: number;
}

const SongListItem: React.FC<SongListItemProps> = ({ song, trackNumber }) => {
  console.log('SongListItem loaded for:', song.title);

  const handlePlay = () => {
    console.log(`Playing song: ${song.title}`);
    // In a real app, this would trigger a global state update
  };

  const handleAddToPlaylist = () => {
    console.log(`Adding ${song.title} to a playlist.`);
  };

  return (
    <div className="group flex items-center w-full p-2 rounded-md hover:bg-blue-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
      {/* Track Number / Play Button */}
      <div className="relative w-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <span className="group-hover:opacity-0 transition-opacity">{trackNumber}</span>
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePlay}
          aria-label={`Play ${song.title}`}
        >
          <Play className="h-4 w-4 fill-current" />
        </Button>
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-3 flex-grow mx-4">
        <Avatar className="h-10 w-10 rounded">
          <AvatarImage src={song.imageUrl} alt={song.title} />
          <AvatarFallback>{song.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800 dark:text-white truncate">{song.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{song.artist}</p>
        </div>
      </div>

      {/* Duration */}
      <div className="w-12 text-sm text-gray-500 dark:text-gray-400 text-right">
        {song.duration}
      </div>

      {/* Context Menu */}
      <div className="w-10 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAddToPlaylist}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Add to Playlist</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ListMusic className="mr-2 h-4 w-4" />
              <span>Add to Queue</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Go to Artist</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SongListItem;