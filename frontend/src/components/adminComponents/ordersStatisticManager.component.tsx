import { useAppDispatch, useAppSelector } from '../../redux/store';

const OrdersStatisticManager = () => {
  const { data } = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();

  return(
    <div>

    </div>
  )
};

export default OrdersStatisticManager;