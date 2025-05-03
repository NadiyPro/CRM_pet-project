import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GrDocumentExcel } from 'react-icons/gr';
import { orderAction } from '../../redux/slices/orderSlice';
import { omit } from 'lodash';

const OrderExelComponent = () => {
  const { dto, loadingExel, exportSuccess } = useAppSelector(state => state.orderStore);
  const dispatch = useAppDispatch();

  const handleOrdersExel = async (e: React.FormEvent) => {
    e.preventDefault();

    const dtoExel = omit(dto, ['limit', 'page']);
    // Pick — вибрати конкретні поля з базового класу
    // Omit - прибрати конкретні поля з базового класу
    await dispatch(orderAction.loadOrdersExel(dtoExel));
  };

  return(
    <div>
      <button type="button" onClick={handleOrdersExel} disabled={loadingExel}>
        <GrDocumentExcel size={20} color={'white'} />
      </button>
      {<div>{exportSuccess}</div>}
      {loadingExel && <div>loading...</div>}
    </div>
  )
}

export default OrderExelComponent;