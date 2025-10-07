import React from 'react';
import { Calendar, Users, QrCode, TrendingUp, Plus, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    myEvents: 12,
    totalRegistrations: 245,
    todayAttendance: 18,
    upcomingEvents: 3,
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'React Workshop',
      date: '2024-01-15',
      time: '10:00 AM',
      registrations: 25,
      maxAttendees: 30,
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: '2024-01-20',
      time: '9:00 AM',
      registrations: 150,
      maxAttendees: 200,
    },
    {
      id: 3,
      title: 'Networking Event',
      date: '2024-01-25',
      time: '6:00 PM',
      registrations: 45,
      maxAttendees: 50,
    },
  ];

  const recentAttendance = [
    { id: 1, eventTitle: 'Morning Standup', attendee: 'John Doe', time: '9:15 AM' },
    { id: 2, eventTitle: 'Team Meeting', attendee: 'Jane Smith', time: '10:30 AM' },
    { id: 3, eventTitle: 'Workshop Session', attendee: 'Mike Wilson', time: '2:45 PM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your events and track attendance</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/events/create" className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Link>
          <Link to="/attendance/scan" className="btn-secondary flex items-center">
            <ScanLine className="h-4 w-4 mr-2" />
            Scan QR
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
              <p className="text-sm font-medium text-gray-600">My Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.myEvents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Registrations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <QrCode className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayAttendance}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Link to="/events" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {event.registrations}/{event.maxAttendees}
                    </p>
                    <p className="text-xs text-gray-500">registered</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(event.registrations / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Attendance</h2>
            <Link to="/attendance/reports" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Reports
            </Link>
          </div>
          <div className="space-y-4">
            {recentAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{record.attendee}</p>
                  <p className="text-sm text-gray-600">{record.eventTitle}</p>
                </div>
                <span className="text-sm text-gray-500">{record.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;