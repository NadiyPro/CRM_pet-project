import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
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
    <div className={'divMainLayout__header__nav__panel'}>
      <button className={'divMainLayout__header__nav__panel__button'} type="button" onClick={handleOrdersExel}
              disabled={loadingExel}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvUlEQVR4nO3aT8hOWRzA8etFgw2lmQXZCBE7Wcw0pbckhRRhoezIwp9mNZSaWc3YsrGyIKUUKQtESVGUhZSVQq+IBeVvg8lHp7lP3fe85z5/Xvd57tMzz7eexX3O6fx+33vPvfecc0+WdRGMYAm24W9cxgvcyvoVTMdy7MRRXMUrJWT9AOZgFL/hJO7jSyLfr3iIsziEdbWJYB7W4ABO4UGeYMyXvCzU+R0bMTfRXndFMBUL8wT+xMW8P6d4h7t50kHwV8xsM053RLAPd/CxJOmXuIIj2J7fvCPfEa9rIp8LST/CORzGBsyvONYPqmUs3HeNxhvMqTLpJk+2qhkbJ9JtiYJMZfEU2xqKTJLhFUkw7FpVUPboaVXeINXWxIMeoNcimIut0W99kwQXJer/VCZS5UnJWoiEsde9xElZVdLoraheGEBOr10kkA8G45Hu+SwCmxPCo3G92kQC+VyiSBBbEV25cPaLnM5KqFNkAd6XJYpdUdmbMIfpO5EA/oiS/ReLMSMfgRbZnzVBCa3KG6TamnhQHnwmHhvPMeyJ/gsPh2l9KxLAlsSE63Z07/yStaDdeO0wKZG8bpgplnGi4+A1iqwoWS15jR87Dl6jyFL8kxAJ8/2FHQevQ8R/q4Y3m3StSx0Hr0lkb5T41bxLFdnUbvCYVuUNvkskfym+NZ6wNHQ8+u8JZvWzyIXE+2IkX4X8EJX91Y5IVgE6EcnPfMzaQnlYuCvyCcv6SgSz8SxK9HpiQTtedb+BKf0kciJKMLy9VybqHUxctR19IYLVibnImSZjsadR3Rep1cs6RNZhd/Rb0KTRnxP1l9Yu0i0SXXBcfC1ItTXxoAcMnEhWdVuGIpNjeEX+d11LDz69RfEq//T2uVcfQ7sgMlb8GLp3ID5PD8yGgYHbwjHwm2oGeptT1iYlG8+e41rVwb4B35Ud0Bc1y3EAAAAASUVORK5CYII="
          alt="excel" />
      </button>
      {exportSuccess &&
        <div className={'divMainLayout__header__nav__panel__export'}>
        <p style={{ margin: 0, color: exportSuccess.type === 'success' ? '#1f615c' : 'darkred', }}>{exportSuccess.text}</p>
        </div>}
      {loadingExel && <div className={'divMainLayout__header__nav__panel__export'}><p>loading...</p></div>}
    </div>
  )
}

export default OrderExelComponent;