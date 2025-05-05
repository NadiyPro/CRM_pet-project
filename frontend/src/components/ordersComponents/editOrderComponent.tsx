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

const EditOrderComponent = () => {
  const {handleSubmit, register, reset, formState:{isValid}} = useForm<UpdateOrdersReqDto>({mode: 'all', resolver: joiResolver(orderValidator)})
  const {findOneOrder} = useAppSelector((state) => state.orderStore)
  const dispatch = useAppDispatch();

  const handleEditOrder = (updateOrdersReqDto: UpdateOrdersReqDto) => {
    if(findOneOrder.id !== null){
      let orderId = findOneOrder.id;
      dispatch(orderAction.loadEditOrder({orderId, updateOrdersReqDto}))
    }
    reset()
  }

  const handleCloseEditOrder = () => {
    dispatch(orderAction.setCloseEditOrderModal())
  }

  return(
    <div>
      <form id={'groupForm'}>

      </form>
      <form id={'editOrderForm'} onSubmit={handleSubmit(handleEditOrder)}>
        <label htmlFor={SortFieldEnum.NAME}>Name</label>
        <input type={'text'} {...register(SortFieldEnum.NAME)} placeholder={'Name'} />

        <label htmlFor={SortFieldEnum.SURNAME}>Surname</label>
        <input type={'text'} {...register(SortFieldEnum.SURNAME)} placeholder={'Surname'} />

        <label htmlFor={SortFieldEnum.EMAIL}>Email</label>
        <input type={'email'} {...register(SortFieldEnum.EMAIL)} placeholder={'Email'} />

        <label htmlFor={SortFieldEnum.PHONE}>Phone</label>
        <input type={'text'} {...register(SortFieldEnum.PHONE)} placeholder={'Phone'} />

        <label htmlFor={SortFieldEnum.AGE}>Age</label>
        <input type={'number'} {...register(SortFieldEnum.AGE)} placeholder={'Age'} min={18} max={100} />

        <label htmlFor={SortFieldEnum.STATUS}>Status</label>
        <select {...register(SortFieldEnum.STATUS)}>
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
          <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
          <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
          <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
          <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
          <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
          <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
        </select>

        <label htmlFor={SortFieldEnum.COURSE_FORMAT}>Course format</label>
        <select {...register(SortFieldEnum.COURSE_FORMAT)}>
          <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
          <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
        </select>

        <label htmlFor={SortFieldEnum.COURSE_TYPE}>Course type</label>
        <select {...register(SortFieldEnum.COURSE_TYPE)}>
          <option value={CourseTypeEnum.PRO}>{CourseTypeEnum.PRO}</option>
          <option value={CourseTypeEnum.MINIMAL}>{CourseTypeEnum.MINIMAL}</option>
          <option value={CourseTypeEnum.PREMIUM}>{CourseTypeEnum.PREMIUM}</option>
          <option value={CourseTypeEnum.INCUBATOR}>{CourseTypeEnum.INCUBATOR}</option>
          <option value={CourseTypeEnum.VIP}>{CourseTypeEnum.VIP}</option>
        </select>

        <div>
          <button type={'submit'} disabled={!isValid}>SUBMIT</button>
          <button type={'button'} onClick={handleCloseEditOrder}>CANCEL</button>
        </div>
      </form>
    </div>
  )
}

export default EditOrderComponent;