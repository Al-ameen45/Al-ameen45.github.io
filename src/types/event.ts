export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  registrations: EventRegistration[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: string;
  qrCode: string;
  hasAttended: boolean;
  attendedAt?: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
}

export interface AttendanceRecord {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  attendedAt: string;
  scannedBy: string;
}