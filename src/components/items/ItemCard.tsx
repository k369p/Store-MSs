import React from 'react';
import { Card, CardImage, CardBody, CardTitle, CardText } from '../ui/Card';
import { StockIndicator } from './StockIndicator';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { ShoppingCart } from 'lucide-react';

interface ItemCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  onClick?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  name,
  price,
  stock,
  image,
  description,
  onClick,
}) => {
  const { addItem } = useCart();
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      stock,
      image,
      description: description || '',
      category: '',
      createdAt: '',
      updatedAt: '',
    });
  };

  return (
    <Card 
      hoverable 
      onClick={onClick}
      className="h-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="relative">
        <CardImage 
          src={image} 
          alt={name} 
          className="h-48 sm:h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <StockIndicator stock={stock} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-white/90 font-semibold">{formatPrice(price)}</p>
        </div>
      </div>
      
      <CardBody className="flex flex-col justify-between">
        {description && (
          <CardText className="text-sm line-clamp-2 mb-4">{description}</CardText>
        )}
        
        <div className="mt-auto">
          <Button 
            variant="primary" 
            fullWidth
            disabled={stock === 0}
            onClick={handleAddToCart}
            icon={<ShoppingCart className="h-4 w-4" />}
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};