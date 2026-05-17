import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FinalSellerLayout from './seller/FinalSellerLayout';

const SellerPanel = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || (user && user.role !== 'SELLER')) {
    return <Navigate to="/login" replace />;
  }

  return <FinalSellerLayout />;
};

export default SellerPanel;
