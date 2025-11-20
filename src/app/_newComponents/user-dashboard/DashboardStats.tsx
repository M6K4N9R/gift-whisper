import React from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';

interface DashboardStatsProps {
  stats: {
    totalWishlists: number;
    totalItems: number;
    sharedWishlists: number;
    publicWishlists: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statItems = [
    {
      label: 'Total Wishlists',
      value: stats.totalWishlists,
      icon: 'ListBulletIcon',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Total Items',
      value: stats.totalItems,
      icon: 'GiftIcon',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Shared',
      value: stats.sharedWishlists,
      icon: 'ShareIcon',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Public',
      value: stats.publicWishlists,
      icon: 'GlobeAltIcon',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <Icon 
                name={item.icon as any} 
                size={20} 
                className={item.color}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {item.value.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary">
                {item.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;