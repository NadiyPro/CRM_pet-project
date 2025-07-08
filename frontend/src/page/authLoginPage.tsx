import { useForm } from 'react-hook-form';

import { AuthLoginDto } from '../module/auth_dto/authLogin.dto';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../redux/slices/authSlice';
import '../styles/styles.scss';


const AuthLoginPage = () => {
  const {handleSubmit, register, reset} = useForm<AuthLoginDto>();
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
    <div className={'baseLogin'}>
      <video autoPlay muted loop playsInline className={'baseLogin__video'}>
        <source src="/videoLogin.mp4" type="video/mp4" />
      </video>

      <div className={'baseLogin__contentLogin'}>
        <div className={'baseLogin__contentLogin__divLogin'}>
          <form className={'baseLogin__contentLogin__divLogin__form'} onSubmit={handleSubmit(dto)}>
            <label htmlFor={'email'}>Email</label>
            <input type={'email'} {...register('email')} required />

            <label htmlFor={'password'}>Password</label>
            <input type={'password'} {...register('password')} required />

            <button className={'baseLogin__contentLogin__divLogin__form__button'} type={'submit'}
                    disabled={loadingLogin}> {loadingLogin ? 'Loading...' : 'LOGIN'}</button>
          </form>
          {errorLogin && <div className={'errorLogin'}><p>{errorLogin}</p></div>}
        </div>

        <div className={'baseLogin__contentLogin__Hello'}>
          <p className={'baseLogin__contentLogin__Hello__p'}>H e l l o</p>
        </div>
      </div>
    </div>
  )
};

export default AuthLoginPage;