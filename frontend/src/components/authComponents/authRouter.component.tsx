import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch  } from '../../redux/store';
import { useEffect, useState } from 'react';
import { authAction } from '../../redux/slices/authSlice';
import { AuthResDto } from '../../module/auth_dto/authRes.dto';

export const AuthRouterComponent = () => {
  const dispatch = useAppDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const pair: AuthResDto | null = JSON.parse(localStorage.getItem('tokenPair') || 'null');
      const accessToken = pair?.tokens?.accessToken ?? null;
      const refreshToken = pair?.tokens?.refreshToken ?? null;

      try {
        if (!accessToken && !refreshToken) return;

        if (accessToken) {
          try {
            const { exp } = jwtDecode<{ exp: number }>(accessToken);
            if (!exp || exp * 1000 < Date.now()) {
              if (refreshToken) await dispatch(authAction.loadRefresh());
            }
          } catch {
            if (refreshToken) await dispatch(authAction.loadRefresh());
          }
        }
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (checking) {
    // щоб не було миготіння
    return null;
  }

  const current: AuthResDto | null = JSON.parse(localStorage.getItem('tokenPair') || 'null');
  const hasAccess = !!current?.tokens?.accessToken;
  const hasRefresh = !!current?.tokens?.refreshToken;

  if (!hasAccess && !hasRefresh) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};