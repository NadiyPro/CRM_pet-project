import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
// import { GrDocumentExcel } from 'react-icons/gr';
import { orderAction } from '../../redux/slices/orderSlice';
import { omit } from 'lodash';
import '../../styles/styles.scss';

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
        {/*<GrDocumentExcel size={20} color={'white'} />*/}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuUlEQVR4nO3WQQpCMRRD0axCxP0vSRRXExE6EMHBl5e09uVCcSiHBi2Q/isKzw3AeQcIATwAXJyQ6uwYiiH3t0/pzNSQE4Cr42YohsCFoQFiwdAEkWNohLySYdwQGWYGRIKZBSnHOP7Zj7zNtoCw4gtnx0BGuZHimGl1mxaLz7cCaTctVwyk241Q9Cv1WSDtpuWKgXS7EeathbUeja4YyCg3UhwzrVGmVRwzrVGmteq0uMj5uW0gCeaeAHHCuEhTlUIAAAAASUVORK5CYII="
          alt="documentExcel" />
      </button>
      {<div><p>{exportSuccess}</p></div>}
      {loadingExel && <div><p>loading...</p></div>}
    </div>
  )
}

export default OrderExelComponent;