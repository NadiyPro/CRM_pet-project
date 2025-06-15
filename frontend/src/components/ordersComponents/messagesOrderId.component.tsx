import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import createMessageValidator from '../../validator/createMessage.validator';
import { CreateMessageDto } from '../../module/createMessage.dto';
import EditOrderComponent from './editOrderComponent';
import { useCallback, useEffect, useRef } from 'react';
import '../../styles/styles.scss';

const MessagesOrderIdComponent = () => {
  const {handleSubmit, register, reset, formState: {isValid}} =
    useForm<CreateMessageDto>({mode: 'all', resolver: joiResolver(createMessageValidator)})
  const { messagesOrderId, findOneOrder, isEditOrder, openedMessageOrderId } =
    useAppSelector((state) => state.orderStore);
  const messageClose = useRef<HTMLTableRowElement | null>(null);
  const dispatch = useAppDispatch();

    const handleCreateMessage = (dataMessage: CreateMessageDto ) => {
    if(findOneOrder.id !== null){
      const orderId = findOneOrder.id;
      dispatch(orderAction.loadCreateMessage({orderId, dataMessage }))
        .unwrap()
        .then(() => {
          dispatch(orderAction.loadMessagesOrderId(orderId));
      reset();
    });
    }
    };


  const handleCloseMessagesOrderId = useCallback((event: MouseEvent) => {
    if (messageClose.current && !messageClose.current.contains(event.target as Node)) {
      dispatch(orderAction.setCloseMessagesOrderId());
    }
  }, [dispatch]);

  useEffect(() => {
    if (openedMessageOrderId !== null) {
      document.addEventListener('mousedown', handleCloseMessagesOrderId);
      // додавання обробника подій, слідкуємо за кліком мишки
    } else {
      document.removeEventListener('mousedown', handleCloseMessagesOrderId);
      // прибираємо обробника
    }
    return () => {
      document.removeEventListener('mousedown', handleCloseMessagesOrderId);
      // видаляємо обробника навіть коли в нас баг і наприклад, айді 5 змінилось на 5
    };
  }, [handleCloseMessagesOrderId, openedMessageOrderId]);

    const handleEditOrder = () => {
      dispatch(orderAction.setOpenEditOrderModal(true))
    }

  return(
    <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent'} ref={messageClose}>
      <div>
        <p><b>id:</b> {findOneOrder.id}</p>
        <p><b>UTM:</b> {findOneOrder.utm}</p>
        <p><b>Msg:</b> {findOneOrder.msg}</p>
      </div>

      <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages'} >

        <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data'}>
          {messagesOrderId.map(value =>
            <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__divMap'} key={value.id}>
              <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__divMap__text'}><p><b>comment:</b> {value.messages}</p></div>
              <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate'}>
                <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'}>{value.manager}</p>
                <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'}>{value.created_at? dayjs.utc(value.created_at).local().format('MMMM D, YYYY HH:mm:ss') : ''}</p>
              </div>
            </div>)}
        </div>

        <form className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__form'} onSubmit={handleSubmit(handleCreateMessage)}>
          <label htmlFor={'messages'}><b>Create message:</b></label>
          <input type={'text'} {...register('messages')} placeholder={'Comment'}/>
          <button className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'} type={'submit'} disabled={!isValid}>SUBMIT</button>
        </form>

        <button className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'} onClick={handleEditOrder}>EDIT</button>

      </div>

      {isEditOrder &&
        <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit'}>
          <EditOrderComponent/>
        </div>
      }
    </div>
  )
}

export default MessagesOrderIdComponent;