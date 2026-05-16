import React from 'react';
import { Outlet, Link, useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home,
  Package, 
  ShoppingCart, 
  BarChart3, 
  User, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import SellerDashboard from './SellerDashboard';
import ProductManagement from './ProductManagement';
import CartManagement from './CartManagement';
import OrderManagement from './OrderManagement';
import SellerAnalytics from './SellerAnalytics';
import SellerProfile from './SellerProfile';

const SellerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/seller/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/seller/products', icon: Package, label: 'Product Management' },
    { path: '/seller/carts', icon: ShoppingCart, label: 'Cart Management' },
    { path: '/seller/orders', icon: ShoppingCart, label: 'Order Management' },
    { path: '/seller/analytics', icon: BarChart3, label: 'Sales Analytics' },
    { path: '/seller/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Seller Portal</h1>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-md transition-colors
                    ${isActive(item.path)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="absolute bottom-0 w-full p-3 border-t">
            <div className="flex items-center px-3 py-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">Seller</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Seller Portal</h1>
            <div className="w-6" />
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Routes>
            <Route path="/dashboard" element={<SellerDashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/carts" element={<CartManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/analytics" element={<SellerAnalytics />} />
            <Route path="/profile" element={<SellerProfile />} />
            <Route path="/" element={<Navigate to="/seller/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
