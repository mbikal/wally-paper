import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

interface HeroImage {
  url: string;
  title: string;
  credit: string;
}

const heroImages: HeroImage[] = [
  {
    url: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Mountain Sunset',
    credit: 'Pexels'
  },
  {
    url: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Galaxy Space',
    credit: 'Pexels'
  },
  {
    url: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Ocean Waves',
    credit: 'Pexels'
  }
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image.url})` }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Stunning Wallpapers for<br />
          Every Device
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Discover and download high-quality wallpapers to personalize your desktop, phone, and tablet.
        </p>
        
        <div className="max-w-xl mx-auto mb-10">
          <SearchBar fullWidth placeholder="Search for wallpapers..." />
        </div>
        
        <div className="flex justify-center space-x-4">
          <a href="#featured" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors flex items-center space-x-1">
            <span>Explore Now</span>
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
      
      {/* Image navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;