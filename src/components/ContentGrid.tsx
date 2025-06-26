import React from 'react';

interface ContentGridProps {
  /**
   * An optional title to display above the grid.
   */
  title?: string;
  /**
   * The content to be displayed within the grid, typically a collection of card components.
   */
  children: React.ReactNode;
}

/**
 * A responsive grid layout component used to display a collection of cards,
 * such as albums or playlists. It handles the arrangement and spacing of items
 * to fit various screen sizes.
 */
const ContentGrid: React.FC<ContentGridProps> = ({ title, children }) => {
  console.log('ContentGrid loaded');

  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-gray-800 dark:text-white">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {children}
      </div>
    </section>
  );
};

export default ContentGrid;