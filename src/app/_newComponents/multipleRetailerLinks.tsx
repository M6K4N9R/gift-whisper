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
