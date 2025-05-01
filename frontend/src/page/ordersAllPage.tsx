import OrdersFiltersComponent from '../components/ordersComponents/orderFilters.component';
import OrdersTableComponent from '../components/ordersComponents/ordersTable.component';
import PaginationComponent from '../components/ordersComponents/pagination.component';

const OrdersAllPage = () => {

  return(
    <div>
      <OrdersFiltersComponent/>
      <OrdersTableComponent/>
      <PaginationComponent />
    </div>
  )
};

export default OrdersAllPage;