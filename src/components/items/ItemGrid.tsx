import React from 'react';
import { ItemCard } from './ItemCard';
import { Pagination } from '../ui/Pagination';
import { Item } from '../../types';

interface ItemGridProps {
  items: Item[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemClick?: (item: Item) => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  currentPage,
  totalPages,
  onPageChange,
  onItemClick,
}) => {
  // Calculate visible items for current page
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="mt-2 text-xl font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visibleItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                image={item.image}
                description={item.description}
                onClick={onItemClick ? () => onItemClick(item) : undefined}
              />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="py-4"
          />
        </>
      )}
    </div>
  );
};