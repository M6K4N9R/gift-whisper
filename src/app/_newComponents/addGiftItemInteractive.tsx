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

const AddGiftItemInteractive = () => {
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Form states
    const [currentStep, setCurrentStep] = useState<'url' | 'extracted' | 'manual'>('url');
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractionError, setExtractionError] = useState('');
    const [extractedProduct, setExtractedProduct] = useState<ExtractedProduct | null>(null);
    const [retailerLinks, setRetailerLinks] = useState<RetailerLink[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
  