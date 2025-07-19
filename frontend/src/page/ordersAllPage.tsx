import OrdersFiltersComponent from '../components/ordersComponents/orderFilters.component';
import OrdersTableComponent from '../components/ordersComponents/ordersTable.component';
import PaginationComponent from '../components/ordersComponents/pagination.component';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect, useRef } from 'react';
import { orderAction } from '../redux/slices/orderSlice';
import '../styles/styles.scss';
import { useSearchParams } from 'react-router-dom';
import { ListOrdersAllDto } from '../module/orders_dto/listOrdersAll.dto';

const OrdersAllPage = () => {
  const {dto} = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initializedRef = useRef(false);

  useEffect(() => {
    const query: ListOrdersAllDto = { ...dto };

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
    initializedRef.current = true;
    dispatch(orderAction.setDtoURL(query));
  }, [searchParams]);

  useEffect(() => {
    if (!initializedRef.current) return;
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