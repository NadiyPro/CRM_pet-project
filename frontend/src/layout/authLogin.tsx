import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import authLoginValidator from '../validator/authLogin.validator';
import { all } from 'axios';

const AuthLoginPage = () => {
  const {handleSubmit, register, formState: { errors, isValid}} = useForm({ mode: 'all', resolver: joiResolver(authLoginValidator) });
  return(
    <div>

    </div>
  )
};

export default AuthLoginPage;