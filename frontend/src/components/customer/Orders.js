import React, { useState, useEffect } from 'react';
import { Package, Eye, Filter, Search } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    const fetchOrders = async () => {
      try {
        const mockOrders = [
          {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'delivered',
            total: 299.99,
            items: [
              {
                name: 'Wireless Headphones',
                quantity: 1,
                price: 299.99,
                image: 'https://via.placeholder.com/60x60?text=Headphones'
              }
            ],
            shippingAddress: '123 Main St, City, State 12345',
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2024-01-18'
          },
          {
            id: 'ORD-002',
            date: '2024-01-12',
            status: 'shipped',
            total: 259.98,
            items: [
              {
                name: 'Running Shoes',
                quantity: 2,
                price: 129.99,
                image: 'https://via.placeholder.com/60x60?text=Shoes'
              }
            ],
            shippingAddress: '123 Main St, City, State 12345',
            trackingNumber: 'TRK123456790',
            estimatedDelivery: '2024-01-17'
          },
          {
            id: 'ORD-003',
            date: '2024-01-10',
            status: 'processing',
            total: 89.99,
            items: [
              {
                name: 'Coffee Maker',
                quantity: 1,
                price: 89.99,
                image: 'https://via.placeholder.com/60x60?text=Coffee+Maker'
              }
            ],
            shippingAddress: '123 Main St, City, State 12345',
            trackingNumber: null,
            estimatedDelivery: '2024-01-20'
          },
          {
            id: 'ORD-004',
            date: '2024-01-08',
            status: 'cancelled',
            total: 49.99,
            items: [
              {
                name: 'Laptop Backpack',
                quantity: 1,
                price: 49.99,
                image: 'https://via.placeholder.com/60x60?text=Backpack'
              }
            ],
            shippingAddress: '123 Main St, City, State 12345',
            trackingNumber: null,
            estimatedDelivery: null
          }
        ];
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  const viewOrderDetails = (order) => {
    alert(`Viewing details for order ${order.id}`);
    // In real app, this would open a modal or navigate to details page
  };

  const trackOrder = (order) => {
    if (order.trackingNumber) {
      alert(`Tracking order ${order.id} with tracking number ${order.trackingNumber}`);
    } else {
      alert('Tracking number not available yet');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <button
                    onClick={() => viewOrderDetails(order)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Shipping Address</p>
                    <p className="text-gray-900">{order.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Estimated Delivery</p>
                    <p className="text-gray-900">
                      {order.estimatedDelivery || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {order.trackingNumber && (
                      <button
                        onClick={() => trackOrder(order)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Track Order
                      </button>
                    )}
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'You haven\'t placed any orders yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
