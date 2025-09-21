import { useAppDispatch, useAppSelector } from '../../redux/store';
import { adminAction } from '../../redux/slices/adminSlice';
import { useEffect } from 'react';
import { RoleTypeEnum } from '../../module/enums/roleTypeEnum';

const OrdersStatisticManager = () => {
  const { dto, data, ordersStatisticManager, isActivateUser, isBanUser, isUnbanUser } = useAppSelector((state) => state.adminStore);
  const { ordersStatisticAll } = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();

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
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Agreed:</b> {userStatistic?.Aggre ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Disagreed:</b> {userStatistic?.Disaggre ?? 0}</p>
                <p className={'divMainLayout__outlet__adminPage__ordersStatisticManager__cards__p'}><b>Dubbing:</b> {userStatistic?.Dubbing ?? 0}</p>
              </div>

            <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount'}
                 style={{ marginTop: '10px' }}>
              <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divActivate'}>
                <button
                  className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divActivate__activate'}
                  onClick={() => handleActive(value.id)} disabled={(ordersStatisticAll.roleAuth !== RoleTypeEnum.ADMIN) || (ordersStatisticAll.userIdAuth === value.id)}>
                  {value.is_active ? 'RECOVERY PASSWORD' : 'ACTIVATE'}
                </button>
                {isActivateUser && isActivateUser.id === value.id &&
                  <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divActivate__isActivateUser'}>
                  <p style={{ margin: '5px 0', color: '#2a817b'}}>{isActivateUser.text}</p>
                </div>}
              </div>

              <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divBanUnban'}>
                <button
                  className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divBanUnban__banUnban'}
                  onClick={() => handleBan(value.id)} disabled={(ordersStatisticAll.roleAuth !== RoleTypeEnum.ADMIN) || (ordersStatisticAll.userIdAuth === value.id)}>BAN
                </button>
                {isBanUser && isBanUser.id === value.id &&
                  <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divBanUnban__isBanUnban'}>
                    <p style={{
                      margin: '5px 0',
                      color: '#1f615c',
                    }}>{isBanUser.text}</p>
                  </div>}
              </div>

              <div
                className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divBanUnban'}>
                <button
                  className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divBanUnban__banUnban'}
                  onClick={() => handleUnban(value.id)} disabled={(ordersStatisticAll.roleAuth !== RoleTypeEnum.ADMIN) || (ordersStatisticAll.userIdAuth === value.id)} >UNBAN
                </button>
                { isUnbanUser && isUnbanUser.id === value.id &&
                  <div className={'divMainLayout__outlet__adminPage__ordersStatisticManager__buttonAccessAccount__divBanUnban__isBanUnban'}>
                    <p style={{
                      margin: '5px 0',
                      color: '#1f615c',
                    }}>{isUnbanUser.text}</p>
                  </div>
                }
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default OrdersStatisticManager;