import { createBrowserRouter } from "react-router-dom";
import AuthLoginPage from '../layout/authLogin';
import AuthPasswordPage from '../page/authPassword';
import OrdersAllPage from '../page/ordersAll';
import AdminPage from '../page/adminPage';
import AdminAllPage from '../page/adminAllPage';
import ErrorElement from '../layout/errorElement';


export const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <AuthLoginPage/>,
    errorElement: <ErrorElement/>,
    children: [
      // { path: '/auth/activate/:token', element: <AuthPasswordPage/> },
      // { path: '/orders', element: <OrdersAllPage/> },
      // { path: '/users', element: <AdminPage/> },
      // { path: '/users/all', element: <AdminAllPage/> },
    ]
  }
]);
