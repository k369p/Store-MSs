import React, { useEffect, useState } from 'react';
import { Search } from '../components/ui/Search';
import { ItemGrid } from '../components/items/ItemGrid';
import { useItems } from '../contexts/ItemsContext';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { state, getItems, searchItems, setPage, setCurrentItem } = useItems();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      await getItems();
      setIsLoading(false);
    };
    
    fetchItems();
  }, []);

  const handleSearch = (query: string) => {
    searchItems(query);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (item: any) => {
    setCurrentItem(item);
    navigate(`/items/${item.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          Welcome to StoreManager
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Browse our collection of high-quality products
        </p>
        
        <Search 
          onSearch={handleSearch} 
          placeholder="Search by name, description, or category..." 
          className="max-w-2xl mx-auto"
          initialValue={state.searchQuery}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ItemGrid
          items={state.filteredItems}
          currentPage={state.currentPage}
          totalPages={state.totalPages}
          onPageChange={handlePageChange}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};