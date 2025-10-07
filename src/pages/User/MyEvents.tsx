import React, { useState } from 'react';
import { Calendar, MapPin, Clock, QrCode, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MyEventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  registeredAt: string;
  hasAttended: boolean;
  attendedAt?: string;
  qrCodeAvailable: boolean;
}

const MyEvents: React.FC = () => {
  // Mock data - replace with actual API calls
  const [myEvents] = useState<MyEventRegistration[]>([
    {
      id: 'reg1',
      eventId: 'event1',
      eventTitle: 'React Workshop',
      eventDescription: 'Learn the fundamentals of React development with hands-on exercises.',
      eventDate: '2024-01-15',
      eventTime: '10:00 AM',
      eventLocation: 'Conference Room A',
      registeredAt: '2024-01-01T00:00:00Z',
      hasAttended: false,
      qrCodeAvailable: true,
    },
    {
      id: 'reg2',
      eventId: 'event2',
      eventTitle: 'Tech Conference 2024',
      eventDescription: 'Annual technology conference featuring industry leaders.',
      eventDate: '2024-01-20',
      eventTime: '9:00 AM',
      eventLocation: 'Main Auditorium',
      registeredAt: '2024-01-01T00:00:00Z',
      hasAttended: false,
      qrCodeAvailable: true,
    },
    {
      id: 'reg3',
      eventId: 'event3',
      eventTitle: 'JavaScript Fundamentals',
      eventDescription: 'Deep dive into JavaScript concepts and best practices.',
      eventDate: '2024-01-10',
      eventTime: '2:00 PM',
      eventLocation: 'Room B',
      registeredAt: '2023-12-20T00:00:00Z',
      hasAttended: true,
      attendedAt: '2024-01-10T14:15:00Z',
      qrCodeAvailable: false,
    },
    {
      id: 'reg4',
      eventId: 'event4',
      eventTitle: 'Node.js Backend Development',
      eventDescription: 'Build scalable backend applications with Node.js.',
      eventDate: '2024-01-05',
      eventTime: '11:00 AM',
      eventLocation: 'Lab 2',
      registeredAt: '2023-12-15T00:00:00Z',
      hasAttended: false,
      attendedAt: undefined,
      qrCodeAvailable: false,
    },
  ]);

  const upcomingEvents = myEvents.filter(event => new Date(event.eventDate) > new Date());
  const pastEvents = myEvents.filter(event => new Date(event.eventDate) <= new Date());

  const handleUnregister = (registrationId: string) => {
    if (window.confirm('Are you sure you want to unregister from this event?')) {
      // Implement unregister functionality
      console.log('Unregistering from event:', registrationId);
    }
  };

  const getEventStatus = (event: MyEventRegistration) => {
    const eventDate = new Date(event.eventDate);
    const now = new Date();
    
    if (eventDate < now) {
      return event.hasAttended ? 'attended' : 'missed';
    }
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attended':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attended':
        return <CheckCircle className="h-4 w-4" />;
      case 'missed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const EventCard: React.FC<{ event: MyEventRegistration; showActions?: boolean }> = ({ 
    event, 
    showActions = false 
  }) => {
    const status = getEventStatus(event);
    
    return (
      <div className="card">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
            {event.eventTitle}
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
              <span className="ml-1 capitalize">{status}</span>
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.eventDescription}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {event.eventDate}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {event.eventTime}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.eventLocation}
          </div>
        </div>

        {event.hasAttended && event.attendedAt && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Attended on {new Date(event.attendedAt).toLocaleDateString()} at{' '}
              {new Date(event.attendedAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 mb-4">
          Registered on {new Date(event.registeredAt).toLocaleDateString()}
        </div>

        {showActions && (
          <div className="flex space-x-2">
            {event.qrCodeAvailable && (
              <Link
                to="/qr-codes"
                className="flex-1 btn-primary flex items-center justify-center text-sm"
              >
                <QrCode className="h-4 w-4 mr-2" />
                View QR Code
              </Link>
            )}
            {status === 'upcoming' && (
              <button
                onClick={() => handleUnregister(event.id)}
                className="flex-1 btn-secondary text-sm"
              >
                Unregister
              </button>
            )}
            {!event.qrCodeAvailable && status === 'upcoming' && (
              <button className="flex-1 btn-secondary text-sm" disabled>
                QR Code Unavailable
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-600">Track your event registrations and attendance</p>
        </div>
        <Link to="/events" className="btn-primary">
          Browse More Events
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{myEvents.length}</div>
          <div className="text-sm text-gray-600">Total Registered</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {myEvents.filter(e => e.hasAttended).length}
          </div>
          <div className="text-sm text-gray-600">Attended</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{upcomingEvents.length}</div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} showActions={true} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {myEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Yet</h3>
          <p className="text-gray-600 mb-4">
            You haven't registered for any events yet. Start exploring!
          </p>
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyEvents;