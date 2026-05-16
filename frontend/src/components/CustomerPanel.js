import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FinalCustomerLayout from './customer/FinalCustomerLayout';
import CustomerDashboard from './customer/CustomerDashboard';
import ProductList from './customer/ProductList';
import Cart from './customer/Cart';
import Checkout from './customer/Checkout';
import Orders from './customer/Orders';
import Profile from './customer/Profile';
import NotificationCenter from './customer/NotificationCenter';

const CustomerPanel = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || (user && user.role !== 'CUSTOMER')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <FinalCustomerLayout>
      <Routes>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </FinalCustomerLayout>
  );
};

export default CustomerPanel;
