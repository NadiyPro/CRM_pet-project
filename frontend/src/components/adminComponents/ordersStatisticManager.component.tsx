import { useAppDispatch, useAppSelector } from '../../redux/store';
import { adminAction } from '../../redux/slices/adminSlice';
import { useEffect } from 'react';

const OrdersStatisticManager = () => {
  const { dto, data, ordersStatisticManager } = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminAction.setPage(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAction.loadUsersAll(dto));
  }, [dto, dispatch]);

  useEffect(() => {
    dispatch(adminAction.loadOrdersStatisticManager());
  }, [dispatch]);

  const handleActive = (managerId: string) => {
    dispatch(adminAction.loadActivateUser(managerId));

  };

  const handleBan = (managerId: string) => {
    dispatch(adminAction.loadBanUser(managerId));
  };

  const handleUnban = (managerId: string) => {
    dispatch(adminAction.loadUnbanUser(managerId));
  };

  return (
    <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager'}>
      {data.users.map((value) => {
        const userStatistic = ordersStatisticManager.find(item => item.manager === value.id);

        return (
          <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards'} key={value.id}>
            <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__data'}>
              <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>id:</b> {value.id}</p>
              <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>email:</b> {value.email}</p>
              <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>name:</b> {value.name}</p>
              <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>surname:</b> {value.surname}</p>
              <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>is_active:</b> {value.is_active ? 'active' : 'inactive'}</p>
            </div>


              <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__statistic'}>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Total:</b> {userStatistic?.total ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>In Work:</b> {userStatistic?.In_work ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>New:</b> {userStatistic?.New ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Agreed:</b> {userStatistic?.Aggre ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Disagreed:</b> {userStatistic?.Disaggre ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Dubbing:</b> {userStatistic?.Dubbing ?? 0}</p>
              </div>

          <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount'} style={{ marginTop: '10px' }}>
            <button className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__activate'} onClick={() => handleActive(value.id)}>
              {value.is_active ? 'RECOVERY PASSWORD' : 'ACTIVATE'}
            </button>
            <button className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__banUnban'} onClick={() => handleBan(value.id)}>BAN</button>
            <button className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__banUnban'} onClick={() => handleUnban(value.id)}>UNBAN</button>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default OrdersStatisticManager;