import PaginationComponent from '../components/paginationComponent';
import OrdersStatisticAllComponent from '../components/adminComponents/ordersStatisticAll.component';

const AdminPage = () => {
  return(
    <div>
      <OrdersStatisticAllComponent/>

      <PaginationComponent/>
    </div>
  )
};

export default AdminPage;