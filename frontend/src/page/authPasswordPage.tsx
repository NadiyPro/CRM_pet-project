import { useForm } from 'react-hook-form';
import { AuthPasswordDto } from '../module/authPassword.dto';
import { joiResolver } from '@hookform/resolvers/joi';
import authPasswordValidator from '../validator/authPassword.validator';
import { useAppDispatch, useAppSelector } from '../redux/store';

const AuthPasswordPage = () => {
  const {handleSubmit, register, formState: {isValid}} = useForm<AuthPasswordDto>({mode: 'all', resolver: joiResolver(authPasswordValidator)})
  const {refresh} = useAppSelector((state) => state.adminStore.authTokens.tokens)
  const {loadingPassword, errorPassword} = useAppSelector((state) => state.authStore);
  const dispatch = useAppDispatch()

  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('deviceId')
    if(!deviceId){
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId',deviceId)
    }
    return deviceId;
  }

  const dtoPassword = async (authPasswordDto: AuthPasswordDto) => {
    // setLoadingPassword(true);
    // setErrorPassword(null);
  }

  // const dtoPassword = (authPasswordDto) => {
  //   dispatch(authAction.loadActivatePassword({ refresh, authPasswordDto }))
  // }

  return(
    <div>
      <form onSubmit={handleSubmit(dtoPassword)}>
        <label htmlFor={'password'}>Password</label>
        <input type={'password'} {...register('password')} />
        <label htmlFor={'confirm_password'}>Confirm password</label>
        <input type={'password'} {...register('confirm_password')} />
        <button type="submit" disabled={!isValid || loadingPassword}> {loadingPassword ? 'Loading...' : 'ACTIVATE'}</button>
      </form>
      {errorPassword && <div className="errorPassword">{errorPassword}</div>}
    </div>
  )

};

export default AuthPasswordPage;