'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ProductUrlInput from './ProductUrlInput';
import ExtractedProductInfo from './ExtractedProductInfo';
import ManualProductForm from './ManualProductForm';
import MultipleRetailerLinks from './MultipleRetailerLinks';
import ActionButton from '@/components/common/ActionButton';
import Icon from '@/components/ui/AppIcon';

interface ExtractedProduct {
  title: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  retailer: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
}

interface RetailerLink {
  id: string;
  url: string;
  retailer: string;
  price: string;
  status: 'valid' | 'invalid' | 'checking';
}

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  priority: number;
  notes: string;
  tags: string[];
  wishlistId: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}
