import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import ErrorElement from '../layout/errorElement';
import MainLayout from '../layout/mainLayout';
import OrdersAllPage from '../page/ordersAllPage';
import AdminPage from '../page/adminPage';
import AuthPasswordPage from '../page/authPasswordPage';
import AuthRouterComponent from '../components/authComponents/authRouter.component';
import AuthLoginPage from '../page/authLoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },

      {
        path: 'auth',
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: 'login', element: <AuthLoginPage /> },
          { path: 'activate/:token', element: <AuthPasswordPage /> },
        ],
      },

      {
        element: <AuthRouterComponent />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <Navigate to="/orders" replace /> },
              { path: 'orders', element: <OrdersAllPage /> },
              { path: 'admin', element: <AdminPage /> },
            ],
          },
        ],
      },
    ],
  },
]);