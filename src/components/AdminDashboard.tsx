
import React from 'react';
import { Users, Calendar, FileText, Heart } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data for the dashboard
  const stats = [
    { title: 'Total Users', value: '120', icon: <Users />, color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' },
    { title: 'Events', value: '8', icon: <Calendar />, color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' },
    { title: 'Applications', value: '24', icon: <FileText />, color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' },
    { title: 'Volunteers', value: '32', icon: <Heart />, color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((_, index) => (
              <li key={index} className="border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                <div className="flex justify-between">
                  <p className="text-sm">New user registered</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{index + 1} day{index > 0 ? 's' : ''} ago</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
          <ul className="space-y-3">
            {[
              { name: 'Community Meetup', date: 'June 15, 2023' },
              { name: 'Charity Fundraiser', date: 'June 20, 2023' },
              { name: 'Workshop', date: 'June 25, 2023' },
              { name: 'Volunteer Day', date: 'July 2, 2023' },
            ].map((event, index) => (
              <li key={index} className="border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
