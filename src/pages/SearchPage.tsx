import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import WallpaperCard from '../components/ui/WallpaperCard';
import { useWallpapers } from '../context/WallpaperContext';
import { categories, popularTags } from '../data/mockData';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { filteredWallpapers, filters, setFilters } = useWallpapers();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const tag = params.get('tag');
    const category = params.get('category');
    
    const newFilters = { ...filters, query };
    
    if (tag) {
      newFilters.tags = [tag];
    }
    
    if (category) {
      newFilters.categories = [category];
    }
    
    setFilters(newFilters);
  }, [location.search]);

  // Define breakpoints for responsive masonry grid
  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  const handleSearch = (query: string) => {
    setFilters({ ...filters, query });
  };

  const toggleCategoryFilter = (categorySlug: string) => {
    const newCategories = filters.categories.includes(categorySlug)
      ? filters.categories.filter(c => c !== categorySlug)
      : [...filters.categories, categorySlug];
    
    setFilters({ ...filters, categories: newCategories });
  };

  const toggleTagFilter = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    setFilters({ ...filters, tags: newTags });
  };

  const clearFilters = () => {
    setFilters({
      query: filters.query,
      categories: [],
      tags: [],
      sortBy: 'newest'
    });
  };

  const setSortBy = (sortBy: 'newest' | 'popular' | 'downloads') => {
    setFilters({ ...filters, sortBy });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center mb-8">
          <div className="flex-grow md:mr-4 mb-4 md:mb-0">
            <SearchBar 
              initialQuery={filters.query} 
              onSearch={handleSearch}
              fullWidth
              placeholder="Search wallpapers by name, description, or tags..."
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
            {(filters.categories.length > 0 || filters.tags.length > 0) && (
              <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs bg-purple-600 text-white rounded-full">
                {filters.categories.length + filters.tags.length}
              </span>
            )}
          </button>
        </div>
        
        {/* Filter panel */}
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-all duration-300 ${
            isFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden py-0'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
            <div className="flex space-x-3">
              {(filters.categories.length > 0 || filters.tags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <X size={14} />
                  <span>Clear filters</span>
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label 
                    key={category.id}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.slug)}
                      onChange={() => toggleCategoryFilter(category.slug)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Popular Tags */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.slice(0, 15).map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => toggleTagFilter(tag)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      filters.tags.includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort Options */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Sort By</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={filters.sortBy === 'newest'}
                    onChange={() => setSortBy('newest')}
                    className="rounded-full border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Newest First</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={filters.sortBy === 'popular'}
                    onChange={() => setSortBy('popular')}
                    className="rounded-full border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Most Popular</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={filters.sortBy === 'downloads'}
                    onChange={() => setSortBy('downloads')}
                    className="rounded-full border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Most Downloads</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active filters */}
        {(filters.categories.length > 0 || filters.tags.length > 0 || filters.query) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-gray-600 dark:text-gray-400 flex items-center">
              <SlidersHorizontal size={16} className="mr-1" />
              Active filters:
            </span>
            
            {filters.query && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                "{filters.query}"
                <button
                  onClick={() => setFilters({ ...filters, query: '' })}
                  className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {filters.categories.map((category, index) => {
              const categoryName = categories.find(c => c.slug === category)?.name || category;
              return (
                <span 
                  key={`category-${index}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                >
                  {categoryName}
                  <button
                    onClick={() => toggleCategoryFilter(category)}
                    className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })}
            
            {filters.tags.map((tag, index) => (
              <span 
                key={`tag-${index}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                #{tag}
                <button
                  onClick={() => toggleTagFilter(tag)}
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            
            {(filters.categories.length > 0 || filters.tags.length > 0 || filters.query) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}
        
        {/* Results count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          Found {filteredWallpapers.length} wallpapers
          {filters.query && ` matching "${filters.query}"`}
        </div>
        
        {/* Results */}
        {filteredWallpapers.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredWallpapers.map(wallpaper => (
              <div key={wallpaper.id} className="mb-4">
                <WallpaperCard wallpaper={wallpaper} />
              </div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No wallpapers found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;