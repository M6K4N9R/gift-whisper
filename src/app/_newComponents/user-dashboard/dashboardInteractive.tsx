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
