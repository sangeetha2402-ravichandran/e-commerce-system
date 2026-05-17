import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home,
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Star, 
  AlertCircle,
  BarChart3,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const FinalSellerLayout = () => {
  const { user, logout } = useAuth();
  const [currentPath, setCurrentPath] = useState('/seller/dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [carts, setCartItems] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [sellerProfile, setSellerProfile] = useState({});

  const menuItems = [
    { path: '/seller/dashboard', icon: Home, label: 'Dashboard', description: 'Overview' },
    { path: '/seller/products', icon: Package, label: 'Products', description: 'Inventory' },
    { path: '/seller/carts', icon: ShoppingCart, label: 'Carts', description: 'Management' },
    { path: '/seller/orders', icon: ShoppingCart, label: 'Orders', description: 'Management' },
    { path: '/seller/analytics', icon: TrendingUp, label: 'Analytics', description: 'Reports' },
    { path: '/seller/profile', icon: User, label: 'Profile', description: 'Settings' },
  ];

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      // Mock products data
      setProducts([
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 299.99,
          stock: 45,
          status: 'Active',
          category: 'Electronics',
          image: 'https://via.placeholder.com/80x80'
        },
        {
          id: 2,
          name: 'Smart Watch',
          price: 199.99,
          stock: 32,
          status: 'Active',
          category: 'Electronics',
          image: 'https://via.placeholder.com/80x80'
        },
        {
          id: 3,
          name: 'Laptop Backpack',
          price: 49.99,
          stock: 28,
          status: 'Active',
          category: 'Accessories',
          image: 'https://via.placeholder.com/80x80'
        }
      ]);

      // Mock orders data
      setOrders([
        {
          id: 'ORD-001',
          customer: 'John Doe',
          date: '2024-01-15',
          status: 'Delivered',
          total: 299.99,
          items: 2
        },
        {
          id: 'ORD-002',
          customer: 'Jane Smith',
          date: '2024-01-15',
          status: 'Shipped',
          total: 159.99,
          items: 1
        },
        {
          id: 'ORD-003',
          customer: 'Bob Johnson',
          date: '2024-01-14',
          status: 'Processing',
          total: 89.99,
          items: 1
        }
      ]);

      // Mock carts data
      setCartItems([
        {
          id: 'CART-001',
          customer: 'Alice Brown',
          items: 3,
          total: 349.97,
          date: '2024-01-15',
          status: 'Active'
        },
        {
          id: 'CART-002',
          customer: 'Charlie Wilson',
          items: 1,
          total: 199.99,
          date: '2024-01-15',
          status: 'Active'
        }
      ]);

      // Mock analytics data
      setAnalytics({
        totalSales: 12567.89,
        totalOrders: 156,
        averageOrderValue: 80.56,
        conversionRate: 3.2,
        topProducts: ['Wireless Headphones', 'Smart Watch', 'Laptop Backpack']
      });

      // Mock seller profile
      setSellerProfile({
        name: 'John Seller',
        email: 'seller@example.com',
        phone: '+1-234-567-8900',
        address: '123 Business St, City, State 12345',
        storeName: 'TechStore Pro',
        joinDate: '2023-01-15',
        rating: 4.3,
        totalProducts: 45,
        totalSales: 12567.89
      });
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const renderContent = () => {
    if (currentPath.includes('/products')) {
      return renderProducts();
    }
    if (currentPath.includes('/carts')) {
      return renderCarts();
    }
    if (currentPath.includes('/orders')) {
      return renderOrders();
    }
    if (currentPath.includes('/analytics')) {
      return renderAnalytics();
    }
    if (currentPath.includes('/profile')) {
      return renderProfile();
    }
    return renderDashboard(); // Default to dashboard
  };

  const renderDashboard = () => {
    const sellerStats = {
      totalProducts: 12,
      totalOrders: 8,
      totalRevenue: '$1,899.85',
      averageRating: 4.3
    };

    const recentOrders = [
      { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'Delivered', total: '$299.99', items: 2 },
      { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-15', status: 'Shipped', total: '$159.99', items: 1 },
      { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-01-14', status: 'Processing', total: '$89.99', items: 1 },
    ];

    const topProducts = [
      { name: 'Laptop Pro', sales: 45, revenue: '$13,499.55', rating: 4.5, rank: 1 },
      { name: 'Wireless Mouse', sales: 32, revenue: '$959.68', rating: 4.3, rank: 2 },
      { name: 'Office Chair', sales: 28, revenue: '$8,399.72', rating: 4.2, rank: 3 },
    ];

    return (
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'transparent',
        border: '2px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative corner elements */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Seller Dashboard</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Overview of your sales and performance</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '28px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
              borderRadius: '0 16px 0 100px'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}>
                <Package style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: '#F59E0B',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)'
              }}>
                Active
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{sellerStats.totalProducts}</h3>
            <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Total Products</p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '28px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
              borderRadius: '0 16px 0 100px'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                <ShoppingCart style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: '#10B981',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
              }}>
                +8%
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{sellerStats.totalOrders}</h3>
            <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Total Orders</p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '28px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
              borderRadius: '0 16px 0 100px'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}>
                <DollarSign style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: '#EF4444',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
              }}>
                +15%
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{sellerStats.totalRevenue}</h3>
            <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Total Revenue</p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '28px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
              borderRadius: '0 16px 0 100px'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
              }}>
                <Star style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: '#A855F7',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(168, 85, 247, 0.2)'
              }}>
                +0.2
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{sellerStats.averageRating}</h3>
            <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Average Rating</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginBottom: '32px'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Recent Orders</h2>
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                Last 3 orders
              </div>
            </div>
          </div>
          
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', transition: 'background-color 0.2s ease' }}>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>{order.id}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>{order.customer}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>{order.date}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ 
                        backgroundColor: 
                          order.status === 'Delivered' ? '#D1FAE5' :
                          order.status === 'Shipped' ? '#DBEAFE' :
                          order.status === 'Processing' ? '#FEF3C7' :
                          '#F3F4F6',
                        color: 
                          order.status === 'Delivered' ? '#065F46' :
                          order.status === 'Shipped' ? '#1E40AF' :
                          order.status === 'Processing' ? '#92400E' :
                          '#374151',
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '15px', color: '#1F2937', fontWeight: '700', textAlign: 'right' }}>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginBottom: '32px'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Top Products</h2>
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                Best sellers
              </div>
            </div>
          </div>
          
          <div style={{ padding: '24px' }}>
            {topProducts.map((product) => (
              <div key={product.rank} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '16px', 
                borderRadius: '12px',
                border: '1px solid #F3F4F6',
                marginBottom: '12px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: '#F59E0B', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {product.rank}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star style={{ fontSize: '14px', color: '#F59E0B', fill: '#F59E0B' }} />
                        <span style={{ fontSize: '14px', color: '#6B7280' }}>{product.rating}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>({product.sales} sold)</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>{product.revenue}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Alerts */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginBottom: '32px'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Seller Alerts</h2>
          </div>
          
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px', 
                padding: '16px', 
                borderRadius: '12px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D'
              }}>
                <AlertCircle style={{ fontSize: '20px', color: '#D97706', marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#92400E', marginBottom: '4px' }}>Low Stock Alert</h3>
                  <p style={{ fontSize: '13px', color: '#78350F' }}>3 products are running low on inventory</p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px', 
                padding: '16px', 
                borderRadius: '12px',
                backgroundColor: '#DBEAFE',
                border: '1px solid #93C5FD'
              }}>
                <AlertCircle style={{ fontSize: '20px', color: '#1E40AF', marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1E40AF', marginBottom: '4px' }}>New Order</h3>
                  <p style={{ fontSize: '13px', color: '#1E3A8A' }}>You have 5 new orders to process</p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px', 
                padding: '16px', 
                borderRadius: '12px',
                backgroundColor: '#D1FAE5',
                border: '1px solid #6EE7B7'
              }}>
                <AlertCircle style={{ fontSize: '20px', color: '#065F46', marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#065F46', marginBottom: '4px' }}>Payment Received</h3>
                  <p style={{ fontSize: '13px', color: '#064E3B' }}>Payment of $1,234.56 has been received</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    return (
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'transparent',
        border: '2px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Product Management</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Manage your product inventory</p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Products</h2>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Package style={{ width: '16px', height: '16px' }} />
              Add Product
            </button>
          </div>
          
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Product</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stock</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)' }}>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#F3F4F6',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Package style={{ width: '20px', height: '20px', color: '#6B7280' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{product.name}</div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151' }}>{product.category}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>${product.price}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151' }}>{product.stock}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ 
                        backgroundColor: product.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                        color: product.status === 'Active' ? '#065F46' : '#991B1B',
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600'
                      }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#3B82F6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}>
                          Edit
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#EF4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}>
                          Delete
                        </button>
                      </div>
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

  const renderCarts = () => {
    return (
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'transparent',
        border: '2px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Cart Management</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Monitor customer shopping carts</p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Active Carts</h2>
          </div>
          
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cart ID</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Items</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => (
                  <tr key={cart.id} style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)' }}>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>{cart.id}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>{cart.customer}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151' }}>{cart.items}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>${cart.total}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>{cart.date}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ 
                        backgroundColor: cart.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                        color: cart.status === 'Active' ? '#065F46' : '#991B1B',
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600'
                      }}>
                        {cart.status}
                      </span>
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

  const renderOrders = () => {
    return (
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'transparent',
        border: '2px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Order Management</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Process and track customer orders</p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Recent Orders</h2>
          </div>
          
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Items</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)' }}>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>{order.id}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>{order.customer}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>{order.date}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151' }}>{order.items}</td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>${order.total}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ 
                        backgroundColor: 
                          order.status === 'Delivered' ? '#D1FAE5' :
                          order.status === 'Shipped' ? '#DBEAFE' :
                          order.status === 'Processing' ? '#FEF3C7' :
                          '#F3F4F6',
                        color: 
                          order.status === 'Delivered' ? '#065F46' :
                          order.status === 'Shipped' ? '#1E40AF' :
                          order.status === 'Processing' ? '#92400E' :
                          '#374151',
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#3B82F6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}>
                          View
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#10B981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}>
                          Update
                        </button>
                      </div>
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

  const renderAnalytics = () => {
    return (
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'transparent',
        border: '2px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Sales Analytics</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Track your business performance</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>Total Sales</h3>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#10B981', marginBottom: '8px' }}>${analytics.totalSales?.toLocaleString()}</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>All time revenue</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>Total Orders</h3>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#3B82F6', marginBottom: '8px' }}>{analytics.totalOrders}</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Completed orders</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>Average Order Value</h3>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#F59E0B', marginBottom: '8px' }}>${analytics.averageOrderValue}</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Per order average</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>Conversion Rate</h3>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#8B5CF6', marginBottom: '8px' }}>{analytics.conversionRate}%</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Visitor to customer</div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          border: '1px solid rgba(229, 231, 235, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            padding: '24px 32px', 
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>Top Products</h2>
          </div>
          
          <div style={{ padding: '24px' }}>
            {analytics.topProducts?.map((product, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '12px 0',
                borderBottom: index < analytics.topProducts.length - 1 ? '1px solid #F3F4F6' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#F59E0B', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{product}</span>
                </div>
                <TrendingUp style={{ width: '16px', height: '16px', color: '#10B981' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'transparent',
        border: '2px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Seller Profile</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Manage your account settings</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '32px',
              fontWeight: '700',
              color: 'white'
            }}>
              {sellerProfile.name?.charAt(0).toUpperCase() || 'S'}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{sellerProfile.name}</h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>{sellerProfile.email}</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <span style={{ 
                backgroundColor: '#D1FAE5',
                color: '#065F46',
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600'
              }}>
                {sellerProfile.rating} ★
              </span>
              <span style={{ 
                backgroundColor: '#DBEAFE',
                color: '#1E40AF',
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600'
              }}>
                Verified
              </span>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>Store Information</h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>Store Name</label>
                <div style={{ fontSize: '14px', color: '#1F2937', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                  {sellerProfile.storeName}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>Email</label>
                <div style={{ fontSize: '14px', color: '#1F2937', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                  {sellerProfile.email}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>Phone</label>
                <div style={{ fontSize: '14px', color: '#1F2937', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                  {sellerProfile.phone}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>Address</label>
                <div style={{ fontSize: '14px', color: '#1F2937', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                  {sellerProfile.address}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>Member Since</label>
                  <div style={{ fontSize: '14px', color: '#1F2937', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                    {sellerProfile.joinDate}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>Total Products</label>
                  <div style={{ fontSize: '14px', color: '#1F2937', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                    {sellerProfile.totalProducts}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '12px'
              }}>
                Save Changes
              </button>
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '256px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 50,
        '@media (min-width: 1024px)': {
          position: 'static',
          transform: 'translateX(0)'
        }
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '64px', 
          padding: '0 24px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', margin: 0 }}>Seller Portal</h1>
          <button
            style={{ 
              display: window.innerWidth >= 1024 ? 'none' : 'block',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setSidebarOpen(false)}
          >
            <X style={{ width: '24px', height: '24px', color: '#6B7280' }} />
          </button>
        </div>

        <nav style={{ marginTop: '24px' }}>
          <div style={{ padding: '0 12px' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => setCurrentPath(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: '4px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: currentPath === item.path ? '#EEF2FF' : 'transparent',
                    color: currentPath === item.path ? '#4F46E5' : '#6B7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <Icon style={{ width: '20px', height: '20px', marginRight: '12px' }} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            padding: '12px',
            borderTop: '1px solid #E5E7EB'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '8px 12px', 
              marginBottom: '8px'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: '#10B981', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <span style={{ 
                  color: 'white', 
                  fontSize: '14px', 
                  fontWeight: '500' 
                }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div style={{ marginLeft: '12px' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 2px 0' }}>{user?.name}</p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Seller</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#6B7280',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut style={{ width: '20px', height: '20px', marginRight: '12px' }} />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ 
        marginLeft: '0',
        '@media (min-width: 1024px)': { marginLeft: '256px' }
      }}>
        {/* Top bar for mobile */}
        <div style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid #E5E7EB',
          display: window.innerWidth >= 1024 ? 'none' : 'block'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            height: '64px', 
            padding: '0 16px'
          }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <Menu style={{ width: '24px', height: '24px' }} />
            </button>
            <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>Seller Portal</h1>
            <div style={{ width: '24px' }} />
          </div>
        </div>

        {/* Page content */}
        <main style={{ padding: '24px' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FinalSellerLayout;
