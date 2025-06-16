import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { GiveRoleDto } from '../../module/giveRole.dto';
import { joiResolver } from '@hookform/resolvers/joi';
import giveRoleValidator from '../../validator/giveRole.validator';
import { adminAction } from '../../redux/slices/adminSlice';
// import { useNavigate } from 'react-router-dom';

const GiveRoleComponent = () => {
  const {handleSubmit, register, reset, formState:{isValid}} = useForm<GiveRoleDto>({mode: 'all', resolver: joiResolver(giveRoleValidator)})
  const {statusGiveRole, isGiveRoleModalOpen } = useAppSelector((state) => state.adminStore)
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const handleRole = (dtoRole:GiveRoleDto) => {
    dispatch(adminAction.loadGiveRole(dtoRole));
    reset(); // скидуємо значення після сабміту
  }

  const handleRoleModalOpen = () => {
    dispatch(adminAction.setOpenGiveRoleModal())
  }

  const handleCloseGiveRoleModal = () => {
    dispatch(adminAction.setCloseGiveRoleModal())
  }

  return(
    <div className={'divMainLayout__outlet__adminPage__giveRoleComponent'}>
      <button className={'divMainLayout__outlet__adminPage__giveRoleComponent__button'} type={'button'} onClick={handleRoleModalOpen}>CREATE</button>

      {isGiveRoleModalOpen && (
        <div className={'divMainLayout__outlet__adminPage__giveRoleComponent__baseGiveRoleModalOpen'}>
        <div  className={'divMainLayout__outlet__adminPage__giveRoleComponent__baseGiveRoleModalOpen__colorGiveRoleModalOpen'}>
          <div className={'divMainLayout__outlet__adminPage__giveRoleComponent__baseGiveRoleModalOpen__colorGiveRoleModalOpen__divGiveRoleModalOpen'}>
            <form
              className={'divMainLayout__outlet__adminPage__giveRoleComponent__baseGiveRoleModalOpen__colorGiveRoleModalOpen__divGiveRoleModalOpen__form'}
              onSubmit={handleSubmit(handleRole)}>
              <label htmlFor={'email'}><b>Email</b></label>
              <input type={'email'} {...register('email')} placeholder={'Email'} required />

              <label htmlFor={'name'}><b>Name</b></label>
              <input type={'text'} {...register('name')} placeholder={'Name'} required />

              <label htmlFor={'surname'}><b>Surname</b></label>
              <input type={'text'} {...register('surname')} placeholder={'Surname'} required />

              <div className={'divMainLayout__outlet__adminPage__giveRoleComponent__baseGiveRoleModalOpen__colorGiveRoleModalOpen__divGiveRoleModalOpen__form__divButton'}>
                <button
                  className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'}
                  type={'submit'} disabled={!isValid}>
                  CREATE
                </button>
                <button
                  className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'}
                  type={'button'} onClick={handleCloseGiveRoleModal}>
                  CANCEL
                </button>
              </div>

              <div><p>{statusGiveRole}</p></div>
            </form>
          </div>
        </div>
        </div>
      )
      }
    </div>
  )
}

export default GiveRoleComponent;