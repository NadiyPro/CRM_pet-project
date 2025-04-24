import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import LogOutComponent from '../components/ordersLayoutComponent/logOut.component';
import AdminPanelComponent from '../components/ordersLayoutComponent/adminPanel.component';
import OrdersPanelComponent from '../components/ordersLayoutComponent/ordersPanel.component';

const OrdersLayout = () => {

return(
  <div>
    <div>
      <div>
        <p>NadiyPro</p>
      </div>
      <div>
        <OrdersPanelComponent />
        <AdminPanelComponent />
        <LogOutComponent />
      </div>
    </div>

    <div>
      <Outlet />
    </div>
  </div>
)
};

export default OrdersLayout;