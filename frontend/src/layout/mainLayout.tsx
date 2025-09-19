import { Outlet } from 'react-router-dom';
import LogOutComponent from '../components/mainLayoutComponents/logOut.component';
import AdminPanelComponent from '../components/mainLayoutComponents/adminPanel.component';
import OrdersPanelComponent from '../components/mainLayoutComponents/ordersPanel.component';
import '../styles/styles.scss';
import { ThemeComponent } from '../components/mainLayoutComponents/theme.component';

const MainLayout = () => {

return(
  <div className={'divMainLayout'}>
    <header className={'divMainLayout__header'}>
      <div className={'divMainLayout__header__logo'}>
        <h2>NadiyPro</h2>
      </div>
      <nav className={'divMainLayout__header__nav'}>
        <OrdersPanelComponent />
        <AdminPanelComponent />
        <LogOutComponent />
        <ThemeComponent/>
      </nav>
    </header>

    <div className={'divMainLayout__outlet'}>
      <Outlet />
    </div>
    <footer className={'divMainLayout__footer'}>
      <p> NadiyPro &#169; 2025</p>
    </footer>
  </div>
)
};

export default MainLayout;