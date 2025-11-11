import React from 'react';


interface ExtractedProduct {
  title: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  retailer: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
}

interface ExtractedProductInfoProps {
  product: ExtractedProduct | null;
  isVisible: boolean;
}
