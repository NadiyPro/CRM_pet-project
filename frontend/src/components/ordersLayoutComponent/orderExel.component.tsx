import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GrDocumentExcel } from 'react-icons/gr';
import { orderAction } from '../../redux/slices/orderSlice';
import { omit } from 'lodash';

const OrderExelComponent = () => {
  const { dto, loading, exportSuccess } = useAppSelector(state => state.orderStore);
  const dispatch = useAppDispatch();

  const handleOrdersExel = async (e: React.FormEvent) => {
    e.preventDefault();

    const dtoExel = omit(dto, ['limit', 'page']);
    // Pick — вибрати конкретні поля з базового класу
    // Omit - прибрати конкретні поля з базового класу

    dispatch(orderAction.setLoading(true));
    dispatch(orderAction.setExportSuccess(false));

    try {
      await dispatch(orderAction.loadOrdersExel(dtoExel));

      dispatch(orderAction.setExportSuccess(true));

      // Встановлюємо таймер для скидання статусу після 10 секунд
      setTimeout(() => {
        dispatch(orderAction.setExportSuccess(false));
      }, 10000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(orderAction.setLoading(false));
    }
  };

  return(
    <div>
      <button type="button" onClick={handleOrdersExel} disabled={loading}>
        <GrDocumentExcel size={20} color={'white'} />
      </button>
      {exportSuccess && <p>File uploaded successfully!</p>}
      {loading && <div>loading...</div>}
    </div>
  )
}

export default OrderExelComponent;