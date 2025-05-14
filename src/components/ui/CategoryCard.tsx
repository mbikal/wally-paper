import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  bgImage?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, bgImage }) => {
  // Default background images based on category name
  const defaultBgImages: Record<string, string> = {
    nature: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    abstract: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=600',
    animals: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600',
    technology: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
    space: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=600',
    urban: 'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg?auto=compress&cs=tinysrgb&w=600',
    minimalist: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=600',
    architecture: 'https://images.pexels.com/photos/137586/pexels-photo-137586.jpeg?auto=compress&cs=tinysrgb&w=600',
  };
  
  const backgroundImage = bgImage || defaultBgImages[category.slug.toLowerCase()] || 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <Link 
      to={`/categories/${category.slug}`}
      className="block group overflow-hidden relative rounded-xl h-48 shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{category.name}</h3>
        <p className="text-white/80 text-sm">
          {category.count.toLocaleString()} wallpapers
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;