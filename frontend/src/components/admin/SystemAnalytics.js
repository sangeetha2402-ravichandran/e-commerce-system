import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingCart, Package, DollarSign, Calendar, Download } from 'lucide-react';

const SystemAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Static data - no loading states
  const analyticsData = {
    '7d': {
      totalRevenue: 45678.90,
      totalOrders: 234,
      totalUsers: 1247,
      totalProducts: 456,
      conversionRate: 3.2,
      averageOrderValue: 195.20
    },
    '30d': {
      totalRevenue: 156789.45,
      totalOrders: 876,
      totalUsers: 2456,
      totalProducts: 456,
      conversionRate: 2.8,
      averageOrderValue: 179.10
    },
    '90d': {
      totalRevenue: 489567.23,
      totalOrders: 2654,
      totalUsers: 5678,
      totalProducts: 456,
      conversionRate: 3.5,
      averageOrderValue: 184.60
    }
  };

  const analytics = analyticsData[timeRange];

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
      trend: '+8.2%'
    },
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-purple-500',
      trend: '+15.3%'
    },
    {
      title: 'Total Products',
      value: analytics.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-orange-500',
      trend: '+2.1%'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      trend: '+0.8%'
    },
    {
      title: 'Avg Order Value',
      value: `$${analytics.averageOrderValue}`,
      icon: BarChart3,
      color: 'bg-pink-500',
      trend: '+5.7%'
    }
  ];

  const handleExport = () => {
    alert('Exporting analytics data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600">Monitor your e-commerce performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Revenue chart visualization</p>
              <p className="text-sm text-gray-500 mt-2">Chart would display revenue trends over selected period</p>
            </div>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Order status breakdown</p>
              <p className="text-sm text-gray-500 mt-2">Pie chart showing pending, processing, shipped, delivered orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
        <div className="space-y-4">
          {[
            { name: 'Wireless Headphones', sales: 45, revenue: 13499.55 },
            { name: 'Smart Watch', sales: 32, revenue: 6399.68 },
            { name: 'Laptop Stand', sales: 67, revenue: 3349.33 },
            { name: 'Coffee Maker', sales: 19, revenue: 1709.81 },
            { name: 'Running Shoes', sales: 28, revenue: 3639.72 }
          ].map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent User Activity</h2>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'Placed order ORD-001', time: '2 hours ago' },
            { user: 'Jane Smith', action: 'Registered new account', time: '3 hours ago' },
            { user: 'Alice Brown', action: 'Updated profile', time: '5 hours ago' },
            { user: 'Bob Johnson', action: 'Reviewed product', time: '6 hours ago' },
            { user: 'Charlie Wilson', action: 'Added to wishlist', time: '8 hours ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border-l-4 border-indigo-500 bg-gray-50 rounded">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
