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
  
    
  // Mock data
  const mockWishlists = [
    { id: '1', name: 'Birthday Wishlist 2024' },
    { id: '2', name: 'Holiday Gifts' },
    { id: '3', name: 'Wedding Registry' },
    { id: '4', name: 'Everyday Wants' }];
  
  
    const mockExtractedProducts: Record<string, ExtractedProduct> = {
      'amazon.com': {
        title: 'Apple AirPods Pro (2nd Generation)',
        description: 'Active Noise Cancellation, Transparency mode, Spatial audio, and up to 6 hours of listening time with ANC enabled. The MagSafe Charging Case delivers more than 24 hours of battery life.',
        price: '$249.99',
        image: "https://images.unsplash.com/photo-1631677624302-55e6178078f1",
        alt: 'White Apple AirPods Pro earbuds in open charging case on white background',
        retailer: 'Amazon',
        availability: 'in-stock'
      },
      'target.com': {
        title: 'Nintendo Switch OLED Model Console',
        description: 'Get the gaming system that lets you play the games you want, wherever you are, however you like. Includes the Nintendo Switch console and Nintendo Switch dock in white.',
        price: '$349.99',
        image: "https://images.unsplash.com/photo-1613750629907-e8f64ea16396",
        alt: 'Nintendo Switch gaming console with colorful Joy-Con controllers on gaming setup',
        retailer: 'Target',
        availability: 'limited'
      },
      'bestbuy.com': {
        title: 'Sony WH-1000XM4 Wireless Headphones',
        description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charge. Touch Sensor controls to pause play skip tracks.',
        price: '$279.99',
        image: "https://images.unsplash.com/photo-1584433202630-5dc24e240130",
        alt: 'Black Sony over-ear wireless headphones on modern desk setup',
        retailer: 'Best Buy',
        availability: 'in-stock'
      }
    };
    useEffect(() => {
        setIsHydrated(true);
    
        const token = localStorage.getItem('authToken');
        const userDataStr = localStorage.getItem('userData');
    
        if (token && userDataStr) {
          try {
            const user = JSON.parse(userDataStr);
            setUserData(user);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error parsing user data:', error);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
        router.push('/user-login');
      };
    
      const handleUrlSubmit = async (url: string) => {
        setIsExtracting(true);
        setExtractionError('');
    
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 2000));
    
          // Mock extraction based on URL
          const domain = new URL(url).hostname.toLowerCase();
          let product = null;
    
          for (const [key, mockProduct] of Object.entries(mockExtractedProducts)) {
            if (domain.includes(key)) {
              product = mockProduct;
              break;
            }
          }
    
          if (product) {
            setExtractedProduct(product);
            setCurrentStep('extracted');
    
            // Add initial retailer link
            const newLink: RetailerLink = {
              id: Date.now().toString(),
              url,
              retailer: product.retailer,
              price: product.price,
              status: 'valid'
            };
            setRetailerLinks([newLink]);
          } else {
            throw new Error('Unable to extract product information from this URL');
          }
        } catch (error) {
          setExtractionError(error instanceof Error ? error.message : 'Failed to extract product information');
        } finally {
          setIsExtracting(false);
        }
      };
    