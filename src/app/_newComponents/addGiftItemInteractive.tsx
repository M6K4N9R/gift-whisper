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
    
      const handleAddRetailerLink = async (url: string) => {
        const newLink: RetailerLink = {
          id: Date.now().toString(),
          url,
          retailer: 'Unknown Retailer',
          price: '',
          status: 'checking'
        };
    
        setRetailerLinks((prev) => [...prev, newLink]);
    
        // Simulate validation
        setTimeout(() => {
          setRetailerLinks((prev) => prev.map((link) =>
          link.id === newLink.id ?
          {
            ...link,
            retailer: 'eBay',
            price: '$' + (Math.random() * 100 + 50).toFixed(2),
            status: Math.random() > 0.2 ? 'valid' : 'invalid' as const
          } :
          link
          ));
        }, 1500);
      };
    
      const handleRemoveRetailerLink = (id: string) => {
        setRetailerLinks((prev) => prev.filter((link) => link.id !== id));
      };
    
      const handleValidateLink = async (id: string) => {
        setRetailerLinks((prev) => prev.map((link) =>
        link.id === id ? { ...link, status: 'checking' as const } : link
        ));
    
        setTimeout(() => {
          setRetailerLinks((prev) => prev.map((link) =>
          link.id === id ?
          {
            ...link,
            status: Math.random() > 0.5 ? 'valid' : 'invalid' as const,
            price: Math.random() > 0.5 ? '$' + (Math.random() * 100 + 50).toFixed(2) : ''
          } :
          link
          ));
        }, 1000);
      };
    
      const handleFormSubmit = async (formData: ProductFormData) => {
        setIsSubmitting(true);
    
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
    
          setShowSuccess(true);
    
          // Reset form after success
          setTimeout(() => {
            setShowSuccess(false);
            setCurrentStep('url');
            setExtractedProduct(null);
            setRetailerLinks([]);
          }, 3000);
    
        } catch (error) {
          console.error('Error adding gift item:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
    
      const handleCancel = () => {
        setCurrentStep('url');
        setExtractedProduct(null);
        setRetailerLinks([]);
        setExtractionError('');
      };
    
      const handleSkipToManual = () => {
        setCurrentStep('manual');
        setExtractedProduct(null);
        setRetailerLinks([]);
      };
    
      if (!isHydrated) {
        return (
          <div className="min-h-screen bg-background">
            <div className="animate-pulse">
              <div className="h-16 bg-muted"></div>
              <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="h-8 bg-muted rounded mb-4"></div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>);
    
      }
    
      if (showSuccess) {
        return (
          <div className="min-h-screen bg-background">
            <Header
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              userName={userData?.name} />
    
            
            <main className="pt-16 min-h-screen">
              <div className="max-w-2xl mx-auto px-4 py-16">
                <div className="text-center">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircleIcon" size={40} className="text-success" />
                  </div>
                  <h1 className="text-3xl font-bold text-text-primary mb-4">
                    Gift Item Added Successfully!
                  </h1>
                  <p className="text-text-secondary mb-8">
                    Your gift item has been added to your wishlist and is now available for sharing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <ActionButton
                      onClick={() => router.push('/user-dashboard')}
                      icon="HomeIcon">
    
                      Go to Dashboard
                    </ActionButton>
                    <ActionButton
                      onClick={() => setShowSuccess(false)}
                      variant="outline"
                      icon="PlusIcon">
    
                      Add Another Item
                    </ActionButton>
                  </div>
                </div>
              </div>
            </main>
          </div>);
    
      }
    
      
  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        userName={userData?.name} />

      
      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="GiftIcon" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Add Gift Item</h1>
                <p className="text-text-secondary">Add a new item to your wishlist with automatic information extraction</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep === 'url' ? 'text-primary' : 'text-text-secondary'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'url' ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}`
                }>
                  1
                </div>
                <span className="text-sm font-medium">Product URL</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 ${currentStep === 'extracted' ? 'text-primary' : 'text-text-secondary'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'extracted' ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}`
                }>
                  2
                </div>
                <span className="text-sm font-medium">Review & Edit</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 ${currentStep === 'manual' ? 'text-primary' : 'text-text-secondary'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'manual' ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}`
                }>
                  3
                </div>
                <span className="text-sm font-medium">Final Details</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {currentStep === 'url' &&
            <>
                <ProductUrlInput
                onUrlSubmit={handleUrlSubmit}
                isLoading={isExtracting}
                error={extractionError} />

                
                <div className="text-center">
                  <p className="text-text-secondary mb-4">Or skip automatic extraction</p>
                  <ActionButton
                  onClick={handleSkipToManual}
                  variant="outline"
                  icon="PencilIcon">

                    Enter Details Manually
                  </ActionButton>
                </div>
              </>
            }

            {currentStep === 'extracted' && extractedProduct &&
            <>
                <ExtractedProductInfo
                product={extractedProduct}
                isVisible={true} />

                
                <MultipleRetailerLinks
                links={retailerLinks}
                onAddLink={handleAddRetailerLink}
                onRemoveLink={handleRemoveRetailerLink}
                onValidateLink={handleValidateLink}
                isLoading={false} />

                
                <div className="flex justify-center">
                  <ActionButton
                  onClick={() => setCurrentStep('manual')}
                  icon="ArrowRightIcon"
                  size="lg">

                    Continue to Final Details
                  </ActionButton>
                </div>
              </>
            }

            {currentStep === 'manual' &&
            <ManualProductForm
              initialData={extractedProduct ? {
                title: extractedProduct.title,
                description: extractedProduct.description,
                price: extractedProduct.price,
                wishlistId: mockWishlists[0].id
              } : undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              availableWishlists={mockWishlists} />

            }
          </div>
        </div>
      </main>
    </div>);

};

export default AddGiftItemInteractive;