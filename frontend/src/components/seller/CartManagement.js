import React, { useState, useEffect } from 'react';
import { ShoppingCart, ShoppingBag, AlertCircle, DollarSign, User, Mail, Clock, Eye, Bell } from 'lucide-react';

const CartManagement = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showCartDetails, setShowCartDetails] = useState(false);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      // Mock data - in real app, this would be an API call
      const mockCarts = [
        { 
          id: 'CART-001', 
          customer: 'John Doe', 
          email: 'john@example.com',
          items: 3, 
          total: 259.97,
          status: 'active',
          lastUpdated: '2024-01-15 14:30',
          products: [
            { name: 'Laptop Pro', price: 1299.99, quantity: 1 },
            { name: 'Wireless Mouse', price: 29.99, quantity: 1 },
            { name: 'USB-C Hub', price: 49.99, quantity: 1 }
          ]
        },
        { 
          id: 'CART-002', 
          customer: 'Jane Smith', 
          email: 'jane@example.com',
          items: 2, 
          total: 159.98,
          status: 'active',
          lastUpdated: '2024-01-15 13:45',
          products: [
            { name: 'Mechanical Keyboard', price: 89.99, quantity: 1 },
            { name: 'Webcam HD', price: 79.99, quantity: 1 }
          ]
        },
        { 
          id: 'CART-003', 
          customer: 'Bob Johnson', 
          email: 'bob@example.com',
          items: 1, 
          total: 89.99,
          status: 'abandoned',
          lastUpdated: '2024-01-14 16:20',
          products: [
            { name: 'Monitor Stand', price: 89.99, quantity: 1 }
          ]
        },
        { 
          id: 'CART-004', 
          customer: 'Alice Brown', 
          email: 'alice@example.com',
          items: 4, 
          total: 199.96,
          status: 'active',
          lastUpdated: '2024-01-15 11:15',
          products: [
            { name: 'Desk Lamp', price: 34.99, quantity: 1 },
            { name: 'Phone Case', price: 19.99, quantity: 2 },
            { name: 'Office Chair', price: 89.99, quantity: 1 }
          ]
        },
        { 
          id: 'CART-005', 
          customer: 'Charlie Wilson', 
          email: 'charlie@example.com',
          items: 2, 
          total: 79.98,
          status: 'converted',
          lastUpdated: '2024-01-13 15:30',
          products: [
            { name: 'Office Chair', price: 89.99, quantity: 1 },
            { name: 'Desk Lamp', price: 34.99, quantity: 1 }
          ]
        },
      ];
      setCarts(mockCarts);
    } catch (error) {
      console.error('Error fetching carts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'abandoned':
        return 'bg-red-100 text-red-800';
      case 'converted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'abandoned':
        return 'Abandoned';
      case 'converted':
        return 'Converted';
      default:
        return status;
    }
  };

  const handleViewCart = (cart) => {
    setSelectedCart(cart);
    setShowCartDetails(true);
  };

  const handleSendReminder = (cartId) => {
    // In real app, this would send a reminder email/notification
    alert(`Reminder sent for cart ${cartId}`);
  };

  const handleCloseCartDetails = () => {
    setShowCartDetails(false);
    setSelectedCart(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const activeCarts = carts.filter(cart => cart.status === 'active');
  const abandonedCarts = carts.filter(cart => cart.status === 'abandoned');
  const totalActiveValue = activeCarts.reduce((sum, cart) => sum + cart.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cart Management</h1>
        <p className="text-gray-600">Monitor and manage customer shopping carts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Carts</p>
              <p className="text-2xl font-bold text-gray-900">{carts.length}</p>
            </div>
            <div className="bg-indigo-500 p-3 rounded-full">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Carts</p>
              <p className="text-2xl font-bold text-gray-900">{activeCarts.length}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Abandoned</p>
              <p className="text-2xl font-bold text-gray-900">{abandonedCarts.length}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalActiveValue.toFixed(2)}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Carts Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Customer Carts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cart ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {carts.map((cart) => (
                <tr key={cart.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cart.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cart.customer}</div>
                      <div className="text-sm text-gray-500">{cart.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cart.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${cart.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cart.status)}`}>
                      {getStatusText(cart.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {cart.lastUpdated}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewCart(cart)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {cart.status === 'abandoned' && (
                      <button
                        onClick={() => handleSendReminder(cart.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Details Modal */}
      {showCartDetails && selectedCart && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={handleCloseCartDetails}></div>
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Cart Details - {selectedCart.id}</h3>
                <button
                  onClick={handleCloseCartDetails}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedCart.customer}</p>
                    <p className="text-sm text-gray-500">{selectedCart.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedCart.items} items</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${selectedCart.total.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Last updated: {selectedCart.lastUpdated}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Products</h4>
                <div className="space-y-3">
                  {selectedCart.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartManagement;
