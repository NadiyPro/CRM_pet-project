import OrdersStatisticAllComponent from '../components/adminComponents/ordersStatisticAll.component';
import OrdersStatisticManager from '../components/adminComponents/ordersStatisticManager.component';
import PaginationAdminComponent from '../components/adminComponents/paginationAdmin.component';

const AdminPage = () => {
  return(
    <div>
      <OrdersStatisticAllComponent/>
      <OrdersStatisticManager />
      <PaginationAdminComponent/>
    </div>
  )
};

export default AdminPage;