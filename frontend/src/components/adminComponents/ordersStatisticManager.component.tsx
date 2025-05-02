import { useAppDispatch, useAppSelector } from '../../redux/store';
import { adminAction } from '../../redux/slices/adminSlice';
import { useEffect } from 'react';

const OrdersStatisticManager = () => {
  const { dto, data, ordersStatisticManager } = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminAction.setPage(1));
    dispatch(adminAction.loadUsersAll(dto));
  }, [dispatch, dto]);

  useEffect(() => {
    data.users.forEach(user => {
      dispatch(adminAction.loadOrdersStatisticManager(user.id));
    });
  }, [data.users, dispatch]);


  const handleActive = (managerId: string) => {
      dispatch(adminAction.loadActivateUser(managerId));
  }

  const handleBan = (managerId: string) => {
    dispatch(adminAction.loadBanUser(managerId));
  }

  const handleUnban = (managerId: string) => {
    dispatch(adminAction.loadActivateUser(managerId));
  }

  return (
    <div>
      {
        data.users.map((value) =>
          <div>
            <div>
              <p>{value.id}</p>
              <p>{value.email}</p>
              <p>{value.name}</p>
              <p>{value.surname}</p>
              <p>{value.is_active}</p>
            </div>

            {
              value.id === ordersStatisticManager.manager && (
                <div>
                  <p>{ordersStatisticManager.total}</p>
                  <p>{ordersStatisticManager.In_work}</p>
                  <p>{ordersStatisticManager.New}</p>
                  <p>{ordersStatisticManager.Aggre}</p>
                  <p>{ordersStatisticManager.Disaggre}</p>
                  <p>{ordersStatisticManager.Dubbing}</p>
                </div>
              )
            }
            <button onClick={() => handleActive(value.id)}>ACTIVATE</button>
            <button onClick={() => handleBan(value.id)}>BAN</button>
            <button onClick={() => handleUnban(value.id)}>UNBAN</button>
          </div>
        )
      }
    </div>
  )
};

export default OrdersStatisticManager;