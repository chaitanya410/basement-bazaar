
import React from 'react';
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  currentView: 'dashboard' | 'events' | 'users' | 'settings';
  setCurrentView: (view: 'dashboard' | 'events' | 'users' | 'settings') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full md:w-64 flex-shrink-0 transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Basements Social Forum</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id as any)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors ${
                    currentView === item.id
                      ? 'bg-ngo-blue text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
