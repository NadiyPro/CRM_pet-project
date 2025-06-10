import OrdersFiltersComponent from '../components/ordersComponents/orderFilters.component';
import OrdersTableComponent from '../components/ordersComponents/ordersTable.component';
import PaginationComponent from '../components/ordersComponents/pagination.component';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { orderAction } from '../redux/slices/orderSlice';
import '../styles/styles.scss';

const OrdersAllPage = () => {

  const dispatch = useAppDispatch();
  const {dto} = useAppSelector((state) => state.orderStore);

  useEffect(() => {
    // Завантажуємо замовлення при першому рендері сторінки
    dispatch(orderAction.loadOrdersAll(dto));
  }, [dispatch, dto]);

  return(
    <div className={'divMainLayout__outlet__ordersAllPage'}>
      <OrdersFiltersComponent/>
      <OrdersTableComponent/>
      <PaginationComponent />
    </div>
  )
};

export default OrdersAllPage;