import { Outlet } from 'react-router-dom';
import LogOutComponent from '../components/ordersLayoutComponent/logOut.component';
import AdminPanelComponent from '../components/ordersLayoutComponent/adminPanel.component';
import OrdersPanelComponent from '../components/ordersLayoutComponent/ordersPanel.component';

const OrdersLayout = () => {

return(
  <div>
    <header>
      <div>
        <h2>NadiyPro</h2>
      </div>
      <nav>
        <OrdersPanelComponent />
        <AdminPanelComponent />
        <LogOutComponent />
      </nav>
    </header>

    <div>
      <Outlet />
    </div>
  </div>
)
};

export default OrdersLayout;