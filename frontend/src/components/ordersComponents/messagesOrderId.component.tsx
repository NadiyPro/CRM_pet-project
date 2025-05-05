import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';

const MessagesOrderIdComponent = () => {
  const { isMessagesOrderId } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleCloseMessagesOrderId = () => {
      dispatch(orderAction.setCloseMessagesOrderId());
    }

  return(
    <div>
      <div>
        <p>UTM: {}</p>
        <div>
          {}
        </div>
      </div>
      <div>
        {}
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