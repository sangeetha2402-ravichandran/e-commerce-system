import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SellerLayout from './seller/SellerLayout';

const SellerPanel = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || (user && user.role !== 'SELLER')) {
    return <Navigate to="/login" replace />;
  }

  return <SellerLayout />;
};

export default SellerPanel;
