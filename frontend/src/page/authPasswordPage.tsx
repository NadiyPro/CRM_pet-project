import { useForm } from 'react-hook-form';
import { AuthPasswordDto } from '../module/auth_dto/authPassword.dto';
import { joiResolver } from '@hookform/resolvers/joi';
import authPasswordValidator from '../validator/authPassword.validator';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { authAction } from '../redux/slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';

const AuthPasswordPage = () => {
  const {handleSubmit, register, reset, formState: {isValid}} = useForm<AuthPasswordDto>({mode: 'all', resolver: joiResolver(authPasswordValidator)})
  const { token } = useParams();
  const {loadingPassword, errorPassword} = useAppSelector((state) => state.authStore);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('deviceId')
    if(!deviceId){
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId',deviceId)
    }
    return deviceId;
  }

  const dtoPassword = async (authPasswordDto: AuthPasswordDto) => {
    if (!token) return; // ✅ обробка ситуації, коли token не передано
    const isValidPassword = await dispatch(authAction.loadActivatePassword({
      authPasswordDto: { ...authPasswordDto, deviceId: getDeviceId() },
      token,
    })).unwrap();

    if (isValidPassword) {
      navigate('/auth/login');
    } else {
      reset();
    }
  };

  return(
    <div className={'basePassword'}>
      <div  className={'baseLogin__contentLogin__divLogin'}>
        <form className={'baseLogin__contentLogin__divLogin__form'} onSubmit={handleSubmit(dtoPassword)}>
          <label htmlFor={'password'}>Password</label>
          <input className={'basePassword__password_confirm_password'} type={'password'} {...register('password')} required/>

          <label htmlFor={'confirm_password'}>Confirm password</label>
          <input className={'basePassword__password_confirm_password'} type={'password'} {...register('confirm_password')} required/>

          <button className={'baseLogin__contentLogin__divLogin__form__button'} type={'submit'} disabled={!isValid || loadingPassword}> {loadingPassword ? 'Loading...' : 'ACTIVATE'}</button>
        </form>
        {errorPassword && <div className="errorLogin"><p>{errorPassword}</p></div>}
      </div>
    </div>
  )

};

export default AuthPasswordPage;