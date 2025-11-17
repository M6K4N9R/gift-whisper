'use client';

import React, { useState } from 'react';
import Icon from '@/app/ui/commonComponents/AppIcon';
import ActionButton from '@/app/ui/commonComponents/ActionButton';

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
    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
          setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, newTag.trim()]
          }));
          setNewTag('');
        }
      };
    
      const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
          ...prev,
          tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
      };
    
      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addTag();
        }
      };
      return (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="PencilIcon" size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Product Details</h3>
                <p className="text-sm text-text-secondary">Fill in the product information</p>
              </div>
            </div>
          </div>
    
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
                    Product Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter product name"
                    className={`w-full px-4 py-3 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.title ? 'border-error' : 'border-border'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-error">{errors.title}</p>
                  )}
                </div>
    
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-text-primary mb-2">
                    Price *
                  </label>
                  <input
                    id="price"
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="$29.99"
                    className={`w-full px-4 py-3 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.price ? 'border-error' : 'border-border'
                    }`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-error">{errors.price}</p>
                  )}
                </div>
    
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div>
                  <label htmlFor="wishlist" className="block text-sm font-medium text-text-primary mb-2">
                    Add to Wishlist *
                  </label>
                  <select
                    id="wishlist"
                    value={formData.wishlistId}
                    onChange={(e) => handleInputChange('wishlistId', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.wishlistId ? 'border-error' : 'border-border'
                    }`}
                  >
                    <option value="">Select a wishlist</option>
                    {availableWishlists.map((wishlist) => (
                      <option key={wishlist.id} value={wishlist.id}>
                        {wishlist.name}
                      </option>
                    ))}
                  </select>
                  {errors.wishlistId && (
                    <p className="mt-1 text-sm text-error">{errors.wishlistId}</p>
                  )}
                </div>
              </div>
    
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the product..."
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Priority Level
                  </label>
                  <div className="space-y-2">
                    {priorityLevels.map((level) => (
                      <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={level.value}
                          checked={formData.priority === level.value}
                          onChange={(e) => handleInputChange('priority', parseInt(e.target.value))}
                          className="w-4 h-4 text-primary border-border focus:ring-primary"
                        />
                        <span className={`text-sm font-medium ${level.color}`}>
                          {level.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
    
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-2">
                    Personal Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add notes for gift-givers..."
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
    
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-primary hover:text-primary/70"
                    >
                      <Icon name="XMarkIcon" size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
                <ActionButton
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  size="sm"
                  disabled={!newTag.trim()}
                  icon="PlusIcon"
                >
                  Add
                </ActionButton>
              </div>
            </div>
    
            <div className="flex space-x-4 pt-4 border-t border-border">
              <ActionButton
                type="submit"
                loading={isSubmitting}
                loadingText="Adding to wishlist..."
                disabled={isSubmitting}
                icon="PlusIcon"
                className="flex-1"
              >
                Add to Wishlist
              </ActionButton>
              <ActionButton
                type="button"
                onClick={onCancel}
                variant="outline"
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </ActionButton>
            </div>
          </form>
        </div>
      );
    };
    
    export default ManualProductForm;
