
import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  description: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  image,
  description,
  location,
}) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-4 left-4 bg-ngo-blue/90 text-ngo-dark px-3 py-1 rounded-full text-sm font-medium">
          {date}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-display mb-2 group-hover:text-ngo-blue transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
