import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import authLoginValidator from '../validator/authLogin.validator';
import { AuthLoginDto } from '../module/authLogin.dto';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authAction } from '../redux/slices/authSlice';

const AuthLoginPage = () => {
  const {handleSubmit, register, formState: {isValid}} = useForm<AuthLoginDto>({ mode: 'all', resolver: joiResolver(authLoginValidator) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  const dto = async (data: AuthLoginDto) => {
    try {
      setLoading(true);
      setError(null);
      const isValid = await dispatch(authAction.loadLogin({ ...data, deviceId: getDeviceId() })).unwrap();
      if (isValid) {
        navigate(`/`);
      }
    } catch (e) {
      setLoading(false);
      setError('Користувач за вказаними даними не зареєстрований. Будь ласка, перевірте коректність введених даних.');
    }
  };

  return(
    <div className={'divLogin'}>
      <form onSubmit={handleSubmit(dto)}>
        <label htmlFor={'email'}>Email</label>
        <input type={'email'} {...register('email')}/>
        <label htmlFor={'password'}>Password</label>
        <input type={'password'} {...register('password')}/>
        <button type="submit" disabled={!isValid || loading}> {loading ? 'Loading...' : 'LOGIN'}</button>
      </form>
      {error && <div className="errorLogin">{error}</div>}
    </div>
  )
};

export default AuthLoginPage;