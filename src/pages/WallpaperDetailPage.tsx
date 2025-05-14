import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Heart, Share2, ArrowLeft, Clock, Eye, Tag } from 'lucide-react';
import { useWallpapers } from '../context/WallpaperContext';
import { useAuth } from '../context/AuthContext';
import WallpaperCard from '../components/ui/WallpaperCard';

const WallpaperDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getWallpaperById, getRelatedWallpapers, incrementDownloads, toggleLike } = useWallpapers();
  const { isAuthenticated, currentUser, addToFavorites, removeFromFavorites } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const wallpaper = id ? getWallpaperById(id) : undefined;
  const relatedWallpapers = wallpaper ? getRelatedWallpapers(wallpaper) : [];
  
  const isFavorite = wallpaper ? currentUser?.favorites.includes(wallpaper.id) || false : false;

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    if (wallpaper) {
      document.title = `${wallpaper.title} - WallyPaper`;
    }
    
    return () => {
      document.title = 'WallyPaper - High Quality Wallpapers';
    };
  }, [wallpaper]);

  const handleDownload = () => {
    if (!wallpaper) return;
    
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

  const handleFavoriteToggle = () => {
    if (!wallpaper || !isAuthenticated) return;
    
    if (isFavorite) {
      removeFromFavorites(wallpaper.id);
    } else {
      addToFavorites(wallpaper.id);
    }
  };

  const handleShare = () => {
    if (!wallpaper) return;
    
    if (navigator.share) {
      navigator.share({
        title: wallpaper.title,
        text: wallpaper.description,
        url: window.location.href,
      });
    } else {
      // Copy URL to clipboard as fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!wallpaper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Wallpaper Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The wallpaper you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <ArrowLeft size={18} />
          <span>Back to Browse</span>
        </Link>
      </div>
      
      {/* Wallpaper Display */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image container */}
            <div className="md:w-2/3 relative">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <div className="animate-pulse text-gray-400 dark:text-gray-500">Loading...</div>
                </div>
              )}
              <img
                src={wallpaper.imageUrl}
                alt={wallpaper.title}
                className={`w-full h-full object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            {/* Info container */}
            <div className="md:w-1/3 p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{wallpaper.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{wallpaper.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock size={18} />
                  <span>Uploaded on {new Date(wallpaper.uploadDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Eye size={18} />
                  <span>{(wallpaper.downloads * 3).toLocaleString()} views</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Tag size={18} className="flex-shrink-0" />
                  {wallpaper.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/search?tag=${tag}`}
                      className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Specs</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">Resolution</div>
                  <div className="text-gray-900 dark:text-white font-medium">{wallpaper.resolution}</div>
                  
                  <div className="text-gray-600 dark:text-gray-400">File Size</div>
                  <div className="text-gray-900 dark:text-white font-medium">{wallpaper.fileSize}</div>
                  
                  <div className="text-gray-600 dark:text-gray-400">Downloads</div>
                  <div className="text-gray-900 dark:text-white font-medium">{wallpaper.downloads.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-3 rounded-lg transition-colors ${
                    isFavorite
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  disabled={!isAuthenticated}
                  title={isAuthenticated ? 'Add to favorites' : 'Login to add to favorites'}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
              
              {!isAuthenticated && (
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  <Link to="/login" className="text-purple-600 hover:underline">Login</Link> to add to favorites
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Wallpapers */}
      {relatedWallpapers.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedWallpapers.map(wallpaper => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WallpaperDetailPage;