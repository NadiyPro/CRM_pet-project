import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import ErrorElement from '../layout/errorElement';
import AuthLoginPage from '../page/authLoginPage';
import MainLayout from '../layout/mainLayout';
import OrdersAllPage from '../page/ordersAllPage';
import AdminPage from '../page/adminPage';
import AuthPasswordPage from '../page/authPasswordPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      // Редірект із кореня на /auth/login
      { index: true, element: <Navigate to="/auth/login" replace /> },

      // AUTH
      {
        path: 'auth',
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: 'login', element: <AuthLoginPage /> },
          { path: 'activate/:token', element: <AuthPasswordPage /> },
        ],
      },

      // MAIN (показується в макеті)
      {
        path: '',
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/orders" replace /> },
          { path: 'orders', element: <OrdersAllPage /> },
          { path: 'admin', element: <AdminPage /> },
        ],
      },
    ],
  },
]);
