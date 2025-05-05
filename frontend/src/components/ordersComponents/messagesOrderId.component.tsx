import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import createMessageValidator from '../../validator/createMessage.validator';
import { CreateMessageDto } from '../../module/createMessage.dto';

const MessagesOrderIdComponent = () => {
  const {handleSubmit, register, reset, formState: {isValid}} = useForm<CreateMessageDto>({mode: 'all', resolver: joiResolver(createMessageValidator)})
  const { messagesOrderId, findOneOrder } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleCloseMessagesOrderId = () => {
      dispatch(orderAction.setCloseMessagesOrderId());
    }

    const handleCreateMessage = (dataMessage: CreateMessageDto ) => {
    if(findOneOrder.id !== null){
      let orderId = findOneOrder.id;
      dispatch(orderAction.loadCreateMessage({orderId, dataMessage }))
      reset();
    }
    }

  return(
    <div>
      <div>
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
          <input type={'text'} {...register('messages')}/>
          <button type={'submit'} disabled={!isValid}>SUBMIT</button>
        </form>
        <button onClick={handleCloseMessagesOrderId}>EXIT</button>
      </div>
    </div>
  )
}

export default MessagesOrderIdComponent;