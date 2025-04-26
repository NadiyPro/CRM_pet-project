import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GrDocumentExcel } from 'react-icons/gr';

const OrderExelComponent = () => {
  const { dto } = useAppSelector(state => state.orderStore);
  const dispatch = useAppDispatch();

  const handleOrdersExel = () => {

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