export interface Wallpaper {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  categories: string[];
  tags: string[];
  resolution: string;
  fileSize: string;
  downloads: number;
  likes: number;
  uploadDate: string;
  uploader: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  featured: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  favorites: string[];
  collections: Collection[];
  isAdmin: boolean;
}

export interface Collection {
  id: string;
  name: string;
  wallpapers: string[];
  isPublic: boolean;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  tags: string[];
  sortBy: 'newest' | 'popular' | 'downloads';
}