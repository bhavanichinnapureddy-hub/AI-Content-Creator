import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Enforces authentication and specific role access.
 * If user is not authenticated, redirects to the role's login or the select-role page.
 * If user role doesn't match allowedRoles, redirects them to their own role home page.
 */
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // If route specifies exactly one expected role, redirect to that role's login
    if (allowedRoles.length === 1) {
      if (allowedRoles[0] === 'admin') {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
      }
      if (allowedRoles[0] === 'creator') {
        return <Navigate to="/creator/login" state={{ from: location }} replace />;
      }
      if (allowedRoles[0] === 'customer') {
        return <Navigate to="/customer/login" state={{ from: location }} replace />;
      }
    }
    // Shared routes or general access redirect to the 3-role selection landing page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user role is not authorized for this specific route
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect to their own role's home page
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    if (currentUser.role === 'creator') {
      return <Navigate to="/creator/home" replace />;
    }
    if (currentUser.role === 'customer') {
      return <Navigate to="/customer/home" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};
