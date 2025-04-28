import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { GrPowerReset } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import OrderExelComponent from './orderExel.component';
import { CourseEnum } from '../../module/enums/courseEnum';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import orderValidator from '../../validator/order.validator';
import { BaseOrdersDto } from '../../module/baseOrders.dto';

const OrdersFiltersComponent = () => {
  const { dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();
  const {handleSubmit, register} = useForm<BaseOrdersDto>({ mode: 'all', resolver: joiResolver(orderValidator) });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, field: SortFieldEnum) => {
    dispatch(orderAction.setSearchValue(e.target.value));
    dispatch(orderAction.setSearchField(field));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderAction.setSearchValue(e.target.value));
    dispatch(orderAction.setSearchField(SortFieldEnum.COURSE));
  };

  const handleReset = () => {
    dispatch(orderAction.resetFilter());
    dispatch(orderAction.setPage(1));
    dispatch(orderAction.loadOrdersAll({
      limit: 25,
      page: 1,
      searchField: null,
      search: '',
      sortField: null,
      sortASCOrDESC: null,
      me: false,
    }));
  };

  const handleMyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(orderAction.setMe(e.target.checked));
  };


  const handleForm: SubmitHandler<BaseOrdersDto> = () => {
    dispatch(orderAction.setPage(1));
    dispatch(orderAction.loadOrdersAll(dto));
  };

  return (
    <div>
        <form onSubmit={handleSubmit(handleForm)}>

          <input
            type="text" {...register(SortFieldEnum.NAME)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.NAME)}
            placeholder="Name"
          />

          <input
            type="text" {...register(SortFieldEnum.SURNAME)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.SURNAME)}
            placeholder="Surname"
          />

          <input
            type="text" {...register(SortFieldEnum.EMAIL)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.EMAIL)}
            placeholder="Email"
          />


          <input
            type="text" {...register(SortFieldEnum.PHONE)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.PHONE)}
            placeholder="Phone"
          />

          <input
            type="text" {...register(SortFieldEnum.AGE)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.AGE)}
            placeholder="Age"
          />

          <input
            type="text" {...register(SortFieldEnum.CREATED_AT)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.CREATED_AT)}
            placeholder="Created_at"
          />

          <input
            type="text" {...register(SortFieldEnum.GROUP_NAME)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.GROUP_NAME)}
            placeholder="Group_name"
          />

          <input
            type="text" {...register(SortFieldEnum.MANAGER)}
            value={dto.search || ''}
            onChange={(e) => handleSearchChange(e, SortFieldEnum.MANAGER)}
            placeholder="Manager"
          />

          <select {...register(SortFieldEnum.COURSE)} value={dto.search || ''} onChange={handleCourseChange}>
            <option value="">all course</option>
            <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
            <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
            <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
            <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
            <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
            <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
          </select>
          )

        </form>

        <button type="button" onClick={handleReset}>
          <GrPowerReset size={20} color={'white'} />
        </button>
        <div>
          <label htmlFor={'myCheckbox'}>My</label>
          <input type={'checkbox'} name={'myCheckbox'} checked={dto.me} onChange={handleMyCheckbox} />
        </div>

        <OrderExelComponent />
    </div>
  );
};

export default OrdersFiltersComponent;