import { Navigate, Outlet } from 'react-router-dom';

const AuthRouterComponent = () => {
  const tokenPair = localStorage.getItem('tokenPair');
  const isValid = !!tokenPair && JSON.parse(tokenPair).tokens.accessToken;

  if (!isValid) {
    console.log('error  with AuthRouterComponent:', isValid )
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />;
};

export default AuthRouterComponent;

