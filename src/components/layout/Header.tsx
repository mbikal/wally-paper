import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, Heart, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-indigo-900 dark:text-white"
          >
            <span className="text-purple-600">Wally</span>
            <span>Paper</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/popular" 
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Popular
            </Link>
            <Link 
              to="/search" 
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Search size={20} />
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <span>{currentUser?.name.split(' ')[0]}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {currentUser?.profilePic ? (
                      <img src={currentUser.profilePic} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <User size={16} className="text-indigo-600 dark:text-indigo-300" />
                      </div>
                    )}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/favorites" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                  >
                    <div className="flex items-center space-x-2">
                      <Heart size={16} />
                      <span>Favorites</span>
                    </div>
                  </Link>
                  <Link 
                    to="/collections" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Collections</span>
                    </div>
                  </Link>
                  {currentUser?.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Admin Dashboard</span>
                      </div>
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-2">
          <Link 
            to="/" 
            className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            Home
          </Link>
          <Link 
            to="/categories" 
            className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            Categories
          </Link>
          <Link 
            to="/popular" 
            className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            Popular
          </Link>
          <Link 
            to="/search" 
            className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            Search
          </Link>

          {isAuthenticated ? (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <Link 
                to="/favorites" 
                className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <div className="flex items-center space-x-2">
                  <Heart size={20} />
                  <span>Favorites</span>
                </div>
              </Link>
              <Link 
                to="/collections" 
                className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Collections
              </Link>
              {currentUser?.isAdmin && (
                <Link 
                  to="/admin" 
                  className="block py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Admin Dashboard
                </Link>
              )}
              <button 
                onClick={logout}
                className="flex items-center space-x-2 w-full text-left py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-2 py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;