'use client';

import React, { useState } from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';
import AppImage from '@/app/ui/commonComponents/AppImage';
import ActionButton from '@/app/ui/commonComponents/ActionButton';

interface WishlistFormData {
  title: string;
  description: string;
  category: string;
  privacy: 'public' | 'private';
  coverImage: string | null;
  template: string;
  currency: string;
  notifications: boolean;
  allowCollaboration: boolean;
}

interface WishlistFormProps {
  onSubmit: (data: WishlistFormData) => void;
  isLoading: boolean;
}

const WishlistForm = ({ onSubmit, isLoading }: WishlistFormProps) => {
  const [formData, setFormData] = useState<WishlistFormData>({
    title: '',
    description: '',
    category: '',
    privacy: 'private',
    coverImage: null,
    template: '',
    currency: 'USD',
    notifications: true,
    allowCollaboration: false,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'birthday', label: 'Birthday', icon: 'CakeIcon' },
    { value: 'wedding', label: 'Wedding', icon: 'HeartIcon' },
    { value: 'holiday', label: 'Holiday', icon: 'GiftIcon' },
    { value: 'baby-shower', label: 'Baby Shower', icon: 'SparklesIcon' },
    { value: 'graduation', label: 'Graduation', icon: 'AcademicCapIcon' },
    { value: 'anniversary', label: 'Anniversary', icon: 'CalendarDaysIcon' },
    { value: 'general', label: 'General', icon: 'ListBulletIcon' },
  ];

  const templates = [
    { value: '', label: 'Start from scratch' },
    { value: 'birthday-essentials', label: 'Birthday Essentials' },
    { value: 'wedding-registry', label: 'Wedding Registry' },
    { value: 'holiday-wishes', label: 'Holiday Wishes' },
    { value: 'tech-gadgets', label: 'Tech & Gadgets' },
    { value: 'home-decor', label: 'Home & Decor' },
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Wishlist title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof WishlistFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('coverImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
          <Icon name="InformationCircleIcon" size={20} className="mr-2 text-primary" />
          Basic Information
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
              Wishlist Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Sarah's Birthday Wishlist"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                errors.title ? 'border-error' : 'border-border'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell others what this wishlist is for..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${
                errors.description ? 'border-error' : 'border-border'
              }`}
            />
            <div className="mt-1 flex justify-between items-center">
              {errors.description ? (
                <p className="text-sm text-error flex items-center">
                  <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                  {errors.description}
                </p>
              ) : (
                <span className="text-sm text-text-secondary">
                  Optional - Help others understand your wishlist
                </span>
              )}
              <span className="text-sm text-text-secondary">
                {formData.description.length}/500
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleInputChange('category', category.value)}
                  className={`p-4 border rounded-lg text-center transition-all hover:border-primary ${
                    formData.category === category.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={category.icon as any} size={24} className="mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="mt-2 text-sm text-error flex items-center">
                <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                {errors.category}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
          <Icon name="PhotoIcon" size={20} className="mr-2 text-primary" />
          Cover Image
        </h2>

        <div className="space-y-4">
          {formData.coverImage ? (
            <div className="relative">
              <AppImage
                src={formData.coverImage}
                alt="Wishlist cover image preview showing uploaded photo"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleInputChange('coverImage', null)}
                className="absolute top-2 right-2 p-2 bg-error text-error-foreground rounded-full hover:bg-error/90 transition-colors"
              >
                <Icon name="XMarkIcon" size={16} />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <Icon name="CloudArrowUpIcon" size={48} className="mx-auto mb-4 text-text-secondary" />
              <p className="text-text-primary font-medium mb-2">
                Drag and drop an image here, or click to browse
              </p>
              <p className="text-sm text-text-secondary mb-4">
                PNG, JPG, GIF up to 10MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                className="hidden"
                id="cover-image"
              />
              <label
                htmlFor="cover-image"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Icon name="PhotoIcon" size={16} className="mr-2" />
                Choose Image
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
          <Icon name="DocumentDuplicateIcon" size={20} className="mr-2 text-primary" />
          Template Selection
        </h2>

        <div className="space-y-3">
          {templates.map((template) => (
            <label
              key={template.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                formData.template === template.value
                  ? 'border-primary bg-primary/5' :'border-border'
              }`}
            >
              <input
                type="radio"
                name="template"
                value={template.value}
                checked={formData.template === template.value}
                onChange={(e) => handleInputChange('template', e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                formData.template === template.value
                  ? 'border-primary' :'border-border'
              }`}>
                {formData.template === template.value && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span className="font-medium text-text-primary">{template.label}</span>
            </label>
          ))}
        </div>
      </div>
