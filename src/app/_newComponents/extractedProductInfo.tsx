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

const ExtractedProductInfo = ({ product, isVisible }: ExtractedProductInfoProps) => {
    if (!isVisible || !product) {
      return null;
    }
  
    const getAvailabilityColor = (availability: string) => {
      switch (availability) {
        case 'in-stock':
          return 'text-success bg-success/10';
        case 'out-of-stock':
          return 'text-error bg-error/10';
        case 'limited':
          return 'text-warning bg-warning/10';
        default:
          return 'text-text-secondary bg-muted';
      }
    };
  
    const getAvailabilityText = (availability: string) => {
      switch (availability) {
        case 'in-stock':
          return 'In Stock';
        case 'out-of-stock':
          return 'Out of Stock';
        case 'limited':
          return 'Limited Stock';
        default:
          return 'Unknown';
      }
    };
  
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="CheckCircleIcon" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Product Information Extracted</h3>
            <p className="text-sm text-text-secondary">Review and edit the details below</p>
          </div>
        </div>
  
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Product Image
              </label>
              <div className="w-full h-48 bg-muted rounded-lg overflow-hidden border border-border">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="BuildingStorefrontIcon" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">{product.retailer}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(product.availability)}`}>
                {getAvailabilityText(product.availability)}
              </span>
            </div>
          </div>
  
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Product Title
              </label>
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-text-primary font-medium">{product.title}</p>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <div className="p-3 bg-muted rounded-lg border border-border max-h-32 overflow-y-auto">
                <p className="text-text-secondary text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Price
              </label>
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm text-text-primary font-medium">Information Extracted Successfully</p>
              <p className="text-sm text-text-secondary mt-1">
                You can edit any of these details in the form below before adding to your wishlist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ExtractedProductInfo;