import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User is not authenticated, redirect to login page
    // 'replace' prevents the user from going "back" to the protected page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child route
  // <Outlet /> is a placeholder for whatever child route is nested inside
  return <Outlet />;
};

export default ProtectedRoute;