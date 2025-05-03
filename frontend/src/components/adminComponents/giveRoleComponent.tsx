import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { GiveRoleDto } from '../../module/giveRole.dto';
import { joiResolver } from '@hookform/resolvers/joi';
import giveRoleValidator from '../../validator/giveRole.validator';
import { adminAction } from '../../redux/slices/adminSlice';

const GiveRoleComponent = () => {
  const {handleSubmit, register, reset, formState:{isValid}} = useForm<GiveRoleDto>({mode: 'all', resolver: joiResolver(giveRoleValidator)})
  const {statusGiveRole, isGiveRoleModalOpen } = useAppSelector((state) => state.adminStore)
  const dispatch = useAppDispatch();

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
    <div>
      <button type={'button'} onClick={handleRoleModalOpen}>CREATE</button>

      {isGiveRoleModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999}}>
        <div style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
          boxShadow: '0 0 10px rgba(0,0,0,0.25)'
        }}>
          <form onSubmit={handleSubmit(handleRole)}>
            <label htmlFor={'email'}>Email</label>
            <input type={'email'} {...register('email')} required />

            <label htmlFor={'name'}>Name</label>
            <input type={'text'} {...register('name')} required />

            <label htmlFor={'surname'}>Surname</label>
            <input type={'text'} {...register('surname')} required />

            <div>
              <button type={'submit'} disabled={!isValid}>CREATE</button>
              <button type={'button'} onClick={handleCloseGiveRoleModal}>CANCEL</button>
            </div>
          </form>
          <p>{statusGiveRole}</p>
        </div>
        </div>
      )
      }
    </div>
  )
}

export default GiveRoleComponent;