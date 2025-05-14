import React from 'react';
import { categories } from '../../data/mockData';
import CategoryCard from '../ui/CategoryCard';

const FeaturedCategories: React.FC = () => {
  // Get only featured categories
  const featuredCategories = categories.filter(cat => cat.featured);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Browse by Category</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collections organized by categories to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/categories" 
            className="inline-block px-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-full font-medium transition-colors"
          >
            View All Categories
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;