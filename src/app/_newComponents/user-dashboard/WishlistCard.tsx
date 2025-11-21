import React from 'react';
import Link from 'next/link';
import AppImage from '@/app/ui/commonComponents/AppImage';
import Icon from '@/app/ui/commonComponents/AppIcon';

interface WishlistCardProps {
  wishlist: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    itemCount: number;
    isPrivate: boolean;
    lastUpdated: string;
    category: string;
  };
}

const WishlistCard = ({ wishlist }: WishlistCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={wishlist.coverImage}
          alt={`Cover image for ${wishlist.title} wishlist showing gift items`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            wishlist.isPrivate 
              ? 'bg-warning/20 text-warning-foreground' 
              : 'bg-success/20 text-success-foreground'
          }`}>
            {wishlist.isPrivate ? 'Private' : 'Public'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-text-primary line-clamp-1">
            {wishlist.title}
          </h3>
          <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
            {wishlist.category}
          </span>
        </div>
        
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {wishlist.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="GiftIcon" size={16} />
            <span>{wishlist.itemCount} items</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="ClockIcon" size={16} />
            <span>{formatDate(wishlist.lastUpdated)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link
            href={`/wishlist/${wishlist.id}`}
            className="flex-1 bg-primary text-primary-foreground text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            View Wishlist
          </Link>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-200">
            <Icon name="ShareIcon" size={16} />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-200">
            <Icon name="PencilIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;