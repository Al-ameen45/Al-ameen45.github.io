import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Eye } from 'lucide-react';
import { Event } from '../../types/event';

const EventManagement: React.FC = () => {
  // Mock data - replace with actual API calls
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'React Workshop',
      description: 'Learn the fundamentals of React development',
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
      description: 'Annual technology conference with industry leaders',
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
      title: 'Networking Event',
      description: 'Connect with professionals in your field',
      date: '2024-01-25',
      time: '6:00 PM',
      location: 'Rooftop Lounge',
      maxAttendees: 50,
      currentAttendees: 45,
      createdBy: 'admin1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      isActive: true,
      registrations: [],
    },
  ]);

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Implement delete functionality
      console.log('Deleting event:', eventId);
    }
  };

  const getStatusColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600">Create and manage your events</p>
        </div>
        <Link to="/events/create" className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {event.title}
              </h3>
              <div className="flex space-x-1">
                <button
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Edit Event"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Event"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {event.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2 text-gray-600" />
                <span className={getStatusColor(event.currentAttendees, event.maxAttendees)}>
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

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 btn-secondary text-sm">
                View Registrations
              </button>
              <Link
                to={`/attendance/scan?eventId=${event.id}`}
                className="flex-1 btn-primary text-sm text-center"
              >
                Take Attendance
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first event</p>
          <Link to="/events/create" className="btn-primary">
            Create Event
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventManagement;