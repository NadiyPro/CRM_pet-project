import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLoginPage from '../page/authLoginPage';
import AuthPasswordPage from '../page/authPasswordPage';
import OrdersAllPage from '../page/ordersAllPage';
import AdminPage from '../page/adminPage';
import AdminAllPage from '../page/adminAllPage';
import ErrorElement from '../layout/errorElement';
import OrdersLayout from '../layout/ordersLayout';


export const router = createBrowserRouter([
  {
    path: '/auth',
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="/login" replace />},
      { path: 'login', element: <AuthLoginPage /> },
      // { path: 'activate/:token', element: <AuthPasswordPage /> },
    ],
  },
  {
    path: '/',
    element: <OrdersLayout />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="/orders" replace /> },
      { path: 'orders', element: <OrdersAllPage/> },
      // { path: '/users', element: <AdminPage/> },
      // { path: '/users/all', element: <AdminAllPage/> },
    ],
  },
]);
