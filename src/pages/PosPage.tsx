import React, { useEffect, useState } from 'react';
import { useItems } from '../contexts/ItemsContext';
import { useCart } from '../contexts/CartContext';
import { Search } from '../components/ui/Search';
import { Card, CardBody } from '../components/ui/Card';
import { ItemCard } from '../components/items/ItemCard';
import { Button } from '../components/ui/Button';
import { Plus, Minus, Trash2, CreditCard, DollarSign } from 'lucide-react';

export const PosPage: React.FC = () => {
  const { state: itemsState, getItems, searchItems } = useItems();
  const { state: cartState, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (itemsState.items.length === 0) {
      getItems();
    }
  }, []);
  
  useEffect(() => {
    if (itemsState.items.length > 0) {
      // Extract unique categories
      const uniqueCategories = [...new Set(itemsState.items.map(item => item.category))];
      setCategories(uniqueCategories);
    }
  }, [itemsState.items]);
  
  const handleSearch = (query: string) => {
    searchItems(query);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      searchItems('');
    } else {
      searchItems(category);
    }
  };
  
  // Filter items by category for display in the grid
  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return itemsState.filteredItems;
    } else {
      return itemsState.filteredItems.filter(item => item.category === activeCategory);
    }
  };
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Point of Sale</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Grid - Takes 2/3 of the screen on large devices */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Search 
                onSearch={handleSearch} 
                placeholder="Search products..." 
                className="flex-grow"
                initialValue={itemsState.searchQuery}
              />
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${activeCategory === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  All
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${activeCategory === category 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {getFilteredItems().map(item => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                image={item.image}
              />
            ))}
          </div>
          
          {getFilteredItems().length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No items found</p>
            </div>
          )}
        </div>
        
        {/* Cart - Takes 1/3 of the screen on large devices */}
        <div>
          <Card className="sticky top-20">
            <div className="bg-gray-800 text-white p-4">
              <h2 className="text-lg font-semibold">Current Sale</h2>
            </div>
            
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {cartState.items.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>Cart is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartState.items.map((item) => (
                    <li key={item.id} className="p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.name}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {formatPrice(item.price)} each
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <span className="w-8 text-center">{item.quantity}</span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Subtotal</span>
                <span>{formatPrice(cartState.total)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="font-medium">Tax (7%)</span>
                <span>{formatPrice(cartState.total * 0.07)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>{formatPrice(cartState.total * 1.07)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<DollarSign className="h-5 w-5" />}
                  disabled={cartState.items.length === 0}
                >
                  Cash
                </Button>
                
                <Button
                  variant="primary"
                  fullWidth
                  icon={<CreditCard className="h-5 w-5" />}
                  disabled={cartState.items.length === 0}
                >
                  Card
                </Button>
              </div>
              
              <Button
                variant="ghost"
                fullWidth
                onClick={clearCart}
                disabled={cartState.items.length === 0}
              >
                Cancel Sale
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};