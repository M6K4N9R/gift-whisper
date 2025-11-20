import React from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';

interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'shared' | 'item_added';
  title: string;
  description: string;
  timestamp: string;
  wishlistName?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'created':
        return 'PlusCircleIcon';
      case 'updated':
        return 'PencilSquareIcon';
      case 'shared':
        return 'ShareIcon';
      case 'item_added':
        return 'GiftIcon';
      default:
        return 'BellIcon';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'created':
        return 'text-success';
      case 'updated':
        return 'text-primary';
      case 'shared':
        return 'text-accent';
      case 'item_added':
        return 'text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        <Icon name="ClockIcon" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ExclamationCircleIcon" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No recent activity</p>
            <p className="text-sm text-text-secondary mt-1">
              Start creating wishlists to see your activity here
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200">
              <div className={`p-1.5 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                <Icon 
                  name={getActivityIcon(activity.type) as any} 
                  size={16} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {activity.title}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {activity.description}
                </p>
                {activity.wishlistName && (
                  <p className="text-xs text-primary mt-1 font-medium">
                    {activity.wishlistName}
                  </p>
                )}
              </div>
              <span className="text-xs text-text-secondary whitespace-nowrap">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;