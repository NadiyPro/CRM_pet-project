import OrdersFiltersComponent from '../components/ordersComponents/orderFilters.component';
import OrdersTableComponent from '../components/ordersComponents/ordersTable.component';
import PaginationComponent from '../components/ordersComponents/pagination.component';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { orderAction } from '../redux/slices/orderSlice';
import '../styles/styles.scss';
import { useSearchParams } from 'react-router-dom';
import { ListOrdersAllDto } from '../module/orders_dto/listOrdersAll.dto';
import { SortFieldEnum } from '../module/enums/sortFieldEnum';
import { SortASCOrDESCEnum } from '../module/enums/sortASCOrDESCEnum';

const OrdersAllPage = () => {
  const {dto} = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query: ListOrdersAllDto = {
      page: 1,
      limit: 25,
      my: false,
      sortField: SortFieldEnum.CREATED_AT,
      sortASCOrDESC: SortASCOrDESCEnum.DESC,
      name: null,
      surname: null,
      email: null,
      phone: null,
      age: null,
      course: null,
      course_format: null,
      course_type: null,
      status: null,
      sum: null,
      alreadyPaid: null,
      manager: null,
      group_name: null,
      created_at_from: null,
      created_at_to: null,
    };

    const validKeys = Object.keys(query); // перевіряємо чи такий ключ існує

    searchParams.forEach((value, key) => {
      if (key === 'my') {
        query.my = value === 'true';
      } else if (['page', 'limit', 'alreadyPaid', 'age', 'sum'].includes(key)) {
        const num = Number(value);
        (query as any)[key] = !isNaN(num) ? num : null;
      } else if (validKeys.includes(key)) {
        (query as any)[key] = value || null;
      }
    });

    dispatch(orderAction.setDto(query));
  }, []);

  useEffect(() => {
    const query: Record<string, string> = {};
    for (const key in dto) {
      const value = dto[key as keyof ListOrdersAllDto];
      //  дістаємо значення кожного поля (dto.name, dto.page і т.д.).
      if (value !== null && value !== undefined && value !== '') {
        query[key] = String(value);
      }
    }
    setSearchParams(query);
    dispatch(orderAction.loadOrdersAll(dto));
  }, [dto]);
  

  return(
    <div className={'divMainLayout__outlet__ordersAllPage'}>
      <OrdersFiltersComponent/>
      <OrdersTableComponent/>
      <PaginationComponent />
    </div>
  )
};

export default OrdersAllPage;