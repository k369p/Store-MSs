import React, { useEffect, useState } from 'react';
import { useItems } from '../contexts/ItemsContext';
import { Search } from '../components/ui/Search';
import { StockIndicator } from '../components/items/StockIndicator';
import { Button } from '../components/ui/Button';
import { Edit, Trash2, Plus, Filter } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const { state, getItems, searchItems } = useItems();
  const [sortField, setSortField] = useState<'name' | 'price' | 'stock' | 'category'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');
  
  useEffect(() => {
    if (state.items.length === 0) {
      getItems();
    }
  }, []);

  const handleSearch = (query: string) => {
    searchItems(query);
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort items
  const filterItems = () => {
    let filteredItems = [...state.filteredItems];
    
    // Apply stock filter
    if (filter === 'in-stock') {
      filteredItems = filteredItems.filter(item => item.stock > 5);
    } else if (filter === 'low-stock') {
      filteredItems = filteredItems.filter(item => item.stock > 0 && item.stock <= 5);
    } else if (filter === 'out-of-stock') {
      filteredItems = filteredItems.filter(item => item.stock === 0);
    }
    
    // Apply sorting
    filteredItems.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'stock') {
        comparison = a.stock - b.stock;
      } else if (sortField === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return filteredItems;
  };
  
  const items = filterItems();
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Get sort icon
  const getSortIcon = (field: typeof sortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? 
      <span className="ml-1">↑</span> : 
      <span className="ml-1">↓</span>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <Button 
          variant="primary" 
          size="sm"
          icon={<Plus className="h-4 w-4" />}
        >
          Add Item
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Search 
            onSearch={handleSearch} 
            placeholder="Search items..." 
            className="flex-grow"
            initialValue={state.searchQuery}
          />
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All items</option>
              <option value="in-stock">In stock</option>
              <option value="low-stock">Low stock</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <span className="flex items-center">
                    Name {getSortIcon('name')}
                  </span>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <span className="flex items-center">
                    Price {getSortIcon('price')}
                  </span>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <span className="flex items-center">
                    Stock {getSortIcon('stock')}
                  </span>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <span className="flex items-center">
                    Category {getSortIcon('category')}
                  </span>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(item.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StockIndicator stock={item.stock} showText />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {items.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};