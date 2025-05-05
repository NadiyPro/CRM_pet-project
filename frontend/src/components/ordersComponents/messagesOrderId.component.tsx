import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';

const MessagesOrderIdComponent = () => {
  const { messagesOrderId, findOneOrder } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleCloseMessagesOrderId = () => {
      dispatch(orderAction.setCloseMessagesOrderId());
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
        <form>
        <label></label>
          <input />
          <button>SUBMIT</button>
        </form>
        <button onClick={handleCloseMessagesOrderId}>EXIT</button>
      </div>
    </div>
  )
}

export default MessagesOrderIdComponent;