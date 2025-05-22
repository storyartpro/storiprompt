import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import ContentManager from './ContentManager';
import DesignSettings from './DesignSettings';
import ImportExport from './ImportExport';

const AdminDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('content');

  const renderContent = () => {
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
        onLogout={onLogout} 
      />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeSection === 'content' && 'Управление контентом'}
              {activeSection === 'design' && 'Настройки дизайна'}
              {activeSection === 'import-export' && 'Импорт/Экспорт данных'}
            </h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
