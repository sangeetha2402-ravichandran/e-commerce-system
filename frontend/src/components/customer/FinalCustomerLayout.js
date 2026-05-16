import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  User, 
  LogOut, 
  Home,
  Menu,
  X
} from 'lucide-react';

const FinalCustomerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/customer/dashboard', icon: Home, label: 'Dashboard', description: 'Overview' },
    { path: '/customer/products', icon: ShoppingBag, label: 'Products', description: 'Browse' },
    { path: '/customer/orders', icon: Package, label: 'Orders', description: 'History' },
    { path: '/customer/profile', icon: User, label: 'Profile', description: 'Settings' },
  ];

  const isActive = (path) => currentPath.includes(path.split('/')[2]);

  // Dashboard content
  const renderDashboard = () => {
    const customerOrders = [
      { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', total: '$299.99', items: 3 },
      { id: 'ORD-002', date: '2024-01-12', status: 'Shipped', total: '$159.99', items: 2 },
      { id: 'ORD-003', date: '2024-01-10', status: 'Processing', total: '$89.99', items: 1 },
    ];

    const customerStats = {
      totalOrders: 3,
      pendingOrders: 1,
      completedOrders: 2,
      cartItems: 5,
      totalSpent: '$549.97'
    };

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
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Customer Dashboard</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Welcome back, {user?.name}! Here's your account overview.</p>
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
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
              borderRadius: '0 16px 0 100px'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
              }}>
                <Package style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: '#22C55E',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)'
              }}>
                Active
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{customerStats.totalOrders}</h3>
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
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
              borderRadius: '0 16px 0 100px'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
              }}>
                <ShoppingCart style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
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
                Ready
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{customerStats.cartItems}</h3>
            <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Cart Items</p>
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
                <span style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>💰</span>
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
                Total
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>{customerStats.totalSpent}</h3>
            <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Total Spent</p>
          </div>
        </div>

        {/* Recent Orders */}
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
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid rgba(229, 231, 235, 0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', transition: 'background-color 0.2s ease' }}>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>{order.id}</td>
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
      </div>
    );
  };

  // Products content
  const renderProducts = () => {
    const products = [
      { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, rating: 4.5, reviews: 128, inStock: true },
      { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, rating: 4.2, reviews: 89, inStock: true },
      { id: 3, name: 'Office Chair', category: 'Furniture', price: 299.99, rating: 4.7, reviews: 56, inStock: true },
      { id: 4, name: 'Desk Lamp', category: 'Furniture', price: 49.99, rating: 4.1, reviews: 34, inStock: false },
      { id: 5, name: 'USB Hub', category: 'Electronics', price: 39.99, rating: 4.3, reviews: 67, inStock: true },
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
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Products</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Browse our amazing products</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {products.map((product) => (
            <div key={product.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              border: '1px solid rgba(229, 231, 235, 0.8)',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag style={{ fontSize: '48px', color: '#9CA3AF' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    backgroundColor: '#F3F4F6', 
                    color: '#6B7280' 
                  }}>
                    {product.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>{product.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#F59E0B', marginRight: '4px' }}>⭐</span>
                  <span style={{ fontSize: '14px', color: '#6B7280', marginRight: '8px' }}>{product.rating}</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>({product.reviews} reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#1F2937' }}>${product.price}</span>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backgroundColor: product.inStock ? '#10B981' : '#6B7280',
                      color: 'white',
                      border: 'none',
                      cursor: product.inStock ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease'
                    }}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Cart content
  const renderCart = () => {
    const cartItems = [
      { id: 1, name: 'Laptop Pro', price: 1299.99, quantity: 1, image: '💻' },
      { id: 2, name: 'Wireless Mouse', price: 29.99, quantity: 2, image: '🖱️' },
      { id: 3, name: 'USB Hub', price: 39.99, quantity: 1, image: '🔌' },
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

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
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Shopping Cart</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Review your items before checkout</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          <div>
            {cartItems.map((item) => (
              <div key={item.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                border: '1px solid rgba(229, 231, 235, 0.8)',
                padding: '20px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  backgroundColor: '#F3F4F6', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  {item.image}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{item.name}</h3>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>${item.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    border: '1px solid #E5E7EB', 
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}>
                    -
                  </button>
                  <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    border: '1px solid #E5E7EB', 
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid rgba(229, 231, 235, 0.8)', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', marginBottom: '20px' }}>Order Summary</h2>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#6B7280' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#6B7280' }}>Tax (8%)</span>
                <span style={{ fontWeight: '600' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>Total</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <button style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#10B981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Orders content
  const renderOrders = () => {
    const orders = [
      { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', total: '$299.99', items: 3 },
      { id: 'ORD-002', date: '2024-01-12', status: 'Shipped', total: '$159.99', items: 2 },
      { id: 'ORD-003', date: '2024-01-10', status: 'Processing', total: '$89.99', items: 1 },
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
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Order History</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Track all your orders</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>All Orders ({orders.length})</h2>
          </div>
          
          <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>{order.id}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6B7280' }}>{order.date}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: 
                          order.status === 'Delivered' ? '#D1FAE5' :
                          order.status === 'Shipped' ? '#DBEAFE' :
                          order.status === 'Processing' ? '#FEF3C7' :
                          '#F3F4F6',
                        color: 
                          order.status === 'Delivered' ? '#065F46' :
                          order.status === 'Shipped' ? '#1E40AF' :
                          order.status === 'Processing' ? '#92400E' :
                          '#374151'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Profile content
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
        {/* Decorative corner elements */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Profile</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Manage your account settings</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              backgroundColor: '#10B981', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '48px',
              color: 'white',
              fontWeight: '700'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>{user?.name}</h2>
            <p style={{ color: '#6B7280', marginBottom: '8px' }}>{user?.email}</p>
            <span style={{ 
              padding: '6px 12px', 
              backgroundColor: '#DBEAFE', 
              color: '#1E40AF', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '600' 
            }}>
              Customer
            </span>
          </div>

          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Account Information</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" value={user?.name || ''} readOnly style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '6px',
                    backgroundColor: '#F9FAFB'
                  }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" value={user?.email || ''} readOnly style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '6px',
                    backgroundColor: '#F9FAFB'
                  }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 123-4567" style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '6px'
                  }} />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Preferences</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Email Notifications</span>
                  <button style={{ 
                    width: '48px', 
                    height: '24px', 
                    backgroundColor: '#10B981', 
                    borderRadius: '12px', 
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%', 
                      position: 'absolute', 
                      top: '2px', 
                      right: '2px' 
                    }} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>SMS Notifications</span>
                  <button style={{ 
                    width: '48px', 
                    height: '24px', 
                    backgroundColor: '#D1D5DB', 
                    borderRadius: '12px', 
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%', 
                      position: 'absolute', 
                      top: '2px', 
                      left: '2px' 
                    }} />
                  </button>
                </div>
              </div>
            </div>

                      </div>
        </div>
      </div>
    );
  };

  // Render content based on current path
  const renderContent = () => {
    if (currentPath.includes('/products')) {
      return renderProducts();
    }
    if (currentPath.includes('/cart')) {
      return renderCart();
    }
    if (currentPath.includes('/checkout')) {
      return <Outlet />;
    }
    if (currentPath.includes('/orders')) {
      return renderOrders();
    }
    if (currentPath.includes('/profile')) {
      return renderProfile();
    }
    if (currentPath.includes('/notifications')) {
      return <Outlet />;
    }
    return renderDashboard(); // Default to dashboard
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '280px',
        background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.1)',
        zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : (window.innerWidth > 768 ? 'translateX(0)' : 'translateX(-100%)'),
        transition: 'transform 0.3s ease-in-out'
      }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.5px' }}>Customer Portal</h1>
        </div>

        <nav style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ 
                    color: '#E2E8F0', 
                    textDecoration: 'none', 
                    padding: '14px 18px', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: isActive(item.path) ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    border: isActive(item.path) ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                    position: 'relative'
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span style={{ fontSize: '20px', opacity: isActive(item.path) ? 1 : 0.8 }}>
                    <Icon style={{ width: '20px', height: '20px' }} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '15px', fontWeight: isActive(item.path) ? '600' : '500', display: 'block', lineHeight: '1.2' }}>{item.label}</span>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>{item.description}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                backgroundColor: '#10B981', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white'
              }}>
                {user?.name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>
                  {user?.name || 'Customer User'}
                </p>
                <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
                  {user?.email || 'customer@example.com'}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: 'transparent', 
              color: '#EF4444', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              borderRadius: '8px', 
              fontSize: '14px', 
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '280px', minHeight: '100vh' }}>
        {/* Top bar for desktop */}
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 10, 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ 
                color: '#6B7280',
                display: window.innerWidth <= 768 ? 'block' : 'none'
              }}
            >
              <Menu style={{ width: '24px', height: '24px' }} />
            </button>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
              Customer Dashboard
            </h1>
          </div>
        </div>
        
        {/* Top bar for mobile */}
        <div style={{ 
          display: 'none', 
          position: 'sticky', 
          top: 0, 
          zIndex: 10, 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '16px 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ color: '#6B7280' }}
            >
              <Menu style={{ width: '24px', height: '24px' }} />
            </button>
            <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>Customer Portal</h1>
            <div style={{ width: '24px' }} />
          </div>
        </div>

        {/* Page content */}
        <div style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ 
            position: 'relative', 
            zIndex: 1,
            width: '100%',
            maxWidth: '1400px',
            padding: '40px'
          }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCustomerLayout;
