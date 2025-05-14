import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Download, Eye } from 'lucide-react';
import { Wallpaper } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useWallpapers } from '../../context/WallpaperContext';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, currentUser, addToFavorites, removeFromFavorites } = useAuth();
  const { incrementDownloads } = useWallpapers();
  
  const isFavorite = currentUser?.favorites.includes(wallpaper.id) || false;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = wallpaper.imageUrl;
    link.download = `${wallpaper.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Increment download count
    incrementDownloads(wallpaper.id);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(wallpaper.id);
    } else {
      addToFavorites(wallpaper.id);
    }
  };

  return (
    <div 
      className="group overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/wallpaper/${wallpaper.id}`} className="block relative">
        {/* Image container with aspect ratio */}
        <div className="relative pb-[75%] overflow-hidden">
          <img
            src={wallpaper.thumbnailUrl}
            alt={wallpaper.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Overlay with info on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex flex-col justify-between transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex justify-end">
              <button 
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/40'
                } transition`}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <div>
              <h3 className="text-white font-semibold truncate">{wallpaper.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-white/80">{wallpaper.resolution}</span>
                <button 
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Card footer with stats */}
      <div className="p-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Eye size={16} />
            <span>{(wallpaper.downloads * 3).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download size={16} />
            <span>{wallpaper.downloads.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Heart size={16} />
          <span>{wallpaper.likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;