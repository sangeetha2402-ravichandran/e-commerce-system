import React from 'react';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  console.log('AdminDashboard is loading!');
  
  // Simple static data - guaranteed to show
  const stats = [
    { title: 'Total Users', value: '1,247', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Products', value: '456', icon: Package, color: 'bg-green-500' },
    { title: 'Total Orders', value: '892', icon: ShoppingCart, color: 'bg-purple-500' },
    { title: 'Total Revenue', value: '$45,678', icon: DollarSign, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'Delivered', total: '$299.99' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-15', status: 'Shipped', total: '$159.99' },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-01-14', status: 'Processing', total: '$89.99' },
    { id: 'ORD-004', customer: 'Alice Brown', date: '2024-01-13', status: 'Pending', total: '$449.99' },
    { id: 'ORD-005', customer: 'Charlie Wilson', date: '2024-01-12', status: 'Cancelled', total: '$199.99' },
  ];

  const alerts = [
    { type: 'warning', message: '3 products are low on stock', time: '2 hours ago' },
    { type: 'info', message: 'New user registration spike detected', time: '5 hours ago' },
    { type: 'success', message: 'System backup completed successfully', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className={`flex items-start p-4 rounded-lg border-l-4 ${
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
              alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
              'bg-green-50 border-green-400'
            }`}>
              <AlertCircle className={`w-5 h-5 mt-0.5 mr-3 ${
                alert.type === 'warning' ? 'text-yellow-600' :
                alert.type === 'info' ? 'text-blue-600' :
                'text-green-600'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
