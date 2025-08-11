import { Navigate } from 'react-router-dom';
import React from 'react';

export const AuthRedirect = () => {
  const tokenPair = localStorage.getItem('tokenPair');
  const isValid = !!tokenPair && JSON.parse(tokenPair).tokens.accessToken;

  return isValid ? <Navigate to="/orders" replace /> : <Navigate to="/auth/login" replace />;
};