import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import CustomerPanel from './components/CustomerPanel';
import SellerPanel from './components/SellerPanel';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/customer/*" element={<CustomerPanel />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/seller/*" element={<SellerPanel />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
