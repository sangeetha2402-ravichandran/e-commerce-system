import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Star, Calendar, Download, Eye } from 'lucide-react';

const SellerAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    averageRating: 0,
    conversionRate: 0,
    averageOrderValue: 0
  });
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    const fetchAnalytics = async () => {
      try {
        // Mock data based on time range
        const mockData = {
          '7d': {
            totalRevenue: 4567.89,
            totalOrders: 23,
            totalProducts: 45,
            averageRating: 4.3,
            conversionRate: 3.2,
            averageOrderValue: 198.60
          },
          '30d': {
            totalRevenue: 15678.90,
            totalOrders: 87,
            totalProducts: 45,
            averageRating: 4.3,
            conversionRate: 2.8,
            averageOrderValue: 180.22
          },
          '90d': {
            totalRevenue: 48956.23,
            totalOrders: 265,
            totalProducts: 45,
            averageRating: 4.3,
            conversionRate: 3.5,
            averageOrderValue: 184.92
          }
        };
        
        setAnalytics(mockData[timeRange]);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const metricCards = [
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12%'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
      trend: '+8%'
    },
    {
      title: 'Active Products',
      value: analytics.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-purple-500',
      trend: '+5%'
    },
    {
      title: 'Average Rating',
      value: analytics.averageRating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
      trend: '+0.2'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      trend: '+2.1%'
    },
    {
      title: 'Avg Order Value',
      value: `$${analytics.averageOrderValue}`,
      icon: BarChart3,
      color: 'bg-red-500',
      trend: '+5.3%'
    }
  ];

  const salesData = [
    { date: '2024-01-09', revenue: 1234.56, orders: 6 },
    { date: '2024-01-10', revenue: 2345.67, orders: 12 },
    { date: '2024-01-11', revenue: 1876.54, orders: 9 },
    { date: '2024-01-12', revenue: 3456.78, orders: 18 },
    { date: '2024-01-13', revenue: 2890.12, orders: 14 },
    { date: '2024-01-14', revenue: 4123.45, orders: 21 },
    { date: '2024-01-15', revenue: 3678.90, orders: 19 }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 45, revenue: 13499.55, rating: 4.5, views: 1250 },
    { name: 'Smart Watch', sales: 32, revenue: 6399.68, rating: 4.3, views: 890 },
    { name: 'Running Shoes', sales: 28, revenue: 3639.72, rating: 4.7, views: 756 },
    { name: 'Laptop Backpack', sales: 15, revenue: 749.85, rating: 4.2, views: 432 },
    { name: 'Coffee Maker', sales: 12, revenue: 1079.88, rating: 4.6, views: 345 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600">Detailed insights into your sales performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend.startsWith('+') ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <p className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend}
                    </p>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Sales Trend</h2>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Sales chart would be displayed here</p>
              <p className="text-sm text-gray-500">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Performance */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Product Performance</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900 ml-1">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 mr-1" />
                        {product.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {((product.sales / product.views) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Sales Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Sales Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {salesData.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{sale.date}</p>
                    <p className="text-sm text-gray-500">{sale.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${sale.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Performance Insights</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Top Performing Day</h3>
              <p className="text-green-700">Saturday, January 13 with $4,123.45 in revenue</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Best Product</h3>
              <p className="text-blue-700">Wireless Headphones with 45 sales</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Average Order Value</h3>
              <p className="text-yellow-700">${analytics.averageOrderValue} per order</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2">Customer Rating</h3>
              <p className="text-purple-700">{analytics.averageRating} out of 5 stars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
