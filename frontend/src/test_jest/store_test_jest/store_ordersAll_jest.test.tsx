import { orderAction } from '../../redux/slices/orderSlice';
import { orderService } from '../../service/orders.service';

jest.mock('../../service/auth.service', () => ({
  axiosInstance: {
    get: jest.fn()
  },
}));

jest.mock('../../service/orders.service', () => ({
  orderService: {
    ordersAll: jest.fn()
  },
}));

describe('loadOrdersAll thunk', () => {
  test('dispatches fulfilled action with data', async () => {
    (orderService.ordersAll as jest.Mock).mockResolvedValueOnce({
      orders: [],
      total: 0,
    });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ orderStore: { dto: {} } }));

    const thunk = orderAction.loadOrdersAll({});
    const result = await thunk(dispatch, getState, undefined);

    console.log(result.payload)

    // expect(orderService.ordersAll).toHaveBeenCalledWith({});
    // expect(orderService.ordersAll).toEqual({ orders: [], total: 0 });
    expect(result.payload).toEqual({ orders: [], total: 0 });
  });
});

export {};