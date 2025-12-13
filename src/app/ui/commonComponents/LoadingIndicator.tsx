'use client';

import React from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'pulse' | 'skeleton';
  className?: string;
  showIcon?: boolean;
}

const LoadingIndicator = ({
  message = 'Loading...',
  size = 'medium',
  variant = 'spinner',
  className = '',
  showIcon = true,
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    small: {
      container: 'space-y-2',
      icon: 16,
      text: 'text-sm',
      skeleton: 'h-4',
    },
    medium: {
      container: 'space-y-3',
      icon: 24,
      text: 'text-base',
      skeleton: 'h-6',
    },
    large: {
      container: 'space-y-4',
      icon: 32,
      text: 'text-lg',
      skeleton: 'h-8',
    },
  };

  const currentSize = sizeClasses[size];

  const renderSpinner = () => (
    <div className={`flex flex-col items-center justify-center ${currentSize.container} ${className}`}>
      {showIcon && (
        <Icon
          name="ArrowPathIcon"
          size={currentSize.icon}
          className="text-primary animate-spin"
        />
      )}
      {message && (
        <p className={`text-text-secondary font-medium ${currentSize.text}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderPulse = () => (
    <div className={`flex flex-col items-center justify-center ${currentSize.container} ${className}`}>
      <div
        className={`bg-primary rounded-full animate-pulse-gentle`}
        style={{
          width: currentSize.icon,
          height: currentSize.icon,
        }}
      />
      {message && (
        <p className={`text-text-secondary font-medium ${currentSize.text}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderSkeleton = () => (
    <div className={`space-y-3 ${className}`}>
      <div className={`bg-muted rounded animate-pulse-gentle w-full ${currentSize.skeleton}`} />
      <div className={`bg-muted rounded animate-pulse-gentle w-3/4 ${currentSize.skeleton}`} />
      <div className={`bg-muted rounded animate-pulse-gentle w-1/2 ${currentSize.skeleton}`} />
      {message && (
        <p className={`text-text-secondary font-medium ${currentSize.text} mt-4`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return renderVariant();
};

export default LoadingIndicator;