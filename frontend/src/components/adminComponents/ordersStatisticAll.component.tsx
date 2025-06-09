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
    <div className={'divMainLayout__adminPage__ordersStatisticAllComponent'}>
      <h3>Orders statistic</h3>
      <p><b>total:</b> {ordersStatisticAll.total} <b>In work:</b> {ordersStatisticAll.In_work}
        <b>New:</b> {ordersStatisticAll.New} <b>Aggre:</b> {ordersStatisticAll.Aggre}
        <b>Disaggre:</b> {ordersStatisticAll.Disaggre} <b>Dubbing:</b> {ordersStatisticAll.Dubbing}
      </p>
    </div>
  )
}

export default OrdersStatisticAllComponent;