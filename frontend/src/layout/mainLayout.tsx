import { Outlet } from 'react-router-dom';
import LogOutComponent from '../components/mainLayoutComponents/logOut.component';
import AdminPanelComponent from '../components/mainLayoutComponents/adminPanel.component';
import OrdersPanelComponent from '../components/mainLayoutComponents/ordersPanel.component';
import '../styles/styles.scss';

const MainLayout = () => {

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

export default MainLayout;