'use client';

import React, { useState } from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';
import ActionButton from '@/app/ui/commonComponents/ActionButton';

interface ProductUrlInputProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
  error?: string;
}

const ProductUrlInput = ({ onUrlSubmit, isLoading, error }: ProductUrlInputProps) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const urlObj = new URL(inputUrl);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setUrlError('Please enter a product URL');
      return;
    }

    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL (must start with http:// or https://)');
      return;
    }

    setUrlError('');
    onUrlSubmit(url.trim());
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (urlError && newUrl.trim()) {
      setUrlError('');
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="LinkIcon" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Add Product URL</h3>
          <p className="text-sm text-text-secondary">Paste a product link to automatically extract details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product-url" className="block text-sm font-medium text-text-primary mb-2">
            Product URL
          </label>
          <div className="relative">
            <input
              id="product-url"
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com/product-page"
              className={`w-full px-4 py-3 pr-12 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                urlError || error ? 'border-error' : 'border-border'
              }`}
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Icon 
                name="GlobeAltIcon" 
                size={20} 
                className="text-text-secondary" 
              />
            </div>
          </div>
          {(urlError || error) && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationTriangleIcon" size={16} />
              <span>{urlError || error}</span>
            </p>
          )}
        </div>

        <ActionButton
          type="submit"
          loading={isLoading}
          loadingText="Extracting product info..."
          disabled={!url.trim() || isLoading}
          icon="MagnifyingGlassIcon"
          fullWidth
        >
          Extract Product Information
        </ActionButton>
      </form>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-2">Supported Retailers</h4>
        <div className="flex flex-wrap gap-2">
          {['Amazon', 'eBay', 'Target', 'Walmart', 'Best Buy', 'Etsy'].map((retailer) => (
            <span
              key={retailer}
              className="px-2 py-1 bg-surface border border-border rounded text-xs text-text-secondary"
            >
              {retailer}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductUrlInput;