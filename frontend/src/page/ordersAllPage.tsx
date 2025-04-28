import OrdersFiltersComponent from '../components/ordersLayoutComponent/orderFilters.component';
import OrdersTableComponent from '../components/ordersLayoutComponent/ordersTableComponent';
import PaginationComponent from '../components/paginationComponent';

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