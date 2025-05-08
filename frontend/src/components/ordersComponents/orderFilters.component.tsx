import React from 'react';
import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { GrPowerReset } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import OrderExelComponent from './orderExel.component';
import { CourseEnum } from '../../module/enums/courseEnum';
import { StatusEnum } from '../../module/enums/statusEnum';
import { CourseFormatEnum } from '../../module/enums/courseFormatEnum';
import { CourseTypeEnum } from '../../module/enums/courseTypeEnum';
import { SortASCOrDESCEnum } from '../../module/enums/sortASCOrDESCEnum';

const OrdersFiltersComponent = () => {
  const { dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: SortFieldEnum) => {
    const value = e.target.value;
    dispatch(orderAction.loadOrdersAll({
      ...dto, [field]: value
    }));
  };

  const handleReset = () => {
    dispatch(orderAction.resetFilter());
    dispatch(orderAction.setPage(1));
    dispatch(orderAction.loadOrdersAll({
      limit: 25,
      page: 1,
      sortField: SortFieldEnum.CREATED_AT,
      sortASCOrDESC: SortASCOrDESCEnum.DESC,
      me: false,
    }));
  };

  const handleMyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(orderAction.setMe(e.target.checked));
  };


  return (
    <div>
      <form>
        <input
          type="text" name={SortFieldEnum.NAME}
          value={dto.name || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.NAME)}
          placeholder="Name"
        />

        <input
          type="text" name={SortFieldEnum.SURNAME}
          value={dto.surname|| ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.SURNAME)}
          placeholder="Surname"
        />

        <input
          type="text" name={SortFieldEnum.EMAIL}
          value={dto.email || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.EMAIL)}
          placeholder="Email"
        />


        <input
          type="text" name={SortFieldEnum.PHONE}
          value={dto.phone || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.PHONE)}
          placeholder="Phone"
        />

        <input
          type="number" name={SortFieldEnum.AGE}
          value={dto.age || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.AGE)}
          placeholder="Age" min={18} max={100}
        />

        <input
          type="text" name={SortFieldEnum.CREATED_AT}
          value={dto.created_at || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.CREATED_AT)}
          placeholder="Created_at"
        />

        <input
          type="text" name={SortFieldEnum.GROUP_NAME}
          value={dto.group_name || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.GROUP_NAME)}
          placeholder="Group_name"
        />

        <input
          type="text" name={SortFieldEnum.MANAGER}
          value={dto.manager || ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.MANAGER)}
          placeholder="Manager"
        />

        <select name={SortFieldEnum.STATUS}   value={dto.status || ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.STATUS)}>
          <option value="">all status</option>
          <option value={StatusEnum.IN_WORK}>{StatusEnum.IN_WORK}</option>
          <option value={StatusEnum.NEW}>{StatusEnum.NEW}</option>
          <option value={StatusEnum.AGGRE}>{StatusEnum.AGGRE}</option>
          <option value={StatusEnum.DISAGGRE}>{StatusEnum.DISAGGRE}</option>
          <option value={StatusEnum.DUBBING}>{StatusEnum.DUBBING}</option>
        </select>

        <select name={SortFieldEnum.COURSE} value={dto.course || ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE)}>
          <option value="">all course</option>
          <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
          <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
          <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
          <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
          <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
          <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
        </select>

        <select name={SortFieldEnum.COURSE_FORMAT} value={dto.course_format || ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE_FORMAT)}>
          <option value="">all course format</option>
          <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
          <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
        </select>

        <select name={SortFieldEnum.COURSE_TYPE} value={dto.course_type || ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE_TYPE)}>
          <option value="">all course type</option>
          <option value={CourseTypeEnum.PRO}>{CourseTypeEnum.PRO}</option>
          <option value={CourseTypeEnum.MINIMAL}>{CourseTypeEnum.MINIMAL}</option>
          <option value={CourseTypeEnum.PREMIUM}>{CourseTypeEnum.PREMIUM}</option>
          <option value={CourseTypeEnum.INCUBATOR}>{CourseTypeEnum.INCUBATOR}</option>
          <option value={CourseTypeEnum.VIP}>{CourseTypeEnum.VIP}</option>
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