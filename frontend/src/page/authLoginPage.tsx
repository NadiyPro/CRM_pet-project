import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import authLoginValidator from '../validator/authLogin.validator';
import { AuthLoginDto } from '../module/authLogin.dto';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../redux/slices/authSlice';
import '../styles/styles.scss';

const AuthLoginPage = () => {
  const {handleSubmit, register, reset, formState: {isValid}} = useForm<AuthLoginDto>({ mode: 'all', resolver: joiResolver(authLoginValidator) });
  const {loadingLogin, errorLogin} = useAppSelector((state) => state.authStore);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  const dto = async (data: AuthLoginDto) => {
      const isValid = await dispatch(authAction.loadLogin({ ...data, deviceId: getDeviceId() })).unwrap();
      if (isValid) {
        navigate('/orders');
      } else {
        reset();
      }
  };

  return(
    <div className={'divLogin'}>
      <form className={'divLogin__form'} onSubmit={handleSubmit(dto)}>
        <label htmlFor={'email'}>Email</label>
        <input type={'email'} {...register('email')} required/>

        <label htmlFor={'password'}>Password</label>
        <input type={'password'} {...register('password')} required/>

        <button type={'submit'} disabled={!isValid || loadingLogin}> {loadingLogin ? 'Loading...' : 'LOGIN'}</button>
      </form>
      {errorLogin && <div><p className="errorLogin">{errorLogin}</p></div>}
    </div>
  )
};

export default AuthLoginPage;