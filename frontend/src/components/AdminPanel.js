import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from './admin/FinalWorkingLayout';

const AdminPanel = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || (user && user.role !== 'ADMIN')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminLayout />} />
        <Route path="users" element={<AdminLayout />} />
        <Route path="products" element={<AdminLayout />} />
        <Route path="orders" element={<AdminLayout />} />
        <Route path="analytics" element={<AdminLayout />} />
        <Route path="settings" element={<AdminLayout />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;
