import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state: cartState, toggleCart, removeItem, updateQuantity, clearCart } = useCart();
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      
      {/* Cart Sidebar */}
      {cartState.isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={toggleCart}
          />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                {/* Cart Header */}
                <div className="px-4 py-6 sm:px-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Shopping Cart
                    </h2>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={toggleCart}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                {/* Cart Content */}
                <div className="flex-1 px-4 py-6 sm:px-6">
                  {cartState.items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Start adding some items to your cart!
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {cartState.items.map((item) => (
                        <li key={item.id} className="py-4 flex">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          
                          <div className="ml-4 flex-1 flex flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                            
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border rounded">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-gray-600 hover:text-blue-500"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-2 text-gray-900">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-gray-600 hover:text-blue-500"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Cart Footer */}
                {cartState.items.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Subtotal</p>
                      <p>{formatPrice(cartState.total)}</p>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="primary" size="md" fullWidth>
                        Checkout
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="md" 
                        fullWidth
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};