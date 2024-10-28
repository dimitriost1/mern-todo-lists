import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If there's no token, redirect to the home page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the token exists, render the child components
  return children;
};

export default ProtectedRoute;
