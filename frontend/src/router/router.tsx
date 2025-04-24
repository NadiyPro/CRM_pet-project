import { createBrowserRouter } from "react-router-dom";
import AuthLoginPage from '../page/authLoginPage';
import AuthPasswordPage from '../page/authPasswordPage';
import OrdersAllPage from '../page/ordersAllPage';
import AdminPage from '../page/adminPage';
import AdminAllPage from '../page/adminAllPage';
import ErrorElement from '../layout/errorElement';
import OrdersLayout from '../layout/ordersLayout';


export const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <AuthLoginPage/>,
    errorElement: <ErrorElement/>,
    children: [
      { path: '/', element: <OrdersLayout/>, children: [
          { index: true, element: <OrdersAllPage/> },
          // { path: '/auth/activate/:token', element: <AuthPasswordPage/> },
          // { path: '/users', element: <AdminPage/> },
          // { path: '/users/all', element: <AdminAllPage/> },
        ]},
    ]
  }
]);
