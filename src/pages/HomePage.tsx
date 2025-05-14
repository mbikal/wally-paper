import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import PopularWallpapers from '../components/home/PopularWallpapers';
import FeaturedTags from '../components/home/FeaturedTags';
import { wallpapers } from '../data/mockData';

const HomePage: React.FC = () => {
  // Sort wallpapers by downloads for popular section
  const popularWallpapers = [...wallpapers]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);
  
  // Sort wallpapers by upload date for recent section  
  const recentWallpapers = [...wallpapers]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 4);

  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <PopularWallpapers 
        wallpapers={popularWallpapers} 
        title="Popular Wallpapers"
        subtitle="Our most downloaded and liked wallpapers this week"
      />
      <FeaturedTags />
      <PopularWallpapers 
        wallpapers={recentWallpapers} 
        title="Recently Added"
        subtitle="Fresh new wallpapers added to our collection"
        viewAllLink="/recent"
        viewAllText="View All Recent"
      />
    </div>
  );
};

export default HomePage;