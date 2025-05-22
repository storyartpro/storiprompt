import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import ContentManager from './ContentManager';
import DesignSettings from './DesignSettings';
import ImportExport from './ImportExport';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('content');
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // In a real app, this would fetch user data from an API
    setUserData({
      username: 'test',
      role: 'admin',
      lastLogin: new Date().toLocaleString()
    });
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    window.location.reload();
  };
  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'content':
        return <ContentManager />;
      case 'design':
        return <DesignSettings />;
      case 'import-export':
        return <ImportExport />;
      default:
        return <ContentManager />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeSection === 'content' && 'Управление контентом'}
              {activeSection === 'design' && 'Настройки дизайна'}
              {activeSection === 'import-export' && 'Импорт/Экспорт'}
            </h1>
            
            <div className="flex items-center">
              {userData && (
                <div className="mr-4 text-sm text-gray-600">
                  Пользователь: <span className="font-semibold">{userData.username}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Выйти
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
