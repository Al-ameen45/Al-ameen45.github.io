import React, { useState, useRef, useEffect } from 'react';
import { Camera, ScanLine, CheckCircle, XCircle, Users, Calendar } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  userName: string;
  userEmail: string;
  scannedAt: string;
  eventTitle: string;
}

const AttendanceScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [scanResult, setScanResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock events data
  const events = [
    { id: '1', title: 'React Workshop', date: '2024-01-15' },
    { id: '2', title: 'Tech Conference 2024', date: '2024-01-20' },
    { id: '3', title: 'Networking Event', date: '2024-01-25' },
  ];

  // Mock attendance records
  const mockAttendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      scannedAt: new Date().toISOString(),
      eventTitle: 'React Workshop',
    },
    {
      id: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      scannedAt: new Date(Date.now() - 300000).toISOString(),
      eventTitle: 'React Workshop',
    },
  ];

  useEffect(() => {
    setAttendanceRecords(mockAttendanceRecords);
  }, []);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setScanResult({
        type: 'error',
        message: 'Unable to access camera. Please check permissions.'
      });
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
    // Simulate scanning a QR code
    const mockUser = {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      eventId: selectedEvent,
    };

    const selectedEventData = events.find(e => e.id === selectedEvent);
    
    if (selectedEventData) {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        userName: mockUser.name,
        userEmail: mockUser.email,
        scannedAt: new Date().toISOString(),
        eventTitle: selectedEventData.title,
      };

      setAttendanceRecords(prev => [newRecord, ...prev]);
      setScanResult({
        type: 'success',
        message: `Successfully recorded attendance for ${mockUser.name}`
      });

      // Clear the result after 3 seconds
      setTimeout(() => setScanResult(null), 3000);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Scanner</h1>
        <p className="text-gray-600">Scan QR codes to record event attendance</p>
      </div>

      {/* Event Selection */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event.id)}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                selectedEvent === event.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm text-gray-600">{event.date}</span>
              </div>
              <h3 className="font-medium text-gray-900">{event.title}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Scanner Section */}
      {selectedEvent && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera/Scanner */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">QR Code Scanner</h2>
            
            <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {isScanning ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Scanning overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary-500 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary-500 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary-500 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary-500 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary-500 rounded-br-lg"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Camera not active</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {!isScanning ? (
                <button
                  onClick={startScanning}
                  className="w-full btn-primary flex items-center justify-center"
                  disabled={!selectedEvent}
                >
                  <ScanLine className="h-4 w-4 mr-2" />
                  Start Scanning
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={stopScanning}
                    className="w-full btn-secondary"
                  >
                    Stop Scanning
                  </button>
                  <button
                    onClick={simulateQRScan}
                    className="w-full btn-primary"
                  >
                    Simulate QR Scan (Demo)
                  </button>
                </div>
              )}

              {/* Scan Result */}
              {scanResult && (
                <div className={`p-3 rounded-lg flex items-center ${
                  scanResult.type === 'success' 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  {scanResult.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <span className="text-sm">{scanResult.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Attendance</h2>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {attendanceRecords.length} recorded
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {attendanceRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{record.userName}</p>
                    <p className="text-sm text-gray-600">{record.userEmail}</p>
                    <p className="text-xs text-gray-500">{record.eventTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">Present</p>
                    <p className="text-xs text-gray-500">{formatTime(record.scannedAt)}</p>
                  </div>
                </div>
              ))}

              {attendanceRecords.length === 0 && (
                <div className="text-center py-8">
                  <ScanLine className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No attendance recorded yet</p>
                  <p className="text-sm text-gray-500">Start scanning QR codes to record attendance</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!selectedEvent && (
        <div className="card text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Event</h3>
          <p className="text-gray-600">Choose an event above to start scanning QR codes for attendance</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceScanner;