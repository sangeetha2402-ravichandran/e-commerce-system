import React from 'react';
import { Package, ShoppingCart, TrendingUp, DollarSign, Star, AlertCircle } from 'lucide-react';

const SellerDashboard = () => {
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

export default SellerDashboard;
