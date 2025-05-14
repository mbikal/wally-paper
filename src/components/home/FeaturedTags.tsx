import React from 'react';
import { Link } from 'react-router-dom';
import { popularTags } from '../../data/mockData';

const FeaturedTags: React.FC = () => {
  return (
    <section className="py-12 bg-indigo-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Tags</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find wallpapers quickly by browsing our most popular tags
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {popularTags.map((tag, index) => (
            <Link 
              key={index} 
              to={`/search?tag=${tag}`}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-800 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-indigo-900 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTags;