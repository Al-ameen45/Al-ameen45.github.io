import React, { useState, useEffect } from 'react';
import { Download, Calendar, MapPin, Clock, QrCode as QrCodeIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateQRCode, downloadQRCode, QRCodeData } from '../../utils/qrcode';

interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  registeredAt: string;
  qrCode?: string;
}

const QRCodes: React.FC = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loadingQR, setLoadingQR] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockRegistrations: EventRegistration[] = [
      {
        id: 'reg1',
        eventId: 'event1',
        eventTitle: 'React Workshop',
        eventDate: '2024-01-15',
        eventTime: '10:00 AM',
        eventLocation: 'Conference Room A',
        registeredAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'reg2',
        eventId: 'event2',
        eventTitle: 'Tech Conference 2024',
        eventDate: '2024-01-20',
        eventTime: '9:00 AM',
        eventLocation: 'Main Auditorium',
        registeredAt: '2024-01-01T00:00:00Z',
      },
    ];

    // Generate QR codes for each registration
    const generateQRCodes = async () => {
      const updatedRegistrations = await Promise.all(
        mockRegistrations.map(async (registration) => {
          const qrData: QRCodeData = {
            userId: user?.id || '',
            eventId: registration.eventId,
            registrationId: registration.id,
            timestamp: registration.registeredAt,
          };

          try {
            const qrCode = await generateQRCode(qrData);
            return { ...registration, qrCode };
          } catch (error) {
            console.error('Error generating QR code:', error);
            return registration;
          }
        })
      );
      setRegistrations(updatedRegistrations);
    };

    generateQRCodes();
  }, [user?.id]);

  const handleDownloadQR = async (registration: EventRegistration) => {
    if (!registration.qrCode) {
      setLoadingQR(registration.id);
      
      const qrData: QRCodeData = {
        userId: user?.id || '',
        eventId: registration.eventId,
        registrationId: registration.id,
        timestamp: registration.registeredAt,
      };

      try {
        const qrCode = await generateQRCode(qrData);
        const filename = `${registration.eventTitle.replace(/\s+/g, '_')}_QR.png`;
        downloadQRCode(qrCode, filename);
        
        // Update the registration with the generated QR code
        setRegistrations(prev =>
          prev.map(reg =>
            reg.id === registration.id ? { ...reg, qrCode } : reg
          )
        );
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setLoadingQR(null);
      }
    } else {
      const filename = `${registration.eventTitle.replace(/\s+/g, '_')}_QR.png`;
      downloadQRCode(registration.qrCode, filename);
    }
  };

  const isEventUpcoming = (eventDate: string) => {
    return new Date(eventDate) > new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My QR Codes</h1>
        <p className="text-gray-600">Download and use these QR codes for event attendance</p>
      </div>

      {registrations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {registrations.map((registration) => (
            <div key={registration.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {registration.eventTitle}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {registration.eventDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {registration.eventTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {registration.eventLocation}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isEventUpcoming(registration.eventDate) ? (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Upcoming
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      Past
                    </span>
                  )}
                </div>
              </div>

              {/* QR Code Display */}
              <div className="flex justify-center mb-4">
                {registration.qrCode ? (
                  <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                    <img
                      src={registration.qrCode}
                      alt={`QR Code for ${registration.eventTitle}`}
                      className="w-32 h-32"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCodeIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Generating QR Code...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => handleDownloadQR(registration)}
                  disabled={loadingQR === registration.id}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {loadingQR === registration.id ? 'Generating...' : 'Download QR Code'}
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Show this QR code at the event for attendance
                  </p>
                </div>
              </div>

              {/* Registration Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Registered on {new Date(registration.registeredAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <QrCodeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No QR Codes Yet</h3>
          <p className="text-gray-600 mb-4">
            Register for events to get your QR codes for attendance
          </p>
          <button className="btn-primary">
            Browse Events
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">How to use QR Codes</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Download your QR code before attending the event</li>
          <li>• Show the QR code to event staff for quick check-in</li>
          <li>• Keep the QR code on your phone or print it out</li>
          <li>• Each QR code is unique to you and the specific event</li>
        </ul>
      </div>
    </div>
  );
};

export default QRCodes;