import React from 'react';
import Link from 'next/link';
import AppImage from '@/app/ui/commonComponents/AppImage';
import Icon from '@/app/ui/commonComponents/AppIcon';

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

interface SharedWishlistsProps {
  wishlists: SharedWishlist[];
}

const SharedWishlists = ({ wishlists }: SharedWishlistsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Shared with Me</h2>
        <Icon name="UserGroupIcon" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {wishlists.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="UserGroupIcon" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No shared wishlists</p>
            <p className="text-sm text-text-secondary mt-1">
              When friends share wishlists with you, they'll appear here
            </p>
          </div>
        ) : (
          wishlists.map((wishlist) => (
            <div key={wishlist.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <AppImage
                  src={wishlist.ownerAvatar}
                  alt={`Profile photo of ${wishlist.ownerName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-text-primary line-clamp-1">
                      {wishlist.title}
                    </h3>
                    <span className="text-xs text-text-secondary">
                      {formatDate(wishlist.sharedDate)}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">
                    by {wishlist.ownerName} • {wishlist.itemCount} items
                  </p>
                  
                  {/* Preview Items */}
                  <div className="flex items-center space-x-2 mb-3">
                    {wishlist.previewItems.slice(0, 3).map((item, index) => (
                      <AppImage
                        key={item.id}
                        src={item.image}
                        alt={`Preview of ${item.name} gift item`}
                        className="w-8 h-8 rounded object-cover"
                      />
                    ))}
                    {wishlist.itemCount > 3 && (
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs text-text-secondary font-medium">
                          +{wishlist.itemCount - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href={`/wishlist/${wishlist.id}`}
                    className="inline-flex items-center space-x-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                  >
                    <span>View Wishlist</span>
                    <Icon name="ArrowRightIcon" size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {wishlists.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            View All Shared Wishlists
          </button>
        </div>
      )}
    </div>
  );
};

export default SharedWishlists;