import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import OrderExelComponent from './orderExel.component';
import { CourseEnum } from '../../module/enums/courseEnum';
import { StatusEnum } from '../../module/enums/statusEnum';
import { CourseFormatEnum } from '../../module/enums/courseFormatEnum';
import { CourseTypeEnum } from '../../module/enums/courseTypeEnum';

const OrdersFiltersComponent = () => {
  const { dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: SortFieldEnum | 'created_at_from' | 'created_at_to') => {
    const value = e.target.value;
    const isDateField = field === 'created_at_from' || field === 'created_at_to';
    const formatValue = value
      ? isDateField
        ? dayjs(value).format('YYYY-MM-DD')
        : value
      : null;

    const updatedDto = {
      ...dto,
      [field]: formatValue,
    };

    // if (dto.created_at) {
    //   delete updatedDto.created_at;
    // }

    dispatch(orderAction.setDto(updatedDto));
    dispatch(orderAction.loadOrdersAll(updatedDto));
  };

  const handleReset = () => {
    dispatch(orderAction.resetFilter());
  };

  const handleMyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(orderAction.setMe(e.target.checked));
  };


  return (
    <div>
      <form>
        <input
          type="text" name={SortFieldEnum.NAME}
          value={dto.name ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.NAME)}
          placeholder="Name"
        />

        <input
          type="text" name={SortFieldEnum.SURNAME}
          value={dto.surname ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.SURNAME)}
          placeholder="Surname"
        />

        <input
          type="text" name={SortFieldEnum.EMAIL}
          value={dto.email ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.EMAIL)}
          placeholder="Email"
        />


        <input
          type="text" name={SortFieldEnum.PHONE}
          value={dto.phone ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.PHONE)}
          placeholder="Phone"
        />

        <input
          type="number" name={SortFieldEnum.AGE}
          value={dto.age ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.AGE)}
          placeholder="Age" min={18} max={100}
        />

        <input
          type="date" name={'created_at_from'}
          value={dto.created_at_from ? dayjs(dto.created_at_from).format('YYYY-MM-DD') : ''}
          onChange={(e) => handleSearchChange(e, 'created_at_from')}
          placeholder="Created_at_from"
        />

        <input
          type="date" name={'created_at_to'}
          value={dto.created_at_to ? dayjs(dto.created_at_to).format('YYYY-MM-DD') : ''}
          onChange={(e) => handleSearchChange(e, 'created_at_to')}
          placeholder="Created_at_to"
        />

        {/*<input*/}
        {/*  type="text" name={'created_at_from'}*/}
        {/*  value={dto.created_at_from ? dayjs(dto.created_at_from).format('DD.MM.YYYY') : ''}*/}
        {/*  onChange={(e) => handleSearchChange(e, 'created_at_from')}*/}
        {/*  placeholder="Created_at_from"*/}
        {/*/>*/}

        {/*<input*/}
        {/*  type="text" name={'created_at_to'}*/}
        {/*  value={dto.created_at_to ? dayjs(dto.created_at_to).format('DD.MM.YYYY') : ''}*/}
        {/*  onChange={(e) => handleSearchChange(e, 'created_at_to')}*/}
        {/*  placeholder="Created_at_to"*/}
        {/*/>*/}


        {/*<input*/}
        {/*  type="date" name={'created_at_from'}*/}
        {/*  value={dto.created_at_from ? dayjs(dto.created_at_from, 'DD.MM.YYYY').format('YYYY-MM-DD') : ''}*/}
        {/*  onChange={(e) => handleSearchChange(e, 'created_at_from')}*/}
        {/*  placeholder="Created_at_from"*/}
        {/*/>*/}

        {/*<input*/}
        {/*  type="date" name={'created_at_to'}*/}
        {/*  value={dto.created_at_to ? dayjs(dto.created_at_to, 'DD.MM.YYYY').format('YYYY-MM-DD') : ''}*/}
        {/*  onChange={(e) => handleSearchChange(e, 'created_at_to')}*/}
        {/*  placeholder="Created_at_to"*/}
        {/*/>*/}

        <input
          type="text" name={SortFieldEnum.GROUP_NAME}
          value={dto.group_name ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.GROUP_NAME)}
          placeholder="Group_name"
        />

        <input
          type="text" name={SortFieldEnum.MANAGER}
          value={dto.manager ?? ''}
          onChange={(e) => handleSearchChange(e, SortFieldEnum.MANAGER)}
          placeholder="Manager"
        />

        <select name={SortFieldEnum.STATUS} value={dto.status ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.STATUS)}>
          <option value="">all status</option>
          <option value={StatusEnum.IN_WORK}>{StatusEnum.IN_WORK}</option>
          <option value={StatusEnum.NEW}>{StatusEnum.NEW}</option>
          <option value={StatusEnum.AGGRE}>{StatusEnum.AGGRE}</option>
          <option value={StatusEnum.DISAGGRE}>{StatusEnum.DISAGGRE}</option>
          <option value={StatusEnum.DUBBING}>{StatusEnum.DUBBING}</option>
        </select>

        <select name={SortFieldEnum.COURSE} value={dto.course ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE)}>
          <option value="">all course</option>
          <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
          <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
          <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
          <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
          <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
          <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
        </select>

        <select name={SortFieldEnum.COURSE_FORMAT} value={dto.course_format ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE_FORMAT)}>
          <option value="">all course format</option>
          <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
          <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
        </select>

        <select name={SortFieldEnum.COURSE_TYPE} value={dto.course_type ?? ''}
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
        {/*<GrPowerReset size={20} color={'white'} />*/}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEJElEQVR4nO2ZaYiWVRTHf6aOpuTggh9CSfswDn5QUUzFXKhILBUrIk1UwlBR/Jr7vlBiuSCWuKFCRIsJGhaK+kUoU7FxSRQ19zUXxn2ZiQP/By7P3Oedeed93ud5g/nDYd7hucv/3HvPueecC3WoQx3iwEvAu8DnwHbgBHALeAI8AC4CZcA2YAbwJtCUlFFPpH8E7gJ7gFki18Eh2ABoCXQFPgK+Ao4C94CNQH+NlShxI3IEOAVMBJqL9CRgHfCnVv0+8FS7YbuyBZgD9FT7L/XtEPBWEuRt0t3AJWA40EQKmDKVWcoVYD5QCiwGHgM7gLb5Ij9K275BK27//1ML4mF5BHwBvAb8BfwLDIn7yAQrNF4rdsBD5BiwBBgKlADF6t8MeFW2MRPYCTzz9L+svpuACtlTLOTXaJUGAh/oXAeTPge+A7pnOa4dk9nA7ZASFdqNr/X/olwVWCwjHASME+Fgsj+ALjmO30pkK0KKfCsPVZnLTozWANOAEQ75Cvl7c49xYbBnN2xn92lec9dZoVQG+yvQQ0eoUmf3U/KDEnk3V4k9+muutl02534v8BDoCJx2BhxLflEKXI3wVltrOsgwdVgorxEMYDdoEugb4aUq5cky4gW5w3Kt/j11PAwUkRzmeciXyRaRW34vypis8WrgG8doe5MsioCzIfdqMdNk5w6a6+u4RR/fdlbfoss0MKqaG7yKCy/WbWvubIzT8I2EiZcA03Vso8ifyXR8fgG+1+9zsoukUKqzXl38tNTXeYk+LlBcYr9XkTwaABOAmxkUME9VBTv0cYbT0FxqWmgOLFco45K/DtT3dTjt+P+gcSfSR0fgN4fT2qiGd9RgmdM4CIkLAYOBkwosveFDcPvdd3yvd6tSRFHUhVovFCoXqgIZUe6xdjOk/w1OeRSwUkihoLfqSu2jGriWHsgnFA4miNODqJxkjkeBzRQOfnJ4TfU16OdRwDKhF0kfLZzg0uR1X6PGysLCSlhUmDY+c/iYIo2iGgZBnCt/p+xOGwLnHT5WuoxEn4jgycqHaWFmiIvVVTPikEeBu0rjkkZXlegDHpaNVYv3I3bhcMI1/RbA8RAHSytrhK0RSuySsecbxcD+0Nw/ZDNAGx0bnxJ7tTr5QmsP+Ru1KbsP99QsA7HcoVceyA8CroXmsiBzQG0HnJIhrbNMaaWej3LFK0pUfAtmtdmcsLKaBLtcSbZlTtmis6rQrqdxJbY3gqmefMEnZVLmQ9VtWioBaaRSurnFj4H1wIUM4zxXEStWvJPBsOOUG3pMyQvaOdW7fMjPwMskgAF6kIuL+O8KYxJHNxWC3VC3pmLH0R707H049oduK/HZE5MZ0gqRtNvZXhgDOaj7wMTefC13MAk/FbkStDGx15igvz2Mu2PbMbU5rbBlHEaqZloF/wFjsi7WUGvWiwAAAABJRU5ErkJggg=="
          alt="recurring-appointment" />
      </button>
      <div>
        <label htmlFor={'myCheckbox'}>My</label>
        <input type={'checkbox'} name={'myCheckbox'} checked={dto.my} onChange={handleMyCheckbox} />
      </div>

      <OrderExelComponent />
    </div>
  );
};

export default OrdersFiltersComponent;