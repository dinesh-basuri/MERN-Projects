import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (userRole !== role) {
    // Redirect to unauthorized if role doesn't match
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;
