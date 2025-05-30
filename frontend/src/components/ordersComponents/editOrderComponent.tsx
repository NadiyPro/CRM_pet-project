import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import orderValidator from '../../validator/order.validator';
import { UpdateOrdersReqDto } from '../../module/updateOrdersReq.dto';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { StatusEnum } from '../../module/enums/statusEnum';
import { CourseEnum } from '../../module/enums/courseEnum';
import { CourseFormatEnum } from '../../module/enums/courseFormatEnum';
import { CourseTypeEnum } from '../../module/enums/courseTypeEnum';
import { Group_nameDto } from '../../module/group_name.dto';
import group_nameValidator from '../../validator/group_name.validator';
import { useEffect } from 'react';

const EditOrderComponent = () => {
  const { handleSubmit, register, reset, watch} = useForm<UpdateOrdersReqDto>({
    mode: 'all',
    resolver: joiResolver(orderValidator)
  })
  const {
    handleSubmit: handleSubmitCreateGroup,
    register: registerCreateGroup,
    reset: resetCreateGroup,
    formState: { isValid: isValidCreateGroup }
  } = useForm<Group_nameDto>({ mode: 'all', resolver: joiResolver(group_nameValidator) })
  const {
    handleSubmit: handleSubmitAddGroup,
    register: registerAddGroup,
  } = useForm<{ group_group_name: string }>({ mode: 'all' })
  const { findOneOrder, isDefaultGroupState, isAddGroupState, isCreateGroup, allGroup, dto, isDuplicate, isGroupOrder, isNoGroup} = useAppSelector((state) => state.orderStore)
  const dispatch = useAppDispatch();
  const watchFormEdit = watch();

  const isSomeValueEdit = Object.values(watchFormEdit).some(
    value => value !== undefined && value !== '' && value !== null
  );

  useEffect(() => {
    if (isAddGroupState || isDefaultGroupState) {
      dispatch(orderAction.loadAllGroup());
    }
  }, [dispatch, isAddGroupState, isDefaultGroupState]);

  const handleCloseEditOrder = () => {
    dispatch(orderAction.setCloseEditOrderModal());
    dispatch(orderAction.loadOrdersAll(dto));
  };

  const handleCreateGroupState = (group_name: Group_nameDto) => {
    const isDuplicateGroup = allGroup?.some(group => group.group_group_name === group_name.group_name);
    if (isDuplicateGroup) {
      dispatch(orderAction.setIsDuplicate(true));
      setTimeout(() => dispatch(orderAction.setIsDuplicate(false)), 3000); // через 1 сек прибираємо текст
      return;
    }

    dispatch(orderAction.loadCreateGroup(group_name))
      .then(() => {
        dispatch(orderAction.setCreateGroup(true));
        resetCreateGroup();
        setTimeout(() => {
          dispatch(orderAction.setCreateGroup(false));
          dispatch(orderAction.setAddGroupState(true));
        }, 3000);
      });
  };

  const handleAddGroup = (data: { group_group_name: string }) => {
    const group_group_name = data.group_group_name;

    const group = allGroup && allGroup.find(value => value.group_group_name === group_group_name);
    if (!group) {
      dispatch(orderAction.setIsNoGroup(true));
      setTimeout(() => dispatch(orderAction.setIsNoGroup(false)), 1000);
      return;
    }

    if (findOneOrder.id !== null) {
      dispatch(orderAction.loadAddGroup({
        orderId: findOneOrder.id.toString(),
        group_id: group.group_id.toString()
      }));
      dispatch(orderAction.setIsGroupOrder(true));
      setTimeout(() => dispatch(orderAction.setIsGroupOrder(false)), 3000);
      return;
    }
  };

  const handleEditOrder = (updateOrdersReqDto: UpdateOrdersReqDto) => {
    const cleanedData = Object.fromEntries(
      Object.entries(updateOrdersReqDto).filter(([, value]) => value !== '' && value !== undefined)
    );

    if (findOneOrder.id !== null) {
      dispatch(orderAction.loadEditOrder({ orderId: findOneOrder.id, updateOrdersReqDto: cleanedData }));
    }

    reset();
  };

  return (
    <div style={{
      background: '#fff',
      padding: '20px',
      margin: '10px',
      borderRadius: '8px',
      width: '500px',
      boxShadow: '0 0 10px rgba(0,0,0,0.25)'
    }}>
      { isDefaultGroupState && (
        <form id={'createGroup'} onSubmit={handleSubmitCreateGroup(handleCreateGroupState)}>
          <label htmlFor={'group_name'}>Group</label>
          <input id={'group_name'} type={'text'} {...registerCreateGroup('group_name')} placeholder={'Group'} />
          <div>
            <button type={'submit'} disabled={!isValidCreateGroup}>
              ADD
            </button>
            <button type={'button'} onClick={
              () => dispatch(orderAction.setAddGroupState(true))}>
              SUBMIT
            </button>
          </div>
          { isDuplicate && <div><p>Група з такою назвою вже існує</p></div>}
          { isCreateGroup && <div><p>Група успішно створена</p></div>}
          </form>
      )}
      { isAddGroupState && (
        <form id={'addGroup'} onSubmit={handleSubmitAddGroup(handleAddGroup)}>
          <label htmlFor={'addGroupSelect'}>Group</label>
          <select id={'addGroupSelect'} {...registerAddGroup('group_group_name')}>
            <option value="">Select group</option>
            {allGroup &&
              allGroup.map(group => (
                <option key={group.group_id} value={group.group_group_name}>{group.group_group_name}</option>
              ))
         }
          </select>
          <div>
            <button type={'submit'}>ADD GROUP</button>
            <button type={'button'} onClick={() => dispatch(orderAction.setAddGroupState(false))}>
              BACK
            </button>
          </div>
          { isNoGroup && <div><p>Даної групи не існує</p></div>}
          { isGroupOrder && <div><p>Група успішно закріплена за заявкою</p></div>}
            </form>
            )}

            <form id={'editOrderForm'} onSubmit={handleSubmit(handleEditOrder)}>
              <label htmlFor={SortFieldEnum.NAME}>Name</label>
              <input id={SortFieldEnum.NAME} type={'text'} {...register(SortFieldEnum.NAME)} placeholder={'Name'} />

              <label htmlFor={SortFieldEnum.SURNAME}>Surname</label>
              <input type={'text'} {...register(SortFieldEnum.SURNAME)} placeholder={'Surname'} />

              <label htmlFor={SortFieldEnum.EMAIL}>Email</label>
              <input type={'email'} {...register(SortFieldEnum.EMAIL)} placeholder={'Email'} />

              <label htmlFor={SortFieldEnum.PHONE}>Phone</label>
              <input type={'text'} {...register(SortFieldEnum.PHONE)} placeholder={'Phone'} />

              <label htmlFor={SortFieldEnum.AGE}>Age</label>
              <input id={SortFieldEnum.AGE} type={'number'} {...register(SortFieldEnum.AGE)} placeholder={'Age'}
                     min={18} max={100} />

              <label htmlFor={SortFieldEnum.STATUS}>Status</label>
              <select {...register(SortFieldEnum.STATUS)}>
                <option value={''}>STATUS</option>
                <option value={StatusEnum.IN_WORK}>{StatusEnum.IN_WORK}</option>
                <option value={StatusEnum.NEW}>{StatusEnum.NEW}</option>
                <option value={StatusEnum.AGGRE}>{StatusEnum.AGGRE}</option>
                <option value={StatusEnum.DISAGGRE}>{StatusEnum.DISAGGRE}</option>
                <option value={StatusEnum.DUBBING}>{StatusEnum.DUBBING}</option>
              </select>

              <label htmlFor={SortFieldEnum.SUM}>Sum</label>
              <input type={'number'} {...register(SortFieldEnum.SUM)} placeholder={'Sum'} />

              <label htmlFor={SortFieldEnum.ALREADY_PAID}>Already paid</label>
              <input type={'number'} {...register(SortFieldEnum.ALREADY_PAID)} placeholder={'Already paid'} />

              <label htmlFor={SortFieldEnum.COURSE}>Course</label>
              <select {...register(SortFieldEnum.COURSE)}>
                <option value={''}>COURSE</option>
                <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
                <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
                <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
                <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
                <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
                <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
              </select>

              <label htmlFor={SortFieldEnum.COURSE_FORMAT}>Course format</label>
              <select {...register(SortFieldEnum.COURSE_FORMAT)}>
                <option value={''}>COURSE FORMAT</option>
                <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
                <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
              </select>

              <label htmlFor={SortFieldEnum.COURSE_TYPE}>Course type</label>
              <select {...register(SortFieldEnum.COURSE_TYPE)}>
                <option value={''}>COURSE_TYPE</option>
                <option value={CourseTypeEnum.PRO}>{CourseTypeEnum.PRO}</option>
                <option value={CourseTypeEnum.MINIMAL}>{CourseTypeEnum.MINIMAL}</option>
                <option value={CourseTypeEnum.PREMIUM}>{CourseTypeEnum.PREMIUM}</option>
                <option value={CourseTypeEnum.INCUBATOR}>{CourseTypeEnum.INCUBATOR}</option>
                <option value={CourseTypeEnum.VIP}>{CourseTypeEnum.VIP}</option>
              </select>

              <div>
                <button type={'submit'} disabled={!isSomeValueEdit}>SUBMIT</button>
                <button type={'button'} onClick={handleCloseEditOrder}>CLOSE</button>
              </div>
              {/*{ isEmptyField && <div><p>Заповніть хоча б одне поле для редагування</p></div>}*/}
              </form>
          </div>
            )
          }

export default EditOrderComponent;