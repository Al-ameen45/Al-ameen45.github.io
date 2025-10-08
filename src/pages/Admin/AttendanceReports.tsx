import React, { useState } from 'react';
import { Download, Calendar, Users, TrendingUp, Filter, Search } from 'lucide-react';

interface AttendanceReport {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  totalRegistrations: number;
  totalAttendees: number;
  attendanceRate: number;
  attendees: {
    id: string;
    name: string;
    email: string;
    attendedAt: string;
  }[];
}

const AttendanceReports: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual API calls
  const reports: AttendanceReport[] = [
    {
      eventId: '1',
      eventTitle: 'React Workshop',
      eventDate: '2024-01-15',
      totalRegistrations: 30,
      totalAttendees: 25,
      attendanceRate: 83.3,
      attendees: [
        { id: '1', name: 'John Doe', email: 'john@example.com', attendedAt: '2024-01-15T10:15:00Z' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', attendedAt: '2024-01-15T10:20:00Z' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', attendedAt: '2024-01-15T10:25:00Z' },
      ],
    },
    {
      eventId: '2',
      eventTitle: 'Tech Conference 2024',
      eventDate: '2024-01-20',
      totalRegistrations: 200,
      totalAttendees: 180,
      attendanceRate: 90.0,
      attendees: [
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', attendedAt: '2024-01-20T09:10:00Z' },
        { id: '5', name: 'Bob Wilson', email: 'bob@example.com', attendedAt: '2024-01-20T09:15:00Z' },
      ],
    },
    {
      eventId: '3',
      eventTitle: 'JavaScript Fundamentals',
      eventDate: '2024-01-10',
      totalRegistrations: 25,
      totalAttendees: 22,
      attendanceRate: 88.0,
      attendees: [
        { id: '6', name: 'Carol Davis', email: 'carol@example.com', attendedAt: '2024-01-10T14:05:00Z' },
        { id: '7', name: 'David Lee', email: 'david@example.com', attendedAt: '2024-01-10T14:10:00Z' },
      ],
    },
  ];

  const filteredReports = reports.filter(report =>
    report.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedReport = selectedEvent ? reports.find(r => r.eventId === selectedEvent) : null;

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceRateBgColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-100';
    if (rate >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const exportToCSV = (report: AttendanceReport) => {
    const csvContent = [
      ['Name', 'Email', 'Attended At'],
      ...report.attendees.map(attendee => [
        attendee.name,
        attendee.email,
        new Date(attendee.attendedAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.eventTitle.replace(/\s+/g, '_')}_attendance.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Reports</h1>
        <p className="text-gray-600">View and export attendance data for your events</p>
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
          <div className="md:w-64">
            <select
              className="input-field"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Select event for details</option>
              {filteredReports.map((report) => (
                <option key={report.eventId} value={report.eventId}>
                  {report.eventTitle}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.eventId} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{report.eventTitle}</h3>
              <button
                onClick={() => exportToCSV(report)}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                title="Export to CSV"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {report.eventDate}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{report.totalRegistrations}</div>
                  <div className="text-xs text-gray-600">Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{report.totalAttendees}</div>
                  <div className="text-xs text-gray-600">Attended</div>
                </div>
              </div>

              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAttendanceRateBgColor(report.attendanceRate)}`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className={getAttendanceRateColor(report.attendanceRate)}>
                    {report.attendanceRate.toFixed(1)}% attendance
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvent(report.eventId)}
                className="w-full btn-secondary text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Report */}
      {selectedReport && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedReport.eventTitle}</h2>
              <p className="text-gray-600">Detailed attendance report</p>
            </div>
            <button
              onClick={() => exportToCSV(selectedReport)}
              className="btn-primary flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{selectedReport.totalRegistrations}</div>
              <div className="text-sm text-gray-600">Total Registered</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">{selectedReport.totalAttendees}</div>
              <div className="text-sm text-gray-600">Total Attended</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {selectedReport.totalRegistrations - selectedReport.totalAttendees}
              </div>
              <div className="text-sm text-gray-600">No Shows</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className={`text-2xl font-bold ${getAttendanceRateColor(selectedReport.attendanceRate)}`}>
                {selectedReport.attendanceRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
          </div>

          {/* Attendees List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Attendees ({selectedReport.attendees.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedReport.attendees.map((attendee) => (
                    <tr key={attendee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {attendee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {attendee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(attendee.attendedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search criteria' : 'No attendance reports available yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceReports;