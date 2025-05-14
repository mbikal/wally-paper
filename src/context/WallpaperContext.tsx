import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Wallpaper, SearchFilters } from '../types';
import { wallpapers as initialWallpapers } from '../data/mockData';

interface WallpaperContextType {
  wallpapers: Wallpaper[];
  filteredWallpapers: Wallpaper[];
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  getWallpaperById: (id: string) => Wallpaper | undefined;
  getRelatedWallpapers: (wallpaper: Wallpaper) => Wallpaper[];
  incrementDownloads: (id: string) => void;
  toggleLike: (id: string) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  categories: [],
  tags: [],
  sortBy: 'newest'
};

const WallpaperContext = createContext<WallpaperContextType | null>(null);

export const useWallpapers = () => {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error('useWallpapers must be used within a WallpaperProvider');
  }
  return context;
};

export const WallpaperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(initialWallpapers);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  // Filter and sort wallpapers based on current filters
  const filteredWallpapers = wallpapers.filter(wallpaper => {
    // Filter by search query
    const matchesQuery = filters.query 
      ? wallpaper.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        wallpaper.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        wallpaper.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()))
      : true;
    
    // Filter by categories
    const matchesCategories = filters.categories.length > 0
      ? filters.categories.some(category => wallpaper.categories.includes(category))
      : true;
    
    // Filter by tags
    const matchesTags = filters.tags.length > 0
      ? filters.tags.some(tag => wallpaper.tags.includes(tag))
      : true;
    
    return matchesQuery && matchesCategories && matchesTags;
  }).sort((a, b) => {
    // Sort based on sortBy option
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  // Get a wallpaper by ID
  const getWallpaperById = (id: string): Wallpaper | undefined => {
    return wallpapers.find(wallpaper => wallpaper.id === id);
  };

  // Get related wallpapers based on categories and tags
  const getRelatedWallpapers = (wallpaper: Wallpaper): Wallpaper[] => {
    return wallpapers
      .filter(w => 
        w.id !== wallpaper.id && 
        (
          w.categories.some(cat => wallpaper.categories.includes(cat)) ||
          w.tags.some(tag => wallpaper.tags.includes(tag))
        )
      )
      .slice(0, 4); // Limit to 4 related wallpapers
  };

  // Increment download count for a wallpaper
  const incrementDownloads = (id: string): void => {
    setWallpapers(prevWallpapers => 
      prevWallpapers.map(wallpaper => 
        wallpaper.id === id 
          ? { ...wallpaper, downloads: wallpaper.downloads + 1 } 
          : wallpaper
      )
    );
  };

  // Toggle like for a wallpaper
  const toggleLike = (id: string): void => {
    setWallpapers(prevWallpapers => 
      prevWallpapers.map(wallpaper => 
        wallpaper.id === id 
          ? { ...wallpaper, likes: wallpaper.likes + 1 } 
          : wallpaper
      )
    );
  };

  const value = {
    wallpapers,
    filteredWallpapers,
    filters,
    setFilters,
    getWallpaperById,
    getRelatedWallpapers,
    incrementDownloads,
    toggleLike
  };

  return <WallpaperContext.Provider value={value}>{children}</WallpaperContext.Provider>;
};