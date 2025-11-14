'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ActionButton from '@/components/common/ActionButton';

interface RetailerLink {
  id: string;
  url: string;
  retailer: string;
  price: string;
  status: 'valid' | 'invalid' | 'checking';
}

interface MultipleRetailerLinksProps {
  links: RetailerLink[];
  onAddLink: (url: string) => void;
  onRemoveLink: (id: string) => void;
  onValidateLink: (id: string) => void;
  isLoading: boolean;
}
const MultipleRetailerLinks = ({ 
  links, 
  onAddLink, 
  onRemoveLink, 
  onValidateLink,
  isLoading 
}: MultipleRetailerLinksProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleAddLink = () => {
    if (!newUrl.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!validateUrl(newUrl)) {
      setUrlError('Please enter a valid URL');
      return;
    }

    const isDuplicate = links.some(link => link.url === newUrl.trim());
    if (isDuplicate) {
      setUrlError('This URL has already been added');
      return;
    }

    setUrlError('');
    onAddLink(newUrl.trim());
    setNewUrl('');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewUrl(url);
    
    if (urlError && url.trim()) {
      setUrlError('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <Icon name="CheckCircleIcon" size={16} className="text-success" />;
      case 'invalid':
        return <Icon name="XCircleIcon" size={16} className="text-error" />;
      case 'checking':
        return <Icon name="ArrowPathIcon" size={16} className="text-warning animate-spin" />;
      default:
        return <Icon name="ClockIcon" size={16} className="text-text-secondary" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid':
        return 'Valid';
      case 'invalid':
        return 'Invalid';
      case 'checking':
        return 'Checking...';
      default:
        return 'Pending';
    }
  };
