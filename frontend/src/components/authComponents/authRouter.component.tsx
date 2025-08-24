import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch  } from '../../redux/store';
import { useEffect, useState } from 'react';
import { authAction } from '../../redux/slices/authSlice';
import { AuthResDto } from '../../module/auth_dto/authRes.dto';

export const AuthRouterComponent = () => {
  const dispatch = useAppDispatch();
  const [checking, setChecking] = useState(true);

  const isExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return !exp || exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const pair: AuthResDto | null = JSON.parse(localStorage.getItem('tokenPair') || 'null');
      const accessToken = pair?.tokens?.accessToken ?? null;
      const refreshToken = pair?.tokens?.refreshToken ?? null;

      try {
        if (!accessToken && !refreshToken) return;

        // якщо access протух → пробуємо оновити
        if (accessToken && isExpired(accessToken) && refreshToken && !isExpired(refreshToken)) {
          await dispatch(authAction.loadRefresh());
        }
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (checking) return null;

  const current: AuthResDto | null = JSON.parse(localStorage.getItem('tokenPair') || 'null');
  const refreshToken = current?.tokens?.refreshToken ?? null;

  // якщо refresh токен відсутній або протух → редірект на /auth/login
  if (!refreshToken || isExpired(refreshToken)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};