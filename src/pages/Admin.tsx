
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from '../components/AdminDashboard';
import AdminEvents from '../components/AdminEvents';
import AdminUsers from '../components/AdminUsers';
import AdminSettings from '../components/AdminSettings';

type AdminView = 'dashboard' | 'events' | 'users' | 'settings';

const Admin: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'events':
        return <AdminEvents />;
      case 'users':
        return <AdminUsers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Admin Panel</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
