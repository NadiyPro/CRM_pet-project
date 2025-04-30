import { useAppDispatch, useAppSelector } from '../../redux/store';

const OrdersStatisticAllComponent = () => {
  const { ordersStatisticAll }
 = useAppSelector((state) => state.adminStore);

  return (
    <div>
      <h3>Orders statistic</h3>
      <p> total: {ordersStatisticAll.total} In work: {ordersStatisticAll.In_work}
        New: {ordersStatisticAll.New} Aggre: {ordersStatisticAll.Aggre} Disaggre: {ordersStatisticAll.Disaggre} Dubbing: {ordersStatisticAll.Dubbing}</p>
    </div>
  )
}

export default OrdersStatisticAllComponent;