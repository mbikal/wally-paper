import React from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Wallpaper } from '../../types';
import WallpaperCard from '../ui/WallpaperCard';

interface PopularWallpapersProps {
  wallpapers: Wallpaper[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

const PopularWallpapers: React.FC<PopularWallpapersProps> = ({
  wallpapers,
  title = 'Popular Wallpapers',
  subtitle = 'Our most downloaded and liked wallpapers this week',
  viewAllLink = '/popular',
  viewAllText = 'View All Popular'
}) => {
  // Define breakpoints for responsive masonry grid
  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  return (
    <section id="featured" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          {viewAllLink && (
            <Link 
              to={viewAllLink}
              className="mt-4 md:mt-0 inline-block font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
            >
              {viewAllText}
            </Link>
          )}
        </div>
        
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {wallpapers.map(wallpaper => (
            <div key={wallpaper.id} className="mb-4">
              <WallpaperCard wallpaper={wallpaper} />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default PopularWallpapers;