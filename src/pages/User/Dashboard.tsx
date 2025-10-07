import React from 'react';
import { Calendar, QrCode, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    registeredEvents: 5,
    attendedEvents: 3,
    upcomingEvents: 2,
    qrCodes: 5,
  };

  const myEvents = [
    {
      id: 1,
      title: 'React Workshop',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Conference Room A',
      status: 'upcoming',
      hasQR: true,
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: '2024-01-20',
      time: '9:00 AM',
      location: 'Main Auditorium',
      status: 'upcoming',
      hasQR: true,
    },
    {
      id: 3,
      title: 'JavaScript Fundamentals',
      date: '2024-01-10',
      time: '2:00 PM',
      location: 'Room B',
      status: 'attended',
      hasQR: false,
    },
  ];

  const availableEvents = [
    {
      id: 4,
      title: 'Python for Beginners',
      date: '2024-01-30',
      time: '11:00 AM',
      location: 'Lab 1',
      maxAttendees: 25,
      currentAttendees: 18,
    },
    {
      id: 5,
      title: 'Web Development Bootcamp',
      date: '2024-02-05',
      time: '9:00 AM',
      location: 'Main Hall',
      maxAttendees: 50,
      currentAttendees: 32,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'attended':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Track your events and manage registrations</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
          <Link to="/qr-codes" className="btn-secondary flex items-center">
            <QrCode className="h-4 w-4 mr-2" />
            My QR Codes
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Registered Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.registeredEvents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attended Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.attendedEvents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <QrCode className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">QR Codes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.qrCodes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Events</h2>
            <Link to="/my-events" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {myEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    {event.hasQR && (
                      <QrCode className="h-4 w-4 text-primary-600" title="QR Code Available" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Available Events</h2>
            <Link to="/events" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {availableEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                  <button className="btn-primary text-sm">
                    Register
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{event.currentAttendees}/{event.maxAttendees} registered</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;