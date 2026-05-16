import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const FinalWorkingLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Settings state
  const [settingsState, setSettingsState] = useState([
    { category: 'General', items: [
      { name: 'Store Name', value: 'E-Commerce Store', type: 'text' },
      { name: 'Store Email', value: 'admin@store.com', type: 'email' },
      { name: 'Currency', value: 'USD', type: 'select' },
      { name: 'Timezone', value: 'UTC', type: 'select' },
    ]},
    { category: 'Notifications', items: [
      { name: 'Email Notifications', value: 'enabled', type: 'toggle' },
      { name: 'SMS Notifications', value: 'disabled', type: 'toggle' },
      { name: 'Push Notifications', value: 'enabled', type: 'toggle' },
      { name: 'Order Confirmation', value: 'enabled', type: 'toggle' },
    ]},
    { category: 'Security', items: [
      { name: 'Two-Factor Auth', value: 'disabled', type: 'toggle' },
      { name: 'Session Timeout', value: '30 minutes', type: 'select' },
      { name: 'Password Policy', value: 'Strong', type: 'select' },
      { name: 'Login Attempts', value: '5', type: 'number' },
    ]},
  ]);
  
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Dashboard content
  const renderDashboard = () => (
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
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
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
        <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Dashboard</h1>
        <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
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
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            borderRadius: '0 16px 0 100px'
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              <span style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>👥</span>
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
              +12.5%
            </div>
          </div>
          <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>10</h3>
          <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Total Users</p>
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
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
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
              <span style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>📦</span>
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
              +8.2%
            </div>
          </div>
          <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>5</h3>
          <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Products</p>
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
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
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
              <span style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🛒</span>
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
              +15.3%
            </div>
          </div>
          <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>10</h3>
          <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Orders</p>
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
              backgroundColor: '#10B981',
              color: 'white',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
            }}>
              +18.7%
            </div>
          </div>
          <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '8px', letterSpacing: '-0.5px' }}>$2,449.90</h3>
          <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>Revenue</p>
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
          padding: '28px 32px', 
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
              Last 5 orders
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
              <tr style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', transition: 'background-color 0.2s ease' }}>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>ORD-001</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>John Doe</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>Jan 15, 2024</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    backgroundColor: '#D1FAE5', 
                    color: '#065F46', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    boxShadow: '0 1px 3px rgba(16, 185, 129, 0.2)'
                  }}>
                    Delivered
                  </span>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '15px', color: '#1F2937', fontWeight: '700', textAlign: 'right' }}>$299.99</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', transition: 'background-color 0.2s ease' }}>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>ORD-002</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>Jane Smith</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>Jan 15, 2024</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    backgroundColor: '#DBEAFE', 
                    color: '#1E40AF', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
                  }}>
                    Shipped
                  </span>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '15px', color: '#1F2937', fontWeight: '700', textAlign: 'right' }}>$159.99</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', transition: 'background-color 0.2s ease' }}>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>ORD-003</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>Bob Johnson</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>Jan 14, 2024</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    backgroundColor: '#FEF3C7', 
                    color: '#92400E', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    boxShadow: '0 1px 3px rgba(245, 158, 11, 0.2)'
                  }}>
                    Processing
                  </span>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '15px', color: '#1F2937', fontWeight: '700', textAlign: 'right' }}>$89.99</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', transition: 'background-color 0.2s ease' }}>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>ORD-004</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>Alice Brown</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>Jan 13, 2024</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    backgroundColor: '#F3F4F6', 
                    color: '#374151', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    boxShadow: '0 1px 3px rgba(107, 114, 128, 0.2)'
                  }}>
                    Pending
                  </span>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '15px', color: '#1F2937', fontWeight: '700', textAlign: 'right' }}>$449.99</td>
              </tr>
              <tr style={{ transition: 'background-color 0.2s ease' }}>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>ORD-005</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>Charlie Wilson</td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>Jan 12, 2024</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    backgroundColor: '#FEE2E2', 
                    color: '#991B1B', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    boxShadow: '0 1px 3px rgba(239, 68, 68, 0.2)'
                  }}>
                    Cancelled
                  </span>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '15px', color: '#1F2937', fontWeight: '700', textAlign: 'right' }}>$199.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Users content
  const renderUsers = () => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-10' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive', joinDate: '2024-01-05' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Seller', status: 'Active', joinDate: '2024-01-01' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Customer', status: 'Active', joinDate: '2023-12-28' },
      { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-20' },
      { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'Seller', status: 'Active', joinDate: '2024-01-18' },
      { id: 8, name: 'Grace Taylor', email: 'grace@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-12' },
      { id: 9, name: 'Henry Anderson', email: 'henry@example.com', role: 'Customer', status: 'Inactive', joinDate: '2024-01-08' },
      { id: 10, name: 'Isabella Martinez', email: 'isabella@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-25' },
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
          background: 'linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Users</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Manage your store users</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>All Users ({users.length})</h2>
          </div>
          
          <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>User</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          backgroundColor: '#EBF8FF', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          marginRight: '12px'
                        }}>
                          <span style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 'bold' }}>
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6B7280' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: 
                          user.role === 'ADMIN' ? '#FEE2E2' :
                          user.role === 'SELLER' ? '#DBEAFE' :
                          '#D1FAE5',
                        color: 
                          user.role === 'ADMIN' ? '#991B1B' :
                          user.role === 'SELLER' ? '#1E40AF' :
                          '#065F46'
                      }}>
                        {user.role}
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

  // Orders content
  const renderOrders = () => {
    const orders = [
      { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'Delivered', total: '$299.99' },
      { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-15', status: 'Shipped', total: '$159.99' },
      { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-01-14', status: 'Processing', total: '$89.99' },
      { id: 'ORD-004', customer: 'Alice Brown', date: '2024-01-13', status: 'Pending', total: '$449.99' },
      { id: 'ORD-005', customer: 'Charlie Wilson', date: '2024-01-12', status: 'Cancelled', total: '$199.99' },
      { id: 'ORD-006', customer: 'Emma Davis', date: '2024-01-20', status: 'Delivered', total: '$329.99' },
      { id: 'ORD-007', customer: 'Frank Miller', date: '2024-01-18', status: 'Shipped', total: '$189.99' },
      { id: 'ORD-008', customer: 'Grace Taylor', date: '2024-01-12', status: 'Processing', total: '$279.99' },
      { id: 'ORD-009', customer: 'Henry Anderson', date: '2024-01-08', status: 'Pending', total: '$149.99' },
      { id: 'ORD-010', customer: 'Isabella Martinez', date: '2024-01-25', status: 'Delivered', total: '$399.99' },
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
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Orders</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Track and manage customer orders</p>
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
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', fontWeight: '600', fontFamily: 'monospace' }}>{order.id}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>{order.customer}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827' }}>{order.date}</td>
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
                          order.status === 'Pending' ? '#F3F4F6' :
                          '#FEE2E2',
                        color: 
                          order.status === 'Delivered' ? '#065F46' :
                          order.status === 'Shipped' ? '#1E40AF' :
                          order.status === 'Processing' ? '#92400E' :
                          order.status === 'Pending' ? '#374151' :
                          '#991B1B'
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

  // Products content
  const renderProducts = () => {
    const products = [
      { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, status: 'In Stock', sku: 'LP-001' },
      { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 120, status: 'In Stock', sku: 'WM-002' },
      { id: 3, name: 'Office Chair', category: 'Furniture', price: 299.99, stock: 15, status: 'Low Stock', sku: 'OC-003' },
      { id: 4, name: 'Desk Lamp', category: 'Furniture', price: 49.99, stock: 0, status: 'Out of Stock', sku: 'DL-004' },
      { id: 5, name: 'USB Hub', category: 'Electronics', price: 39.99, stock: 85, status: 'In Stock', sku: 'UH-005' },
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
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Products</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Manage your product inventory</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>All Products ({products.length})</h2>
          </div>
          
          <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Product</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>SKU</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{product.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{product.category}</div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6B7280', fontFamily: 'monospace' }}>{product.sku}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>${product.price}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: 
                          product.stock === 0 ? '#FEE2E2' :
                          product.stock < 10 ? '#FEF3C7' :
                          '#D1FAE5',
                        color: 
                          product.stock === 0 ? '#991B1B' :
                          product.stock < 10 ? '#92400E' :
                          '#065F46'
                      }}>
                        {product.stock} units
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: 
                          product.status === 'In Stock' ? '#D1FAE5' :
                          product.status === 'Low Stock' ? '#FEF3C7' :
                          '#FEE2E2',
                        color: 
                          product.status === 'In Stock' ? '#065F46' :
                          product.status === 'Low Stock' ? '#92400E' :
                          '#991B1B'
                      }}>
                        {product.status}
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

  // Analytics content
  const renderAnalytics = () => {
    const analyticsData = [
      { metric: 'Total Revenue', value: '$2,449.90', change: '+12.5%', trend: 'up' },
      { metric: 'Active Users', value: '10', change: '+8.2%', trend: 'up' },
      { metric: 'Conversion Rate', value: '3.4%', change: '-0.5%', trend: 'down' },
      { metric: 'Avg Order Value', value: '$244.99', change: '+5.3%', trend: 'up' },
    ];

    const salesData = [
      { month: 'Jan', sales: 12500, orders: 142 },
      { month: 'Feb', sales: 15800, orders: 178 },
      { month: 'Mar', sales: 18900, orders: 201 },
      { month: 'Apr', sales: 22100, orders: 234 },
      { month: 'May', sales: 25600, orders: 267 },
      { month: 'Jun', sales: 29800, orders: 289 },
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
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Analytics</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Monitor your e-commerce performance</p>
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {analyticsData.map((item, index) => (
            <div key={index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '14px', color: '#6B7280', margin: 0, fontWeight: '500' }}>{item.metric}</h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  backgroundColor: item.trend === 'up' ? '#D1FAE5' : '#FEE2E2',
                  color: item.trend === 'up' ? '#065F46' : '#991B1B'
                }}>
                  {item.change}
                </span>
              </div>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Sales Overview */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Sales Overview</h2>
          </div>
          
          <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Month</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Sales</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Orders</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', textTransform: 'uppercase' }}>Avg Order</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827' }}>{row.month}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>${row.sales.toLocaleString()}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', textAlign: 'right' }}>{row.orders}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#111827', textAlign: 'right' }}>${(row.sales / row.orders).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Settings content
  const renderSettings = () => {
    const toggleSetting = (sectionIndex, itemIndex) => {
      const newSettings = [...settingsState];
      const currentValue = newSettings[sectionIndex].items[itemIndex].value;
      const newValue = currentValue === 'enabled' ? 'disabled' : 'enabled';
      newSettings[sectionIndex].items[itemIndex].value = newValue;
      setSettingsState(newSettings);
    };

    const handleSave = () => {
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 3000);
    };

    const renderToggle = (sectionIndex, itemIndex, item) => (
      <button
        onClick={() => toggleSetting(sectionIndex, itemIndex)}
        style={{
          width: '52px',
          height: '28px',
          backgroundColor: item.value === 'enabled' ? '#10B981' : '#D1D5DB',
          border: 'none',
          borderRadius: '14px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: item.value === 'enabled' ? '0 2px 8px rgba(16, 185, 129, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        <div style={{
          width: '22px',
          height: '22px',
          backgroundColor: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '3px',
          left: item.value === 'enabled' ? '27px' : '3px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
        }} />
      </button>
    );

    const renderButton = (sectionIndex, itemIndex, item) => (
      <button
        onClick={() => toggleSetting(sectionIndex, itemIndex)}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          backgroundColor: '#F3F4F6',
          color: '#6B7280',
          border: '1px solid #E5E7EB',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#E5E7EB';
          e.target.style.color = '#374151';
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#F3F4F6';
          e.target.style.color = '#6B7280';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }}
      >
        {item.type === 'toggle' ? (item.value === 'enabled' ? 'Disable' : 'Enable') : 'Change'}
      </button>
    );

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
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '20px 0 0 0'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(225deg, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 0'
        }} />
        
        <div style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', color: '#1F2937', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px' }}>Settings</h1>
          <p style={{ color: '#6B7280', fontSize: '18px', fontWeight: '400' }}>Manage your store configuration and preferences</p>
        </div>

        {showSaveMessage && (
          <div style={{
            backgroundColor: '#10B981',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            animation: 'slideIn 0.3s ease'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
              ✓
            </div>
            <span style={{ fontSize: '15px', fontWeight: '600' }}>Settings saved successfully!</span>
          </div>
        )}

        {settingsState.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            border: '1px solid rgba(229, 231, 235, 0.8)', 
            overflow: 'hidden', 
            marginBottom: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <div style={{ 
              padding: '28px 32px', 
              borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
              background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>{section.category}</h2>
            </div>
            
            <div style={{ padding: '0' }}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '24px 32px', 
                  borderBottom: itemIndex < section.items.length - 1 ? '1px solid rgba(229, 231, 235, 0.5)' : 'none',
                  transition: 'background-color 0.2s ease',
                  position: 'relative'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '6px' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '400' }}>
                      {item.type === 'toggle' ? (item.value === 'enabled' ? 'Currently enabled' : 'Currently disabled') : `Current: ${item.value}`}
                    </div>
                  </div>
                  {item.type === 'toggle' ? renderToggle(sectionIndex, itemIndex, item) : renderButton(sectionIndex, itemIndex, item)}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 24px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#10B981';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            Save Changes
          </button>
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#6B7280',
              border: '1px solid rgba(229, 231, 235, 0.8)',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#F9FAFB';
              e.target.style.color = '#374151';
              e.target.style.borderColor = 'rgba(229, 231, 235, 1)';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#6B7280';
              e.target.style.borderColor = 'rgba(229, 231, 235, 0.8)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Render content based on current path
  const renderContent = () => {
    if (currentPath.includes('/users')) {
      return renderUsers();
    }
    if (currentPath.includes('/products')) {
      return renderProducts();
    }
    if (currentPath.includes('/orders')) {
      return renderOrders();
    }
    if (currentPath.includes('/analytics')) {
      return renderAnalytics();
    }
    if (currentPath.includes('/settings')) {
      return renderSettings();
    }
    return renderDashboard(); // Default to dashboard
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        height: '100vh',
        background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)', 
        padding: '0',
        color: 'white',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
            }}>
              🛍️
            </div>
            <div>
              <h2 style={{ fontSize: '20px', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>Admin Panel</h2>
              <p style={{ fontSize: '13px', margin: '4px 0 0 0', color: '#94A3B8', opacity: '0.8', fontWeight: '400' }}>E-Commerce Management</p>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Link to="/admin/dashboard" style={{ 
              color: '#E2E8F0', 
              textDecoration: 'none', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: currentPath.includes('/dashboard') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: currentPath.includes('/dashboard') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              position: 'relative'
            }}>
              <span style={{ fontSize: '20px', filter: currentPath.includes('/dashboard') ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none', opacity: currentPath.includes('/dashboard') ? 1 : 0.8 }}>📊</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: currentPath.includes('/dashboard') ? '600' : '500', display: 'block', lineHeight: '1.2' }}>Dashboard</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>Overview</span>
              </div>
            </Link>
            <Link to="/admin/users" style={{ 
              color: '#E2E8F0', 
              textDecoration: 'none', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: currentPath.includes('/users') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: currentPath.includes('/users') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              position: 'relative'
            }}>
              <span style={{ fontSize: '20px', opacity: currentPath.includes('/users') ? 1 : 0.8 }}>👥</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: currentPath.includes('/users') ? '600' : '500', display: 'block', lineHeight: '1.2' }}>Users</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>Management</span>
              </div>
            </Link>
            <Link to="/admin/products" style={{ 
              color: '#E2E8F0', 
              textDecoration: 'none', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: currentPath.includes('/products') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: currentPath.includes('/products') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              position: 'relative'
            }}>
              <span style={{ fontSize: '20px', opacity: currentPath.includes('/products') ? 1 : 0.8 }}>📦</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: currentPath.includes('/products') ? '600' : '500', display: 'block', lineHeight: '1.2' }}>Products</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>Inventory</span>
              </div>
            </Link>
            <Link to="/admin/orders" style={{ 
              color: '#E2E8F0', 
              textDecoration: 'none', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: currentPath.includes('/orders') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: currentPath.includes('/orders') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              position: 'relative'
            }}>
              <span style={{ fontSize: '20px', opacity: currentPath.includes('/orders') ? 1 : 0.8 }}>🛒</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: currentPath.includes('/orders') ? '600' : '500', display: 'block', lineHeight: '1.2' }}>Orders</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>Tracking</span>
              </div>
            </Link>
            <Link to="/admin/analytics" style={{ 
              color: '#E2E8F0', 
              textDecoration: 'none', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: currentPath.includes('/analytics') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: currentPath.includes('/analytics') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              position: 'relative'
            }}>
              <span style={{ fontSize: '20px', opacity: currentPath.includes('/analytics') ? 1 : 0.8 }}>📈</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: currentPath.includes('/analytics') ? '600' : '500', display: 'block', lineHeight: '1.2' }}>Analytics</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>Reports</span>
              </div>
            </Link>
            <Link to="/admin/settings" style={{ 
              color: '#E2E8F0', 
              textDecoration: 'none', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: currentPath.includes('/settings') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: currentPath.includes('/settings') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              position: 'relative'
            }}>
              <span style={{ fontSize: '20px', opacity: currentPath.includes('/settings') ? 1 : 0.8 }}>⚙️</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: currentPath.includes('/settings') ? '600' : '500', display: 'block', lineHeight: '1.2' }}>Settings</span>
                <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>Configuration</span>
              </div>
            </Link>
          </div>
        </div>
        
        {/* User Profile and Logout Section */}
        <div style={{ 
          padding: '24px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
          marginTop: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px', 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#667EEA', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>
                {user?.name || 'Admin User'}
              </p>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
                {user?.email || 'admin@example.com'}
              </p>
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
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{ 
          position: 'relative', 
          zIndex: 1,
          width: '100%',
          maxWidth: '1400px',
          padding: '0 40px'
        }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FinalWorkingLayout;
