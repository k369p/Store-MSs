import React from 'react';
import { Badge } from '../ui/Badge';

interface StockIndicatorProps {
  stock: number;
  showText?: boolean;
  className?: string;
}

export const StockIndicator: React.FC<StockIndicatorProps> = ({
  stock,
  showText = true,
  className = '',
}) => {
  let variant: 'success' | 'warning' | 'danger';
  let label: string;

  if (stock === 0) {
    variant = 'danger';
    label = 'Out of Stock';
  } else if (stock <= 5) {
    variant = 'warning';
    label = 'Low Stock';
  } else {
    variant = 'success';
    label = 'In Stock';
  }

  return (
    <Badge variant={variant} className={className}>
      {showText ? label : stock}
    </Badge>
  );
};