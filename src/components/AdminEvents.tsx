
import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const AdminEvents: React.FC = () => {
  // Mock events data
  const events = [
    { id: 1, title: 'Community Meetup', date: 'June 15, 2023', location: 'Wardha Community Center', status: 'Upcoming' },
    { id: 2, title: 'Charity Fundraiser', date: 'June 20, 2023', location: 'Main Square', status: 'Upcoming' },
    { id: 3, title: 'Workshop on Sustainability', date: 'June 25, 2023', location: 'City Library', status: 'Upcoming' },
    { id: 4, title: 'Volunteer Day', date: 'July 2, 2023', location: 'Various Locations', status: 'Upcoming' },
    { id: 5, title: 'Youth Leadership Program', date: 'May 10, 2023', location: 'Basements Forum HQ', status: 'Completed' },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Event</span>
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'Upcoming' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {event.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminEvents;
