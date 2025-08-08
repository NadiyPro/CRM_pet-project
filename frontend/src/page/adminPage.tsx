import OrdersStatisticAllComponent from '../components/adminComponents/ordersStatisticAll.component';
import OrdersStatisticManager from '../components/adminComponents/ordersStatisticManager.component';
import PaginationAdminComponent from '../components/adminComponents/paginationAdmin.component';
import GiveRoleComponent from '../components/adminComponents/giveRoleComponent';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { ListUsersQueryDto } from '../module/admin_dto/listUsersQuery.dto';
import { adminAction } from '../redux/slices/adminSlice';

const AdminPage = () => {
  const {dto} = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query: ListUsersQueryDto = {...dto};

    const validKeys = Object.keys(query);
    // перевіряємо чи є ключ в переліку дозволених характеристик

    searchParams.forEach((value, key) => {
      if (['page', 'limit'].includes(key)) {
        const num = Number(value);
        (query as any)[key] = !isNaN(num) ? num : null;
      } else if (validKeys.includes(key)) {
        (query as any)[key] = value || null;
      }
    });

    dispatch(adminAction.setDto(query));
    dispatch(adminAction.loadUsersAll(query));
  }, [searchParams]);

  useEffect(() => {
    const urlQuery: Record<string, string> = {};
    for (const key in dto) {
      const value = dto[key as keyof ListUsersQueryDto];
      if (value !== null && value !== undefined) {
        urlQuery[key] = String(value);
      }
    }
    setSearchParams(urlQuery);
  }, [dto]);

  return(
    <div className={'divMainLayout__outlet__adminPage'}>
      <OrdersStatisticAllComponent/>
      <GiveRoleComponent/>
      <OrdersStatisticManager />
      <PaginationAdminComponent/>
    </div>
  )
};

export default AdminPage;