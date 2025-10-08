import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';

// Import pages
import EventManagement from './pages/Admin/EventManagement';
import CreateEvent from './pages/Admin/CreateEvent';
import AttendanceScanner from './pages/Admin/AttendanceScanner';
import AttendanceReports from './pages/Admin/AttendanceReports';
import UserManagement from './pages/SuperAdmin/UserManagement';
import UserEvents from './pages/User/Events';
import MyEvents from './pages/User/MyEvents';
import QRCodes from './pages/User/QRCodes';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Super Admin Routes */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <Layout>
                    <UserManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <EventManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/events"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'admin', 'user']}>
                  <Layout>
                    <UserEvents />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/events/create"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <CreateEvent />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/attendance/scan"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AttendanceScanner />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/attendance/reports"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AttendanceReports />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* User Routes */}
            <Route
              path="/my-events"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Layout>
                    <MyEvents />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/qr-codes"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Layout>
                    <QRCodes />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;