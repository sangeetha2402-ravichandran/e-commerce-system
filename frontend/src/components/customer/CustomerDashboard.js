import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cartItems: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Mock data - in real app, these would be API calls
        setStats({
          totalOrders: 24,
          pendingOrders: 3,
          completedOrders: 21,
          cartItems: 5
        });

        setRecentOrders([
          {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'delivered',
            total: 299.99,
            items: 3
          },
          {
            id: 'ORD-002',
            date: '2024-01-12',
            status: 'shipped',
            total: 159.99,
            items: 2
          },
          {
            id: 'ORD-003',
            date: '2024-01-10',
            status: 'processing',
            total: 89.99,
            items: 1
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '+2'
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+10'
    },
    {
      title: 'Cart Items',
      value: stats.cartItems,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      trend: '+3'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total}</p>
                  <p className="text-sm text-gray-500">{order.items} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <ShoppingBag className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Browse Products</h3>
          <p className="text-gray-600 text-sm mb-4">Discover new products and deals</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Shop Now
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <ShoppingCart className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">View Cart</h3>
          <p className="text-gray-600 text-sm mb-4">You have {stats.cartItems} items in cart</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Go to Cart
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <Package className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Track Orders</h3>
          <p className="text-gray-600 text-sm mb-4">Monitor your order status</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
