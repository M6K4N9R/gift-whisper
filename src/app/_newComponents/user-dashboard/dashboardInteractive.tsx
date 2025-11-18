'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WishlistCard from './WishlistCard';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import WishlistFilters from './WishlistFilters';
import SharedWishlists from './SharedWishlists';
import LoadingIndicator from '@/components/common/LoadingIndicator';

interface Wishlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
  isPrivate: boolean;
  lastUpdated: string;
  category: string;
}

interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'shared' | 'item_added';
  title: string;
  description: string;
  timestamp: string;
  wishlistName?: string;
}

interface SharedWishlist {
  id: string;
  title: string;
  ownerName: string;
  ownerAvatar: string;
  itemCount: number;
  sharedDate: string;
  previewItems: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}
const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [filteredWishlists, setFilteredWishlists] = useState<Wishlist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Mock data
  const mockWishlists: Wishlist[] = [
  {
    id: '1',
    title: 'Birthday Wishlist 2024',
    description: 'My birthday is coming up in December and these are some things I\'d love to receive!',
    coverImage: "https://images.unsplash.com/photo-1608679191519-0566abca8f59",
    itemCount: 12,
    isPrivate: false,
    lastUpdated: '2024-11-05T10:30:00Z',
    category: 'Birthday'
  },
  {
    id: '2',
    title: 'Holiday Gift Ideas',
    description: 'Christmas and holiday gift suggestions for family and friends to choose from.',
    coverImage: "https://images.unsplash.com/photo-1641066217605-0e421eeeb815",
    itemCount: 8,
    isPrivate: true,
    lastUpdated: '2024-11-03T14:15:00Z',
    category: 'Holiday'
  },
  {
    id: '3',
    title: 'Wedding Registry',
    description: 'Items for our new home together as we start this beautiful journey.',
    coverImage: "https://images.unsplash.com/photo-1723641304208-5e4525e39b2d",
    itemCount: 25,
    isPrivate: false,
    lastUpdated: '2024-11-01T09:45:00Z',
    category: 'Wedding'
  },
  {
    id: '4',
    title: 'Tech Gadgets 2024',
    description: 'Latest technology and gadgets I\'m interested in for work and personal use.',
    coverImage: "https://images.unsplash.com/photo-1662019293071-bff94b65d33e",
    itemCount: 6,
    isPrivate: true,
    lastUpdated: '2024-10-28T16:20:00Z',
    category: 'Technology'
  },
  {
    id: '5',
    title: 'Home Improvement',
    description: 'Items to make our house feel more like home with better organization and decor.',
    coverImage: "https://images.unsplash.com/photo-1703050794973-3d2f91709edf",
    itemCount: 15,
    isPrivate: false,
    lastUpdated: '2024-10-25T11:10:00Z',
    category: 'Home'
  }];


  const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'item_added',
    title: 'Added new item',
    description: 'Added "Wireless Headphones" to your wishlist',
    timestamp: '2024-11-07T13:30:00Z',
    wishlistName: 'Tech Gadgets 2024'
  },
  {
    id: '2',
    type: 'shared',
    title: 'Wishlist shared',
    description: 'Shared "Birthday Wishlist 2024" with 3 friends',
    timestamp: '2024-11-06T18:45:00Z',
    wishlistName: 'Birthday Wishlist 2024'
  },
  {
    id: '3',
    type: 'updated',
    title: 'Wishlist updated',
    description: 'Updated privacy settings and description',
    timestamp: '2024-11-05T10:30:00Z',
    wishlistName: 'Holiday Gift Ideas'
  },
  {
    id: '4',
    type: 'created',
    title: 'New wishlist created',
    description: 'Created "Home Improvement" wishlist',
    timestamp: '2024-11-04T14:20:00Z',
    wishlistName: 'Home Improvement'
  }];


  const mockSharedWishlists: SharedWishlist[] = [
  {
    id: 'shared-1',
    title: 'Sarah\'s Baby Shower Registry',
    ownerName: 'Sarah Johnson',
    ownerAvatar: "https://images.unsplash.com/photo-1592156087984-c4cc5cd447a5",
    itemCount: 18,
    sharedDate: '2024-11-06T12:00:00Z',
    previewItems: [
    {
      id: 'item-1',
      name: 'Baby Stroller',
      image: 'https://images.pixabay.com/photo/2017/07/23/10/44/baby-2531069_1280.jpg'
    },
    {
      id: 'item-2',
      name: 'Crib Mobile',
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg'
    },
    {
      id: 'item-3',
      name: 'Baby Clothes',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'
    }]

  },
  {
    id: 'shared-2',
    title: 'Mike\'s Graduation Gifts',
    ownerName: 'Mike Chen',
    ownerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    itemCount: 7,
    sharedDate: '2024-11-04T15:30:00Z',
    previewItems: [
    {
      id: 'item-4',
      name: 'Professional Briefcase',
      image: 'https://images.pixabay.com/photo/2014/07/06/13/55/business-385506_1280.jpg'
    },
    {
      id: 'item-5',
      name: 'Watch',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'
    }]

  }];


