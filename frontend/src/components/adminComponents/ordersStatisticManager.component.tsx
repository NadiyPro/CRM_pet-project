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
    <div>
      {data.users.map((value) => {
        const userStatistic = ordersStatisticManager.find(item => item.manager === value.id);
        // const userStatistic = Array.isArray(ordersStatisticManager)
        //   ? ordersStatisticManager.find(item => item.manager === value.id)
        //   : null;
        // console.log('ordersStatisticManager:', ordersStatisticManager);

        return (
          <div key={value.id}>
            <div>
              <p>{value.id}</p>
              <p>{value.email}</p>
              <p>{value.name}</p>
              <p>{value.surname}</p>
              <p>{value.is_active ? 'active' : 'inactive'}</p>
            </div>

            {userStatistic && (
              <div>
                <p>Total: {userStatistic.total}</p>
                <p>In Work: {userStatistic.In_work}</p>
                <p>New: {userStatistic.New}</p>
                <p>Agreed: {userStatistic.Aggre}</p>
                <p>Disagreed: {userStatistic.Disaggre}</p>
                <p>Dubbing: {userStatistic.Dubbing}</p>
              </div>
            )}

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleActive(value.id)}>
              {value.is_active ? 'RECOVERY PASSWORD' : 'ACTIVATE'}
            </button>
            <button onClick={() => handleBan(value.id)}>BAN</button>
            <button onClick={() => handleUnban(value.id)}>UNBAN</button>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default OrdersStatisticManager;
// import { useAppDispatch, useAppSelector } from '../../redux/store';
// import { adminAction } from '../../redux/slices/adminSlice';
// import { useEffect } from 'react';
//
// const OrdersStatisticManager = () => {
//   const { dto, data, ordersStatisticManager } = useAppSelector((state) => state.adminStore);
//   const dispatch = useAppDispatch();
//
//   // useEffect(() => {
//   //   dispatch(adminAction.setPage(1));
//   //   dispatch(adminAction.loadUsersAll(dto));
//   // }, [dispatch, dto]);
//   useEffect(() => {
//     dispatch(adminAction.setPage(1));
//   }, [dispatch]);
//
//   useEffect(() => {
//     dispatch(adminAction.loadUsersAll(dto));
//   }, [dto, dispatch]);
//
//   useEffect(() => {
//     data.users.forEach(value => {
//       dispatch(adminAction.loadOrdersStatisticManager(value.id));
//     });
//   }, [data.users, dispatch]);
//
//   const handleActive = (managerId: string) => {
//       dispatch(adminAction.loadActivateUser(managerId));
//   };
//
//   const handleBan = (managerId: string) => {
//     dispatch(adminAction.loadBanUser(managerId));
//   };
//
//   const handleUnban = (managerId: string) => {
//     dispatch(adminAction.loadUnbanUser(managerId));
//   };
//
//   return (
//     <div>
//       {data.users.map((value) => (
//         <div key={value.id}>
//           <div>
//             <p>{value.id}</p>
//             <p>{value.email}</p>
//             <p>{value.name}</p>
//             <p>{value.surname}</p>
//             <p>{value.is_active}</p>
//           </div>
//
//           {ordersStatisticManager[value.id] && (
//             <div>
//               <p>Total: {ordersStatisticManager[value.id].total}</p>
//               <p>In Work: {ordersStatisticManager[value.id].In_work}</p>
//               <p>New: {ordersStatisticManager[value.id].New}</p>
//               <p>Agreed: {ordersStatisticManager[value.id].Aggre}</p>
//               <p>Disagreed: {ordersStatisticManager[value.id].Disaggre}</p>
//               <p>Dubbing: {ordersStatisticManager[value.id].Dubbing}</p>
//             </div>
//           )}
//
//           <div style={{ marginTop: '10px' }}>
//             <button onClick={() => handleActive(value.id)}>
//               {value.is_active ? 'RECOVERY PASSWORD' : 'ACTIVATE'}
//             </button>
//             <button onClick={() => handleBan(value.id)}>BAN</button>
//             <button onClick={() => handleUnban(value.id)}>UNBAN</button>
//           </div>
//         </div>
//               ))}
//     </div>
//   );
// };
//
// export default OrdersStatisticManager;