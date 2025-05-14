import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import WallpaperDetailPage from './pages/WallpaperDetailPage';
import SearchPage from './pages/SearchPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import { WallpaperProvider } from './context/WallpaperContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WallpaperProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wallpaper/:id" element={<WallpaperDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
            <Footer />
          </div>
        </WallpaperProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;