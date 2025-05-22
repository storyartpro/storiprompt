import React, { useState, useEffect } from 'react';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is already authenticated
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (adminAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPage;
