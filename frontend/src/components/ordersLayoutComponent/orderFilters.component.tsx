import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { GrPowerReset } from "react-icons/gr";
import { GrDocumentExcel } from "react-icons/gr";
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

  // Обробник зміни значення в інпуті
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, field: SortFieldEnum) => {
    dispatch(orderAction.setSearchValue(e.target.value));
    dispatch(orderAction.setSearchField(field));
  };

  // Обробник зміни вибору поля для пошуку (для селектів)
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

          <select {...register(SortFieldEnum.COURSE)} value={dto.search || ''} onChange={handleCourseChange} >
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


// const OrdersFiltersComponent = () => {
//   const { dto } = useAppSelector((state) => state.orderStore);
//   const dispatch = useAppDispatch();
//
//   // Обробник зміни значення в інпуті
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//     dispatch(orderAction.setSearchValue({ [field]: e.target.value }));
//   };
//
//   // Обробник зміни вибору поля для пошуку (для селектів)
//   const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(orderAction.setSearchValue({ course: e.target.value }));
//   };
//
//   // Обробник зміни вибору поля для пошуку (для селектів)
//   const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(orderAction.setSearchField(e.target.value));
//   };
//
//   // Обробник для скидання фільтрів
//   const handleReset = () => {
//     dispatch(orderAction.resetFilter());
//     dispatch(orderAction.setPage(1));
//     dispatch(orderAction.loadOrdersAll({
//       ...dto,
//       search: '',
//       searchField: '',
//       page: 1,
//       me: false,
//     }));
//   };
//
//   // Обробник відправки форми
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(orderAction.setPage(1)); // Повертаємось на першу сторінку при новому пошуку
//     dispatch(orderAction.loadOrdersAll(dto)); // Завантажуємо всі замовлення з новим фільтром
//   };
//
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         {/* Для кожного поля окремий інпут */}
//         {dto.searchField === 'name' && (
//           <input
//             type="text"
//             value={dto.search || ''}
//             onChange={(e) => handleSearchChange(e, 'name')}
//             placeholder="Search by Name"
//           />
//         )}
//         {dto.searchField === 'email' && (
//           <input
//             type="text"
//             value={dto.search || ''}
//             onChange={(e) => handleSearchChange(e, 'email')}
//             placeholder="Search by Email"
//           />
//         )}
//         {dto.searchField === 'phone' && (
//           <input
//             type="text"
//             value={dto.search || ''}
//             onChange={(e) => handleSearchChange(e, 'phone')}
//             placeholder="Search by Phone"
//           />
//         )}
//         {dto.searchField === 'id' && (
//           <input
//             type="text"
//             value={dto.search || ''}
//             onChange={(e) => handleSearchChange(e, 'id')}
//             placeholder="Search by ID"
//           />
//         )}
//         {dto.searchField === 'course' && (
//           <select value={dto.search || ''} onChange={handleCourseChange}>
//             <option value="">Select Course</option>
//             <option value="Course 1">Course 1</option>
//             <option value="Course 2">Course 2</option>
//             <option value="Course 3">Course 3</option>
//             {/* Додаткові варіанти */}
//           </select>
//         )}
//
//         {/* Вибір поля для пошуку */}
//         <select value={dto.searchField || ''} onChange={handleFieldChange}>
//           <option value="">Select Field</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//           <option value="phone">Phone</option>
//           <option value="id">ID</option>
//           <option value="course">Course</option>
//           {/* Додаткові поля */}
//         </select>
//
//         <button type="submit">Search</button>
//       </form>
//
//       {/* Кнопка для скидання фільтрів */}
//       <button type="button" onClick={handleReset}>
//         Reset Filters
//       </button>
//
//       {/* Інші елементи */}
//       <OrderExelComponent />
//     </div>
//   );
// };
//
// export default OrdersFiltersComponent;








  // const { dto, data } = useAppSelector((state) => state.orderStore);
  // // const store = useAppSelector((state) => state.orderStore);
  // const dispatch = useAppDispatch();
  //
  // // const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  // //   dispatch(orderAction.setSearchField(e.target.value as SortFieldEnum));
  // // };
  //
  // // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   dispatch(orderAction.setSearchValue(e.target.value));
  // // };
  //
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(orderAction.setPage(1)); // Повертаємося на першу сторінку при новому пошуку
  //   dispatch(orderAction.loadOrdersAll(store.dto));
  // };
  //
  // const handleMyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(orderAction.setMe(e.target.checked));
  // };
  //
  // const handleReset = () => {
  //   dispatch(orderAction.resetFilter());
  //   dispatch(orderAction.setPage(1));
  //   dispatch(orderAction.loadOrdersAll({
  //     ...dto,
  //     search: '',
  //     searchField: null,
  //     page: 1,
  //     me: false,
  //   }));
  // };
  //
  // return(
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <select value={data.orders.courset|| 'all course'}
  //               onChange={(e) => dispatch(orderAction.setCourse(e.target.value))}>
  //         <option value={data.orders.courset}>{CourseEnum}</option>
  //       </select>
  //       <select value={data.orders.course_format || 'all course_format'}
  //               onChange={(e) => dispatch(orderAction.setCourse_format(e.target.value))}>
  //         <option value={data.orders.course_format}>{CourseFormatEnum.STATIC}</option>
  //       </select>
  //       <select value={data.orders.course_type || 'all course_type'}
  //               onChange={(e) => dispatch(orderAction.setCourse_type(e.target.value))}>
  //         <option value={data.orders.course_type}>{CourseTypeEnum}</option>
  //       </select>
  //       <select value={data.orders.status || 'all status'}
  //               onChange={(e) => dispatch(orderAction.setStatus(e.target.value))}>
  //         <option value={data.orders.status}>{StatusEnum}</option>
  //       </select>
  //       <input type={'search'} name={SortFieldEnum.ID} value={data.orders.id} placeholder={SortFieldEnum.ID}
  //              onChange={(e) => dispatch(orderAction.setId(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.NAME} value={data.orders.name} placeholder={SortFieldEnum.NAME}
  //              onChange={(e) => dispatch(orderAction.setName(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.SURNAME} value={data.orders.surname} placeholder={SortFieldEnum.SURNAME}
  //              onChange={(e) => dispatch(orderAction.setSurname(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.EMAIL} value={data.orders.email} placeholder={SortFieldEnum.EMAIL}
  //              onChange={(e) => dispatch(orderAction.setEmail(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.PHONE} value={data.orders.phone} placeholder={SortFieldEnum.PHONE}
  //              onChange={(e) => dispatch(orderAction.setPhone(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.AGE} value={data.orders.age} placeholder={SortFieldEnum.AGE}
  //              onChange={(e) => dispatch(orderAction.setAge(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.SUM} value={data.orders.sum} placeholder={SortFieldEnum.SUM}
  //              onChange={(e) => dispatch(orderAction.setSum(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.ALREADY_PAID} value={data.orders.alreadyPaid}
  //              placeholder={SortFieldEnum.ALREADY_PAID} onChange={(e) => dispatch(orderAction.setAlreadyPaid(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.CREATED_AT} value={data.orders.created_at} placeholder={SortFieldEnum.CREATED_AT}
  //              onChange={(e) => dispatch(orderAction.setCreated_at(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.GROUP_ID} value={data.orders.group_id} placeholder={SortFieldEnum.GROUP_ID}
  //              onChange={(e) => dispatch(orderAction.setGroup_id(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.GROUP_NAME} value={data.orders.group_name} placeholder={SortFieldEnum.GROUP_NAME}
  //              onChange={(e) => dispatch(orderAction.setGroup_name(e.target.value))} />
  //       <input type={'search'} name={SortFieldEnum.MANAGER} value={data.orders.manager} placeholder={SortFieldEnum.MANAGER}
  //              onChange={(e) => dispatch(orderAction.setManager(e.target.value))} />
  //     </form>
  //
  //     <div>
  //       <button type="button" onClick={handleReset}>
  //         <GrPowerReset size={20} color={'white'}/>
  //       </button>
  //       <div>
  //         <label htmlFor={'myCheckbox'} >My</label>
  //         <input type={'checkbox'} name={'myCheckbox'} checked={dto.me} onChange={handleMyCheckbox}/>
  //       </div>
  //
  //       <OrderExelComponent/>
  //       {/*<button type="button" onClick={handleOrdersExel}>*/}
  //       {/*  <GrDocumentExcel size={20} color={'white'}/>*/}
  //       {/*</button>*/}
  //     </div>
  //
  //   </div>
  // )

export default OrdersFiltersComponent;