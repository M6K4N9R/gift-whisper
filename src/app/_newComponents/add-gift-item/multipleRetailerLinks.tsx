'use client';

import React, { useState } from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';
import ActionButton from '@/app/ui/commonComponents/ActionButton';

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
const calculatePriceRange = () => {
    const validLinks = links.filter(link => link.status === 'valid' && link.price);
    if (validLinks.length === 0) return null;

    const prices = validLinks.map(link => {
      const priceStr = link.price.replace(/[$,]/g, '');
      return parseFloat(priceStr);
    }).filter(price => !isNaN(price));

    if (prices.length === 0) return null;

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max, count: prices.length };
  };

  const priceRange = calculatePriceRange();

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="BuildingStorefrontIcon" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Multiple Retailer Links</h3>
          <p className="text-sm text-text-secondary">Add links from different stores for price comparison</p>
        </div>
      </div>

      {/* Price Range Display */}
      {priceRange && (
        <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Price Range</p>
              <p className="text-2xl font-bold text-accent">
                ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">{priceRange.count} retailers</p>
              <p className="text-sm font-medium text-success">
                Save up to ${(priceRange.max - priceRange.min).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Link */}
      <div className="mb-6">
        <label htmlFor="new-retailer-url" className="block text-sm font-medium text-text-primary mb-2">
          Add Another Retailer Link
        </label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              id="new-retailer-url"
              type="url"
              value={newUrl}
              onChange={handleUrlChange}
              placeholder="https://retailer.com/product-page"
              className={`w-full px-4 py-3 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                urlError ? 'border-error' : 'border-border'
              }`}
              disabled={isLoading}
            />
            {urlError && (
              <p className="mt-1 text-sm text-error">{urlError}</p>
            )}
          </div>
          <ActionButton
            onClick={handleAddLink}
            disabled={!newUrl.trim() || isLoading}
            icon="PlusIcon"
            variant="outline"
          >
            Add Link
          </ActionButton>
        </div>
      </div>

      {/* Existing Links */}
      {links.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Added Retailer Links ({links.length})</h4>
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-text-primary">{link.retailer}</span>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(link.status)}
                      <span className="text-xs text-text-secondary">{getStatusText(link.status)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary truncate">{link.url}</p>
                  {link.price && link.status === 'valid' && (
                    <p className="text-lg font-semibold text-primary mt-1">{link.price}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {link.status === 'invalid' && (
                    <ActionButton
                      onClick={() => onValidateLink(link.id)}
                      size="sm"
                      variant="outline"
                      icon="ArrowPathIcon"
                    >
                      Retry
                    </ActionButton>
                  )}
                  <button
                    onClick={() => onRemoveLink(link.id)}
                    className="p-2 text-text-secondary hover:text-error transition-colors"
                    aria-label="Remove link"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {links.length === 0 && (
        <div className="text-center py-8">
          <Icon name="BuildingStorefrontIcon" size={48} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No retailer links added yet</p>
          <p className="text-sm text-text-secondary mt-1">Add multiple links to compare prices</p>
        </div>
      )}
    </div>
  );
};

export default MultipleRetailerLinks;