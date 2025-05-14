import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addToFavorites: (wallpaperId: string) => void;
  removeFromFavorites: (wallpaperId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate against a backend
    const user = users.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // In a real app, this would send data to a backend
    const newUser: User = {
      id: `user${users.length + 1}`,
      name,
      email,
      favorites: [],
      collections: [],
      isAdmin: false
    };
    
    // Add to mock users array - in a real app this would be a database operation
    users.push(newUser);
    
    // Auto-login the new user
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    
    return true;
  };

  const addToFavorites = (wallpaperId: string) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      favorites: [...currentUser.favorites, wallpaperId]
    };
    
    setCurrentUser(updatedUser);
    
    // Update in mock users array - in a real app this would be a database operation
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
  };

  const removeFromFavorites = (wallpaperId: string) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      favorites: currentUser.favorites.filter(id => id !== wallpaperId)
    };
    
    setCurrentUser(updatedUser);
    
    // Update in mock users array - in a real app this would be a database operation
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    register,
    addToFavorites,
    removeFromFavorites
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};