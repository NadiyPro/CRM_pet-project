import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import authLoginValidator from '../validator/authLogin.validator';
import { AuthLoginModule } from '../module/authLoginModule';
import { useAppDispatch } from '../redux/store';
import { loadLogin } from '../redux/reducers/loadLogin';

const AuthLoginPage = () => {
  const {handleSubmit, register, formState: { errors, isValid}} = useForm<AuthLoginModule>({ mode: 'all', resolver: joiResolver(authLoginValidator) });
  const dispatch = useAppDispatch();

  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  const dto = (data: AuthLoginModule) => {
    dispatch(loadLogin({ ...data, deviceId: getDeviceId() }));
  };

  // const dto: SubmitHandler<AuthLoginModule> = (data) => {
  //   const fullData = { ...data, deviceId: getDeviceId() };
  //   dispatch(loadLogin(fullData));
  // };
  return(
    <div>
      <form onSubmit={handleSubmit(dto)}>
        <label htmlFor={'email'}>Email</label>
        <input type={'email'} {...register('email')}/>
        <label htmlFor={'password'}>Password</label>
        <input type={'password'} {...register('password')}/>
        <button type="submit" disabled={!isValid}>LOGIN</button>
      </form>
      {!isValid && (
        <p>
          Користувач за вказаними даними не зареєстрований. Будь ласка, перевірте коректність введених даних.
        </p>
      )}
    </div>
  )
};

export default AuthLoginPage;