import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import createMessageValidator from '../../validator/createMessage.validator';
import { CreateMessageDto } from '../../module/createMessage.dto';
import EditOrderComponent from './editOrderComponent';

const MessagesOrderIdComponent = () => {
  const {handleSubmit, register, reset, formState: {isValid}} = useForm<CreateMessageDto>({mode: 'all', resolver: joiResolver(createMessageValidator)})
  const { messagesOrderId, findOneOrder, isEditOrder } = useAppSelector((state) => state.orderStore);
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

    // useEffect(() => {
    //   const orderId = findOneOrder.id;
    //   dispatch(orderAction.loadMessagesOrderId(orderId));
    // }, [dispatch, orderId])

    const handleEditOrder = () => {
      dispatch(orderAction.setOpenEditOrderModal())
    }

  return(
    <div>
      <div>
        <p>id: {findOneOrder.id}</p>
        <p>UTM: {findOneOrder.utm}</p>
        <p>Msg: {findOneOrder.msg}</p>
      </div>
      <div>
        {messagesOrderId.map(value => <div>
          <div>{value.messages}</div>
          <div>{value.manager} {value.created_at}</div>
        </div>)}
        <form onSubmit={handleSubmit(handleCreateMessage)}>
        <label htmlFor={'messages'}>Create message:</label>
          <input type={'text'} {...register('messages')} placeholder={'Comment'}/>
          <button type={'submit'} disabled={!isValid}>SUBMIT</button>
        </form>
        <button onClick={handleEditOrder}>EDIT</button>
      </div>
      {isEditOrder &&
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999}}>
          <EditOrderComponent/>
        </div>
      }
    </div>
  )
}

export default MessagesOrderIdComponent;