import { useForm } from 'react-hook-form';
import { AuthPasswordDto } from '../module/authPassword.dto';
import { joiResolver } from '@hookform/resolvers/joi';
import authPasswordValidator from '../validator/authPassword.validator';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { authAction } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthPasswordPage = () => {
  const {handleSubmit, register, reset, formState: {isValid}} = useForm<AuthPasswordDto>({mode: 'all', resolver: joiResolver(authPasswordValidator)})
  const {refreshToken} = useAppSelector((state) => state.adminStore.authTokens.tokens)
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
    const isValidPassword =  await dispatch(authAction.loadActivatePassword({ authPasswordDto: {...authPasswordDto, deviceId: getDeviceId() }, refreshToken })).unwrap();
    if (isValidPassword) {
      navigate(`/orders`);
    } else {
      reset();
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit(dtoPassword)}>
        <label htmlFor={'password'}>Password</label>
        <input type={'password'} {...register('password')} required/>

        <label htmlFor={'confirm_password'}>Confirm password</label>
        <input type={'password'} {...register('confirm_password')} required/>

        <button type={'submit'} disabled={!isValid || loadingPassword}> {loadingPassword ? 'Loading...' : 'ACTIVATE'}</button>
      </form>
      {errorPassword && <p className="errorPassword">{errorPassword}</p>}
    </div>
  )

};

export default AuthPasswordPage;