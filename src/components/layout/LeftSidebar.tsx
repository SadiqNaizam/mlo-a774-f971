import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  // Placeholder data for user playlists
  const playlists = [
    { id: 1, name: "Dora's Favorites" },
    { id: 2, name: 'Late Night Vibes' },
    { id: 3, name: 'Study Beats' },
    { id: 4, name: 'Workout Mix' },
    { id: 5, name: '80s Rewind' },
    { id: 6, name: 'Acoustic Chill' },
    { id: 7, name: 'Morning Commute' },
    { id: 8, name: 'Future Gadget Grooves' },
    { id: 9, name: 'Anywhere Door Adventures' },
    { id: 10, name: 'Time Machine Tunes' },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
      isActive
        ? 'bg-blue-200 text-blue-800'
        : 'text-gray-700 hover:bg-blue-100'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-50 border-r h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">Doraify Tunes</h1>
      </div>
      
      <nav className="flex flex-col p-2">
        <NavLink to="/" className={navLinkClasses}>
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink to="/search" className={navLinkClasses}>
          <Search className="h-5 w-5" />
          Search
        </NavLink>
        <NavLink to="/library" className={navLinkClasses}>
          <Library className="h-5 w-5" />
          Your Library
        </NavLink>
      </nav>

      <Separator className="my-2" />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-800">Playlists</h2>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-blue-100 hover:text-blue-600">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Create Playlist</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 p-2">
            {playlists.map((playlist) => (
              <a
                key={playlist.id}
                href="#" // In a real app, this would be `/playlist/${playlist.id}`
                className="block p-2 rounded-md text-sm text-gray-600 hover:bg-blue-100 hover:text-gray-900 truncate"
              >
                {playlist.name}
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default LeftSidebar;