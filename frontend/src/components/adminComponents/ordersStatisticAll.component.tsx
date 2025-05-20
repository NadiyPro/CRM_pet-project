import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { adminAction } from '../../redux/slices/adminSlice';

const OrdersStatisticAllComponent = () => {
  const { ordersStatisticAll }
 = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminAction.loadOrdersStatisticAll());
  }, [dispatch]);

  return (
    <div>
      <h3>Orders statistic</h3>
      <p> total: {ordersStatisticAll.total} In work: {ordersStatisticAll.In_work}
        New: {ordersStatisticAll.New} Aggre: {ordersStatisticAll.Aggre} Disaggre: {ordersStatisticAll.Disaggre} Dubbing: {ordersStatisticAll.Dubbing}</p>
    </div>
  )
}

export default OrdersStatisticAllComponent;