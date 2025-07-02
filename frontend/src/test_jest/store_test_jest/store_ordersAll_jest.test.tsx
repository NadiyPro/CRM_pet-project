import { orderAction } from '../../redux/slices/orderSlice';
import { orderService } from '../../service/orders.service';

jest.mock('../../service/orders.service', () => ({
  orderService: {
    ordersAll: jest.fn()
  },
}));
// створює мок (імітацію) orderService.ordersAll
// jest.fn() — це типу фейкова функція, функція-заглушка, типу ми робимо запит

describe('loadOrdersAll thunk', () => {
  test('ordersAll fulfilled data', async () => {

    const dispatch = jest.fn(); // типу викликаємо dispatch
    const getState = jest.fn(() => ({ orderStore: { dto: {} } }));
    // викликаємо наш стор, state => state.orderStore зі значеннями dto: {} по замовченню

    const thunk = orderAction.loadOrdersAll({});
    // ми передаємо в loadOrdersAll пустий обєкт thunk.fulfilled,
    // тобто в сервіс піде дефолтний обєкт dto зі стору

    (orderService.ordersAll as jest.Mock).mockResolvedValueOnce({
      orders: [],
      total: 0,
    });
    // тут ми вже описуємо, що нам віддасть orderService.ordersAll
    // mockResolvedValueOnce - кажемо, що наш сервіс поверне { orders: [], total: 0,}

    const result = await thunk(dispatch, getState, undefined);
    // тут те що нам повертає типу loadOrdersAll, а саме action з даними в полі payload
    // поверне дефолтне значеня зі стору

    console.log(result.payload)

    expect(orderService.ordersAll).toHaveBeenCalledWith({});
    // тут ми перевіряємо чи була викликана мокова функція з пустим аргументом
    // тобто, що ми передавали пустий аргумент (дефолтий) з loadOrdersAll в orderService.ordersAll
    expect(result.payload).toEqual({ orders: [], total: 0 });
    // перевіряємо глобально через toEqual,
    // що ми отримали обєкт з очікуваними характеристиками та значеннями
  });
});

export {};