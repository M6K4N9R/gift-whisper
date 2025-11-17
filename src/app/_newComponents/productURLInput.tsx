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
