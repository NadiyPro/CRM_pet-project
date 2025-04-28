import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { orderAction } from '../../redux/slices/orderSlice';
import { SortASCOrDESCEnum } from '../../module/enums/sortASCOrDESCEnum';
import { BaseOrdersDto } from '../../module/baseOrders.dto';

const OrdersTableComponent = () => {
  const {data: { orders }, dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleSubmit = (field: SortFieldEnum) => {
    // Якщо клікаємо на те саме поле, міняємо напрямок сортування
    if (dto.sortField === field) {
      dispatch(orderAction.setSortASCOrDESC(
        dto.sortASCOrDESC === SortASCOrDESCEnum.ASC
          ? SortASCOrDESCEnum.DESC
          : SortASCOrDESCEnum.ASC
      ));
    } else {
      // Якщо клікаємо на нове поле, сортуємо по ньому за замовчуванням DESC
      dispatch(orderAction.setSortField(field));
      dispatch(orderAction.setSortASCOrDESC(SortASCOrDESCEnum.DESC));
    }
  };

  return (
    <div>
      <table>
        <thead>
        <tr>
          {Object.values(SortFieldEnum)
            .filter((field) => field !== SortFieldEnum.GROUP_ID)
            .map((field) => (
              <th color={'white'} key={field} onClick={() => handleSubmit(field)}>
                {field}
                {dto.sortField === field && (
                  dto.sortASCOrDESC === SortASCOrDESCEnum.ASC ? ' &#9660' : ' &#9650'
                  // ' 🔽' : ' 🔼'
                )}
              </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {orders.map((value: BaseOrdersDto) => (
          <tr key={value.id}>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.surname}</td>
            <td>{value.email}</td>
            <td>{value.phone}</td>
            <td>{value.age}</td>
            <td>{value.course}</td>
            <td>{value.course_format}</td>
            <td>{value.course_type}</td>
            <td>{value.status}</td>
            <td>{value.sum}</td>
            <td>{value.alreadyPaid}</td>
            <td>{value.created_at}</td>
            <td>{value.group_name}</td>
            <td>{value.manager}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
};

export default OrdersTableComponent;