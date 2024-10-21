import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/utils/context/auth-context';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;