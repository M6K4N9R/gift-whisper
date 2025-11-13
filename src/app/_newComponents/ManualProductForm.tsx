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

