import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { CourseEnum } from '../../module/enums/courseEnum';
import { CourseFormatEnum } from '../../module/enums/courseFormatEnum';
import { CourseTypeEnum } from '../../module/enums/courseTypeEnum';
import { StatusEnum } from '../../module/enums/statusEnum';
import { GrPowerReset } from "react-icons/gr";
import { GrDocumentExcel } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fail } from 'node:assert';

const OrdersFiltersComponent = () => {
  const { dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderAction.setSearchField(e.target.value as SortFieldEnum));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(orderAction.setSearchValue(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(orderAction.setPage(1)); // Повертаємося на першу сторінку при новому пошуку
    dispatch(orderAction.loadOrdersAll(dto));
  };

  const handleMyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(orderAction.setMe(e.target.checked));
  };

  const handleReset = () => {
    dispatch(orderAction.resetFilter());
    dispatch(orderAction.setPage(1));
    dispatch(orderAction.loadOrdersAll({
      ...dto,
      search: '',
      searchField: null,
      page: 1,
      me: false,
    }));
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <select value={dto.searchField || 'all course'}
                onChange={handleFieldChange}>
          <option value={CourseEnum.FS}>FS</option>
          <option value={CourseEnum.QACX}>QACX</option>
          <option value={CourseEnum.JCX}>JCX</option>
          <option value={CourseEnum.JSCX}>JSCX</option>
          <option value={CourseEnum.FE}>FE</option>
          <option value={CourseEnum.PCX}>PCX</option>
        </select>
        <select value={dto.searchField || 'all course_format'}
                onChange={handleFieldChange}>
          <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
          <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
        </select>
        <select value={dto.searchField || 'all course_type'}
                onChange={handleFieldChange}>
          <option value={CourseTypeEnum.PRO}>{CourseTypeEnum.PRO}</option>
          <option value={CourseTypeEnum.MINIMAL}>{CourseTypeEnum.MINIMAL}</option>
          <option value={CourseTypeEnum.PREMIUM}>{CourseTypeEnum.PREMIUM}</option>
          <option value={CourseTypeEnum.INCUBATOR}>{CourseTypeEnum.INCUBATOR}</option>
          <option value={CourseTypeEnum.VIP}>{CourseTypeEnum.VIP}</option>
        </select>
        <select value={dto.searchField || 'all status'}
                onChange={handleFieldChange}>
          <option value={StatusEnum.IN_WORK}>{StatusEnum.IN_WORK}</option>
          <option value={StatusEnum.NEW}>{StatusEnum.NEW}</option>
          <option value={StatusEnum.AGGRE}>{StatusEnum.AGGRE}</option>
          <option value={StatusEnum.DISAGGRE}>{StatusEnum.DISAGGRE}</option>
          <option value={StatusEnum.DUBBING}>{StatusEnum.DUBBING}</option>
        </select>
        <input type={'search'} name={SortFieldEnum.ID} value={dto.search} placeholder={SortFieldEnum.ID}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.NAME} value={dto.search} placeholder={SortFieldEnum.NAME}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.SURNAME} value={dto.search} placeholder={SortFieldEnum.SURNAME}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.EMAIL} value={dto.search} placeholder={SortFieldEnum.EMAIL}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.PHONE} value={dto.search} placeholder={SortFieldEnum.PHONE}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.AGE} value={dto.search} placeholder={SortFieldEnum.AGE}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.SUM} value={dto.search} placeholder={SortFieldEnum.SUM}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.ALREADY_PAID} value={dto.search}
               placeholder={SortFieldEnum.ALREADY_PAID} onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.CREATED_AT} value={dto.search} placeholder={SortFieldEnum.CREATED_AT}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.GROUP_ID} value={dto.search} placeholder={SortFieldEnum.GROUP_ID}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.GROUP_NAME} value={dto.search} placeholder={SortFieldEnum.GROUP_NAME}
               onChange={handleSearchChange} />
        <input type={'search'} name={SortFieldEnum.MANAGER} value={dto.search} placeholder={SortFieldEnum.MANAGER}
               onChange={handleSearchChange} />
      </form>

      <div>
        <button type="button" onClick={handleReset}>
          <GrPowerReset size={20} color={'white'}/>
        </button>
        <div>
          <label htmlFor={'myCheckbox'} >My</label>
          <input type={'checkbox'} name={'myCheckbox'} checked={dto.me} onChange={handleMyCheckbox}/>
        </div>
        <button type="button">
          <GrDocumentExcel size={20} color={'white'}/>
        </button>
      </div>

    </div>
  )
};

export default OrdersFiltersComponent;