import { Wallpaper, Category, User } from '../types';

export const wallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Mountain Sunset',
    description: 'Beautiful mountain sunset with vibrant colors.',
    imageUrl: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['nature', 'mountains'],
    tags: ['sunset', 'mountains', 'landscape'],
    resolution: '3840x2160',
    fileSize: '4.2 MB',
    downloads: 1250,
    likes: 342,
    uploadDate: '2024-05-15',
    uploader: 'user1'
  },
  {
    id: '2',
    title: 'Abstract Waves',
    description: 'Digital art abstract waves pattern.',
    imageUrl: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['abstract', 'digital-art'],
    tags: ['abstract', 'waves', 'colorful'],
    resolution: '2560x1440',
    fileSize: '3.8 MB',
    downloads: 875,
    likes: 213,
    uploadDate: '2024-06-02',
    uploader: 'user2'
  },
  {
    id: '3',
    title: 'Serene Beach',
    description: 'Calm beach scene with crystal clear water.',
    imageUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['nature', 'beach'],
    tags: ['beach', 'ocean', 'tropical'],
    resolution: '3840x2160',
    fileSize: '5.1 MB',
    downloads: 1720,
    likes: 512,
    uploadDate: '2024-05-22',
    uploader: 'user1'
  },
  {
    id: '4',
    title: 'City Skyline',
    description: 'Urban skyline with skyscrapers at night.',
    imageUrl: 'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['urban', 'architecture'],
    tags: ['city', 'night', 'skyline'],
    resolution: '3840x2160',
    fileSize: '4.5 MB',
    downloads: 930,
    likes: 285,
    uploadDate: '2024-05-30',
    uploader: 'user3'
  },
  {
    id: '5',
    title: 'Minimalist Workspace',
    description: 'Clean minimalist workspace setup.',
    imageUrl: 'https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['minimalist', 'workspace'],
    tags: ['workspace', 'clean', 'productivity'],
    resolution: '2560x1440',
    fileSize: '3.2 MB',
    downloads: 740,
    likes: 190,
    uploadDate: '2024-06-05',
    uploader: 'user4'
  },
  {
    id: '6',
    title: 'Galaxy',
    description: 'Stunning galaxy view from space telescope.',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['space', 'astronomy'],
    tags: ['galaxy', 'space', 'stars'],
    resolution: '3840x2160',
    fileSize: '5.5 MB',
    downloads: 1850,
    likes: 602,
    uploadDate: '2024-05-18',
    uploader: 'user2'
  },
  {
    id: '7',
    title: 'Pink Flowers',
    description: 'Beautiful pink cherry blossoms.',
    imageUrl: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['nature', 'flowers'],
    tags: ['flowers', 'pink', 'spring'],
    resolution: '2560x1440',
    fileSize: '3.9 MB',
    downloads: 920,
    likes: 325,
    uploadDate: '2024-05-25',
    uploader: 'user3'
  },
  {
    id: '8',
    title: 'Retro Wave',
    description: 'Retro wave synthwave style background.',
    imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['abstract', 'retro'],
    tags: ['retro', 'synthwave', 'vaporwave'],
    resolution: '3840x2160',
    fileSize: '4.3 MB',
    downloads: 1050,
    likes: 298,
    uploadDate: '2024-06-01',
    uploader: 'user1'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Nature',
    slug: 'nature',
    count: 380,
    featured: true
  },
  {
    id: '2',
    name: 'Abstract',
    slug: 'abstract',
    count: 245,
    featured: true
  },
  {
    id: '3',
    name: 'Space',
    slug: 'space',
    count: 156,
    featured: true
  },
  {
    id: '4',
    name: 'Urban',
    slug: 'urban',
    count: 210,
    featured: true
  },
  {
    id: '5',
    name: 'Minimalist',
    slug: 'minimalist',
    count: 125,
    featured: false
  },
  {
    id: '6',
    name: 'Digital Art',
    slug: 'digital-art',
    count: 198,
    featured: false
  },
  {
    id: '7',
    name: 'Architecture',
    slug: 'architecture',
    count: 143,
    featured: false
  },
  {
    id: '8',
    name: 'Animals',
    slug: 'animals',
    count: 172,
    featured: true
  }
];

export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    profilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    favorites: ['1', '3', '6'],
    collections: [
      {
        id: 'col1',
        name: 'Nature Favorites',
        wallpapers: ['1', '3'],
        isPublic: true
      }
    ],
    isAdmin: true
  },
  {
    id: 'user2',
    name: 'Sam Davis',
    email: 'sam@example.com',
    profilePic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    favorites: ['2', '6', '8'],
    collections: [
      {
        id: 'col2',
        name: 'Space Collection',
        wallpapers: ['6'],
        isPublic: true
      }
    ],
    isAdmin: false
  }
];

export const popularTags = [
  'nature',
  'abstract',
  'space',
  'minimalist',
  'landscape',
  'city',
  'ocean',
  'mountains',
  'night',
  'colorful',
  'black and white',
  'technology',
  'animals',
  'flowers'
];