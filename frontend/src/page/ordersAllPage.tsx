import OrdersFiltersComponent from '../components/ordersLayoutComponent/orderFilters.component';
import OrdersTableComponent from '../components/ordersLayoutComponent/ordersTableComponent';

const OrdersAllPage = () => {

  return(
    <div>
      <OrdersFiltersComponent/>
      <OrdersTableComponent/>
    </div>
  )
};

export default OrdersAllPage;