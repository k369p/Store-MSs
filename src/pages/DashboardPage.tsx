import React, { useEffect } from 'react';
import { useItems } from '../contexts/ItemsContext';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';

export const DashboardPage: React.FC = () => {
  const { state: itemsState, getItems } = useItems();
  const { state: authState } = useAuth();
  
  useEffect(() => {
    if (itemsState.items.length === 0) {
      getItems();
    }
  }, []);

  // Calculate dashboard statistics
  const totalItems = itemsState.items.length;
  const lowStockItems = itemsState.items.filter(item => item.stock > 0 && item.stock <= 5).length;
  const outOfStockItems = itemsState.items.filter(item => item.stock === 0).length;
  const totalValue = itemsState.items.reduce((total, item) => total + (item.price * item.stock), 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {authState.user?.username}! Here's an overview of your store.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Items</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalItems}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Low Stock Items</p>
              <h3 className="text-2xl font-bold text-gray-900">{lowStockItems}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">{outOfStockItems}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Inventory Value</p>
              <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</h3>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Low Stock Alert */}
      {lowStockItems > 0 && (
        <Card className="mb-8 bg-yellow-50 border border-yellow-200">
          <CardBody>
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Low Stock Alert</h3>
                <p className="text-yellow-700 mt-1">
                  {lowStockItems} {lowStockItems === 1 ? 'item is' : 'items are'} running low on stock. 
                  Check the inventory page for details.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      
      {/* Out of Stock Alert */}
      {outOfStockItems > 0 && (
        <Card className="mb-8 bg-red-50 border border-red-200">
          <CardBody>
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Out of Stock Alert</h3>
                <p className="text-red-700 mt-1">
                  {outOfStockItems} {outOfStockItems === 1 ? 'item is' : 'items are'} currently out of stock. 
                  Please restock as soon as possible.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      
      {/* Recent Items */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Items</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itemsState.items.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(item.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.stock === 0 
                        ? 'bg-red-100 text-red-800' 
                        : item.stock <= 5 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                      {item.stock === 0 ? 'Out' : item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};