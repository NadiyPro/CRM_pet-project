import React, { useCallback, useEffect, useState } from 'react';
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
import '../../styles/styles.scss';
import { SortASCOrDESCEnum } from '../../module/enums/sortASCOrDESCEnum';
import { debounce } from 'lodash';

const OrdersFiltersComponent = () => {
  const { dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();
  const [localAge, setLocalAge] = useState<string>(dto.age ? String(dto.age) : '');
  const [errorAge, setErrorAge] = useState<boolean>(false);

  useEffect(() => {
    setLocalAge(dto.age !== null && dto.age !== undefined ? String(dto.age) : '');
  }, [dto.age]);

  const debounceAge = useCallback(
    debounce((value: string) => {
      if (value === '') {
        setErrorAge(false);
        const updatedDto = { ...dto, age: null as number | null };
        dispatch(orderAction.setDto(updatedDto));
        dispatch(orderAction.loadOrdersAll(updatedDto));
        return;
      }

      const ageValue = Number(value.trim());
      const isValid = !/^\d+$/.test(value) || value.length < 2 || ageValue < 12 || ageValue > 100;

      if (isValid) {
        setErrorAge(true);
        return;
      }

      setErrorAge(false);
      const updatedDto = { ...dto, age: ageValue };
      dispatch(orderAction.setDto(updatedDto));
      dispatch(orderAction.loadOrdersAll(updatedDto));
    }, 500),
    [dto, dispatch]
  );

// очищаю, щоб не зависло значення
  useEffect(() => {
    return () => {
      debounceAge.cancel();
    };
  }, [debounceAge]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: SortFieldEnum | 'created_at_from' | 'created_at_to'
  ) => {
    const value = e.target.value;

    if (field === SortFieldEnum.AGE) {
      setLocalAge(value);
      debounceAge(value);
      return;
    }

    const updatedDto = {
      ...dto,
      [field]: value || undefined,
    };
    dispatch(orderAction.setDto(updatedDto));
    dispatch(orderAction.loadOrdersAll(updatedDto));
  };

  const handleReset = () => {
    dispatch(orderAction.resetFilter());

    const reset = {
      limit: 25,
      page: 1,
      sortField: SortFieldEnum.CREATED_AT,
      sortASCOrDESC: SortASCOrDESCEnum.DESC,
      my: false,
      age: null,
    };

    dispatch(orderAction.loadOrdersAll(reset));
  };

  const handleMyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(orderAction.setMe(e.target.checked));
    const update = {
      ...dto,
      page: 1,
      my: e.target.checked,
    };
    dispatch(orderAction.setDto(update)); // щоб можна було шукати і скидуватись на першу сторінку
    dispatch(orderAction.loadOrdersAll(update));
  };


  return (
    <div className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent'}>
      <form className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form'}>
        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="text" name={SortFieldEnum.NAME}
               value={(dto.name ?? '').trim()}
               onChange={(e) => handleSearchChange(e, SortFieldEnum.NAME)}
               placeholder="Name"
        />

        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="text" name={SortFieldEnum.SURNAME}
               value={(dto.surname ?? '').trim()}
               onChange={(e) => handleSearchChange(e, SortFieldEnum.SURNAME)}
               placeholder="Surname"
        />

        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="text" name={SortFieldEnum.EMAIL}
               value={(dto.email ?? '').trim()}
               onChange={(e) => handleSearchChange(e, SortFieldEnum.EMAIL)}
               placeholder="Email"
        />


        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="text" name={SortFieldEnum.PHONE}
               value={(dto.phone ?? '').trim()}
               onChange={(e) => handleSearchChange(e, SortFieldEnum.PHONE)}
               placeholder="Phone"
        />

        <div>
          <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
                 type="text" name={SortFieldEnum.AGE}
                 value={localAge.trim()}
                 onChange={(e) => handleSearchChange(e, SortFieldEnum.AGE)}
                 placeholder="Age"
          />
          {errorAge && <div><p style={{color: '#6e0707', margin: '5px 0'}}>Вік від 12 до 100 років</p></div>}
        </div>

        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="date"
               name="created_at_from"
               min={'2021-01-01'}
               value={(dto.created_at_from ?? '').trim()}
               onChange={(e) => handleSearchChange(e, 'created_at_from')}
               placeholder="Created from"
        />

        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="date"
               name="created_at_to"
               min={'2021-01-01'}
               value={(dto.created_at_to ?? '').trim()}
               onChange={(e) => handleSearchChange(e, 'created_at_to')}
               placeholder="Created to"
        />

        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="text" name={SortFieldEnum.GROUP_NAME}
               value={(dto.group_name ?? '').trim()}
               onChange={(e) => handleSearchChange(e, SortFieldEnum.GROUP_NAME)}
               placeholder="Group_name"
        />

        <input className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__input'}
               type="text" name={SortFieldEnum.MANAGER}
               value={(dto.manager ?? '').trim()}
               onChange={(e) => handleSearchChange(e, SortFieldEnum.MANAGER)}
               placeholder="Manager"
        />

        <select className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__select'}
                name={SortFieldEnum.STATUS} value={dto.status ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.STATUS)}>
          <option value="">all status</option>
          <option value={StatusEnum.IN_WORK}>{StatusEnum.IN_WORK}</option>
          <option value={StatusEnum.NEW}>{StatusEnum.NEW}</option>
          <option value={StatusEnum.AGGRE}>{StatusEnum.AGGRE}</option>
          <option value={StatusEnum.DISAGGRE}>{StatusEnum.DISAGGRE}</option>
          <option value={StatusEnum.DUBBING}>{StatusEnum.DUBBING}</option>
        </select>

        <select className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__select'}
                name={SortFieldEnum.COURSE} value={dto.course ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE)}>
          <option value="">all course</option>
          <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
          <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
          <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
          <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
          <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
          <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
        </select>

        <select className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__select'}
                name={SortFieldEnum.COURSE_FORMAT} value={dto.course_format ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE_FORMAT)}>
          <option value="">all course format</option>
          <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
          <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
        </select>

        <select className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__form__select'}
                name={SortFieldEnum.COURSE_TYPE} value={dto.course_type ?? ''}
                onChange={(e) => handleSearchChange(e, SortFieldEnum.COURSE_TYPE)}>
          <option value="">all course type</option>
          <option value={CourseTypeEnum.PRO}>{CourseTypeEnum.PRO}</option>
          <option value={CourseTypeEnum.MINIMAL}>{CourseTypeEnum.MINIMAL}</option>
          <option value={CourseTypeEnum.PREMIUM}>{CourseTypeEnum.PREMIUM}</option>
          <option value={CourseTypeEnum.INCUBATOR}>{CourseTypeEnum.INCUBATOR}</option>
          <option value={CourseTypeEnum.VIP}>{CourseTypeEnum.VIP}</option>
        </select>

      </form>

      <div className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__menu'}>
        <button className={'divMainLayout__header__nav__panel__button'} type="button" onClick={handleReset}>
          {/*<GrPowerReset size={20} color={'white'} />*/}
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEQ0lEQVR4nO2ZaahVVRTHj2kOSYpP6YMkmh/00YcSIzM0FZWk1LAi1MQXUZQofdXUbNCMEmeigdJQIaJJQcOi0L4EDRamaWFoTjmmJWbl9H7x96wN2+M+p3ffPffcG7wfHHiXt4f/2sPaa68dRS200ELZANcCo4EXgQ3AT8BJ4BzwF3AQ2AasB54CRgAdqy26lYl+HzgFbAaeNnF9nUCgDdAV6A+MBxYDPwB/AquAYWqraOESsh34GZgGdDHRTwArgG9s1M8A5202NCsfAs8CA638Ivvfd8DIIsSr003Ar8BE4BozQMaUymFgHlAPLADOAhuBHpUS32DT/paNuH7vpXz+AV4CBgDfAyeAe/JeMm6EptiIbQkI2QEsBMYBfYDOVr8T0Nv2xhzgU+BCoP4hq7saaNR+ykv8GzZKdwH327p2XATeAW4tsd0ewDPA7wkjGm02XrXfL5RrwALbhGOAx02w4yugX5ntdzOxEu7ztnkomj0TwEPWwCxgkie+0fx9m3LEJ/oaG5gNzewX1u/oUhustw37MXCbLSFs7T6al3Af2zfybj46WzBX2ysqYd1/DvwN3Ajs9hp8LKogxAN3hDDrmtrIBKsw37yGY3ElxTuAISleSoyIsgCuMnd42kZfy0hsBdpGBQHMDYhXLDXJ/i+3fG/aZhKvA695m3ZQUeKFBgv4xRPfaDHTDO8Mei5KYrGKuNMb/Q1RFSA+6bO43IXr5LTTVu7sEa/g8IKF9wFm27JNY0/W8vkIeNf+3qd9UaD4elvr/8WSUGXFMeJ5i0vEK0WJd9j9YSrwW4YBQ0IVFcpiNybHhKhKEEe8yyyU8TkGtA5V2O35f8dNVVHvYe78E0/Tm2kF/7ACS73Cl0LiWoB4j+5SYJkWPrjT74zne6+cqipCfD60TTPAD5Vr0oBMLHxI0iX6v0CcYUjSP6oRgEGWV7ohrYC/0x0PRzUC8dmAJcquvJNYvibJmqhGAD7wdM0MFRgaMEA3oQ5VUewB1HnBpRgcKtTebmFJGqIqA0z39MiQdmkFXRDn82M13SlwNbDf07Miq/AdhJlWqGqPxLVWDIyysERrEmWfe0cFQ5zRVoresaUple5LmYWtReb0iTfuzoSGYU2tvC7FiM+02QsQ3xn4OtH3e6U0cL0tmxDKGdVVUPx1AfHHS067W/4/mbN06O5wewXEjwGOJvpSkDmquQ0+STq6Kb2s56MchPfURSVlwGaV27hEZqEodoluTs1o+2bLQvuexie3N4KZgftCiG1mzAPK29jjni4h7SyVLrf4ILASOJDRjvqaUbb4hCF3Z2zsPDmux5RcxXtG9PKyd5VgLdC9IuIThoyyB7m8+FJhTMWFBwy5xRLBfqjbVLQc9aA3MveHbkvx6YlJ2eDlJlKns14Y3fetnQf69Oaru4O+5FORjyujT68xrr4exv22tUzVpxJb0jBZOdOQ2H8BwK78eGPC/TsAAAAASUVORK5CYII="
            alt="recurring-appointment" />
        </button>

        <div className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__menu__my'}>
          <label htmlFor={'myCheckbox'}>My</label>
          <input type={'checkbox'} name={'myCheckbox'} checked={dto.my} onChange={handleMyCheckbox} className={'divMainLayout__outlet__ordersAllPage__ordersFiltersComponent__menu__my__checkbox'}/>
        </div>

        <OrderExelComponent />
      </div>

    </div>
  );
};

export default OrdersFiltersComponent;