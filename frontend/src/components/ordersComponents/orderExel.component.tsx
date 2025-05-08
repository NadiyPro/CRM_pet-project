import React from 'react';
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
      {<p>{exportSuccess}</p>}
      {loadingExel && <p>loading...</p>}
    </div>
  )
}

export default OrderExelComponent;