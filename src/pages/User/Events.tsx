import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Search, Filter } from 'lucide-react';
import { Event } from '../../types/event';

const UserEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  // Mock events data - replace with actual API calls
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'React Workshop',
      description: 'Learn the fundamentals of React development with hands-on exercises and real-world examples.',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Conference Room A',
      maxAttendees: 30,
      currentAttendees: 25,
      createdBy: 'admin1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      isActive: true,
      registrations: [],
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring industry leaders and cutting-edge innovations.',
      date: '2024-01-20',
      time: '9:00 AM',
      location: 'Main Auditorium',
      maxAttendees: 200,
      currentAttendees: 150,
      createdBy: 'admin1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      isActive: true,
      registrations: [],
    },
    {
      id: '3',
      title: 'Python for Beginners',
      description: 'Introduction to Python programming for complete beginners.',
      date: '2024-01-30',
      time: '11:00 AM',
      location: 'Lab 1',
      maxAttendees: 25,
      currentAttendees: 18,
      createdBy: 'admin2',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      isActive: true,
      registrations: [],
    },
    {
      id: '4',
      title: 'Web Development Bootcamp',
      description: 'Intensive bootcamp covering HTML, CSS, JavaScript, and modern frameworks.',
      date: '2024-02-05',
      time: '9:00 AM',
      location: 'Main Hall',
      maxAttendees: 50,
      currentAttendees: 32,
      createdBy: 'admin1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      isActive: true,
      registrations: [],
    },
  ]);

  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['1', '2']); // Mock registered events

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || event.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const handleRegister = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId]);
      // Here you would make an API call to register for the event
      console.log('Registering for event:', eventId);
    }
  };

  const handleUnregister = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
    // Here you would make an API call to unregister from the event
    console.log('Unregistering from event:', eventId);
  };

  const isEventFull = (event: Event) => {
    return event.currentAttendees >= event.maxAttendees;
  };

  const isEventPast = (eventDate: string) => {
    return new Date(eventDate) < new Date();
  };

  const getAvailabilityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Available Events</h1>
        <p className="text-gray-600">Discover and register for upcoming events</p>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="input-field pl-10"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = registeredEvents.includes(event.id);
          const isFull = isEventFull(event);
          const isPast = isEventPast(event.date);
          
          return (
            <div key={event.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
                  {event.title}
                </h3>
                <div className="flex flex-col items-end space-y-1">
                  {isRegistered && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Registered
                    </span>
                  )}
                  {isFull && !isRegistered && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Full
                    </span>
                  )}
                  {isPast && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      Past Event
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-gray-600" />
                  <span className={getAvailabilityColor(event.currentAttendees, event.maxAttendees)}>
                    {event.currentAttendees}/{event.maxAttendees} registered
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex space-x-2">
                {isRegistered ? (
                  <button
                    onClick={() => handleUnregister(event.id)}
                    className="flex-1 btn-secondary"
                    disabled={isPast}
                  >
                    {isPast ? 'Event Completed' : 'Unregister'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="flex-1 btn-primary"
                    disabled={isFull || isPast}
                  >
                    {isPast ? 'Event Completed' : isFull ? 'Event Full' : 'Register'}
                  </button>
                )}
                <button className="btn-secondary">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterDate 
              ? 'Try adjusting your search or filter criteria'
              : 'No events are currently available'
            }
          </p>
          {(searchTerm || filterDate) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDate('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserEvents;