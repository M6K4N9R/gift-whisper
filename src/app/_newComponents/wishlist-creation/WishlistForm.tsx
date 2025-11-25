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
