import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { orderAction } from '../../redux/slices/orderSlice';
import { SortASCOrDESCEnum } from '../../module/enums/sortASCOrDESCEnum';
import { BaseOrdersDto } from '../../module/baseOrders.dto';
import MessagesOrderIdComponent from './messagesOrderId.component';

const OrdersTableComponent = () => {
  const {data: { orders }, dto, openedMessageOrderId } = useAppSelector((state) => state.orderStore);
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

  const handleMessagesOrderId = (orderId: number) => {
    dispatch(orderAction.setOpenMessagesOrderId(orderId));
    dispatch(orderAction.loadMessagesOrderId(orderId));
    dispatch(orderAction.loadFindOneOrder(orderId))
  }

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
                  dto.sortASCOrDESC === SortASCOrDESCEnum.ASC ?
                    <span style={{ color: 'white' }}>&#9660;</span> : <span style={{ color: 'white' }}>&#9650;</span>
                )}
              </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {orders.map((value: BaseOrdersDto) => (
          <React.Fragment key={value.id}>
          <tr key={value.id} onClick={() => value.id !== null && handleMessagesOrderId(value.id)}>
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
            <td>{value.created_at ? dayjs.utc(value.created_at).format('MMMM D, YYYY') : ''}</td>
            <td>{value.group_name}</td>
            <td>{value.manager}</td>
          </tr>
            {
              openedMessageOrderId === value.id && (
                <tr>
                  <td colSpan={15}>
                    <MessagesOrderIdComponent />
                  </td>
                </tr>
              )
            }
      </React.Fragment>
        ))}
        </tbody>
      </table>
    </div>
  )
};

export default OrdersTableComponent;