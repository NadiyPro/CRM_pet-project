import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GrDocumentExcel } from 'react-icons/gr';
import { orderAction } from '../../redux/slices/orderSlice';
import { omit } from 'lodash';

const OrderExelComponent = () => {
  const { dto } = useAppSelector(state => state.orderStore);
  const dispatch = useAppDispatch();

  const handleOrdersExel = (e: React.FormEvent) => {
    e.preventDefault();

    const dtoExel = omit(dto, ['limit', 'page']);
    // Pick — вибрати конкретні поля з базового класу
    // Omit - прибрати конкретні поля з базового класу

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