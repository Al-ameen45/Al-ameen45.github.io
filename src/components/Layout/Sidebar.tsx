import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  QrCode,
  UserCheck,
  Settings,
  Plus,
  ScanLine,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
    ];

    if (user?.role === 'super_admin') {
      return [
        ...baseItems,
        {
          name: 'User Management',
          href: '/users',
          icon: Users,
        },
        {
          name: 'All Events',
          href: '/events',
          icon: Calendar,
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: Settings,
        },
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        {
          name: 'My Events',
          href: '/admin/events',
          icon: Calendar,
        },
        {
          name: 'Create Event',
          href: '/events/create',
          icon: Plus,
        },
        {
          name: 'Scan Attendance',
          href: '/attendance/scan',
          icon: ScanLine,
        },
        {
          name: 'Attendance Reports',
          href: '/attendance/reports',
          icon: UserCheck,
        },
      ];
    }

    // User role
    return [
      ...baseItems,
      {
        name: 'Available Events',
        href: '/events',
        icon: Calendar,
      },
      {
        name: 'My Events',
        href: '/my-events',
        icon: UserCheck,
      },
      {
        name: 'My QR Codes',
        href: '/qr-codes',
        icon: QrCode,
      },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;