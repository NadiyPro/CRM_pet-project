import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GrDocumentExcel } from 'react-icons/gr';
import { orderAction } from '../../redux/slices/orderSlice';

const OrderExelComponent = () => {
  const { searchField, search, sortField, sortASCOrDESC, me } = useAppSelector(state => state.orderStore.dto);
  const dispatch = useAppDispatch();

  const dtoExel = {searchField, search, sortField, sortASCOrDESC, me };

  const handleOrdersExel = (e: React.FormEvent) => {
    dispatch(orderAction.loadOrdersExel(dtoExel));
  }

  return(
    <div>
      <button type="button" onClick={handleOrdersExel}>
        <GrDocumentExcel size={20} color={'white'} />
      </button>
    </div>
  )
}

export default OrderExelComponent;