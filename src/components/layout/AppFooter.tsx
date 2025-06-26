import React from 'react';
import MusicPlayerControls from '@/components/MusicPlayerControls';

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 bg-background border-t">
      <MusicPlayerControls />
    </footer>
  );
};

export default AppFooter;