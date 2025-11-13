'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ActionButton from '@/components/common/ActionButton';

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

interface ManualProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  availableWishlists: Array<{ id: string; name: string; }>;
}

const ManualProductForm = ({ 
    initialData, 
    onSubmit, 
    onCancel, 
    isSubmitting,
    availableWishlists 
  }: ManualProductFormProps) => {
    const [formData, setFormData] = useState<ProductFormData>({
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || '',
      category: initialData?.category || '',
      priority: initialData?.priority || 3,
      notes: initialData?.notes || '',
      tags: initialData?.tags || [],
      wishlistId: initialData?.wishlistId || (availableWishlists[0]?.id || ''),
    });
  
    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  
    const categories = [
      'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports & Outdoors',
      'Toys & Games', 'Beauty & Personal Care', 'Jewelry', 'Art & Crafts', 'Other'
    ];
  
    const priorityLevels = [
      { value: 1, label: 'Low Priority', color: 'text-text-secondary' },
      { value: 2, label: 'Medium-Low', color: 'text-text-secondary' },
      { value: 3, label: 'Medium', color: 'text-warning' },
      { value: 4, label: 'Medium-High', color: 'text-primary' },
      { value: 5, label: 'High Priority', color: 'text-error' },
    ];
  
    const validateForm = (): boolean => {
      const newErrors: Partial<ProductFormData> = {};
  
      if (!formData.title.trim()) {
        newErrors.title = 'Product title is required';
      }
  
      if (!formData.price.trim()) {
        newErrors.price = 'Price is required';
      } else if (!/^\$?\d+(\.\d{2})?$/.test(formData.price.replace(/,/g, ''))) {
        newErrors.price = 'Please enter a valid price (e.g., $29.99 or 29.99)';
      }
  
      if (!formData.wishlistId) {
        newErrors.wishlistId = 'Please select a wishlist';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (validateForm()) {
        onSubmit(formData);
      }
    };
  
    const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    };
  
