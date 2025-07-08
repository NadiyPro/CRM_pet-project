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

const numericKeys = ['age', 'sum', 'alreadyPaid'];
const booleanKeys = ['my'];

const OrdersAllPage = () => {

  const dispatch = useAppDispatch();
  const {dto} = useAppSelector((state) => state.orderStore);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params: ListOrdersAllDto = {
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

    const validKeys = Object.keys(params);

    searchParams.forEach((value, key) => {
      if (key === 'my') {
        params.my = value === 'true';
      } else if (['page', 'limit', 'alreadyPaid', 'age', 'sum'].includes(key)) {
        const num = Number(value);
        (params as any)[key] = !isNaN(num) ? num : null;
      } else if (validKeys.includes(key)) {
        (params as any)[key] = value || null;
      }
    });

    dispatch(orderAction.setDto(params));
    dispatch(orderAction.loadOrdersAll(params));
  }, []);

  useEffect(() => {
    const query: Record<string, string> = {};
    for (const key in dto) {
      const value = dto[key as keyof ListOrdersAllDto];
      if (value !== null && value !== undefined && value !== '') {
        query[key] = String(value);
      }
    }
    setSearchParams(query);
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