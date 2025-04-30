import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, LogOut, Store } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state: cartState, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <Store className="h-8 w-8 text-blue-500" />
              <span className="ml-2 font-bold text-lg text-gray-900">QuickMart</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                }`
              }
            >
              Shop
            </NavLink>
            
            {authState.isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                
                {authState.user?.role === 'admin' && (
                  <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                      }`
                    }
                  >
                    Inventory
                  </NavLink>
                )}
                
                <NavLink
                  to="/pos"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                    }`
                  }
                >
                  POS
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-md"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartState.items.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-xs text-white">
                  {cartState.items.length}
                </span>
              )}
            </button>

            {/* Auth Actions */}
            {authState.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{authState.user?.username}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </NavLink>
            
            {authState.isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                
                {authState.user?.role === 'admin' && (
                  <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inventory
                  </NavLink>
                )}
                
                <NavLink
                  to="/pos"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  POS
                </NavLink>
              </>
            )}
            
            {/* Mobile Auth Actions */}
            {authState.isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </NavLink>
            )}
            
            {/* Mobile Cart Button */}
            <button
              onClick={() => {
                toggleCart();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart {cartState.items.length > 0 && `(${cartState.items.length})`}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};