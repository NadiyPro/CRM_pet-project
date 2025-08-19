import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch  } from '../../redux/store';
import { useEffect, useState } from 'react';
import { authAction } from '../../redux/slices/authSlice';
import { AuthResDto } from '../../module/auth_dto/authRes.dto';


// const AuthRouterComponent = () => {
//   const tokenPair = localStorage.getItem('tokenPair');
//   const isValid = !!tokenPair && JSON.parse(tokenPair).tokens.accessToken;
//
//   if (!isValid) {
//     console.log('error  with AuthRouterComponent:', isValid )
//     return <
//
//     Navigate to="/auth/login" replace />
//   }
//
//   return <Outlet />;
// };
//
// export default AuthRouterComponent;
//

// export const AuthRouterComponent = () => {
//   const dispatch = useAppDispatch();
//   const { isValidRefresh } = useAppSelector((state) => state.authStore);
//   const [checking, setChecking] = useState(true);
//
//   const isTokenExpired = (token: string): boolean => {
//     try {
//       const decoded: { exp: number } = jwtDecode(token);
//       return !decoded?.exp || decoded.exp * 1000 < Date.now();
//     } catch {
//       return true;
//     }
//   };
//
//   useEffect(() => {
//     const checkToken = async () => {
//       const tokenPair = localStorage.getItem('tokenPair');
//       const accessToken = tokenPair ? JSON.parse(tokenPair).tokens.accessToken : null;
//
//       if (!accessToken) {
//         setChecking(false);
//         return;
//       }
//
//       if (isTokenExpired(accessToken)) {
//         await dispatch(authAction.loadRefresh());
//       }
//       setChecking(false);
//     };
//
//     checkToken();
//   }, [dispatch]);
//
//   if (!checking && !isValidRefresh) {
//     return <Navigate to="/auth/login" replace />;
//   }
//
//   return <Outlet />;
// };
// export default AuthRouterComponent;

// export const AuthRouterComponent = () => {
//   const dispatch = useAppDispatch();
//   // const { isValidRefresh } = useAppSelector((state) => state.authStore);
//   const [checking, setChecking] = useState(true);
//
//   const tokenPair = localStorage.getItem('tokenPair');
//   const refreshToken = tokenPair ? JSON.parse(tokenPair).tokens.refreshToken : null
//
//   useEffect(() => {
//     const checkToken = async () => {
//       const raw = localStorage.getItem('tokenPair');
//       const pair: AuthResDto | null = raw ? JSON.parse(raw) : null;
//       const accessToken = pair?.tokens.accessToken ?? null;
//       const refreshToken = pair?.tokens.refreshToken ?? null;
//
//       try {
//         if (!accessToken && refreshToken) {
//           await dispatch(authAction.loadRefresh());
//           return;
//         }
//         if (!accessToken && !refreshToken) return;
//         const decoded: { exp: number } = jwtDecode(accessToken as string);
//         if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
//           await dispatch(authAction.loadRefresh());
//         }
//       } finally {
//         setChecking(false);
//       }
//     };
//     checkToken();
//   }, [dispatch]);
//
//   if (!checking && !refreshToken) {
//     return <Navigate to="/auth/login" replace />;
//   }
//
//   return <Outlet />;
// };
// export default AuthRouterComponent;
// export const AuthRouterComponent = () => {
//   const dispatch = useAppDispatch();
//   const [checking, setChecking] = useState(true);
//
//   useEffect(() => {
//     const checkToken = async () => {
//       const raw = localStorage.getItem('tokenPair');
//       const pair: AuthResDto | null = raw ? JSON.parse(raw) : null;
//       const accessToken = pair?.tokens.accessToken ?? null;
//       const refreshToken = pair?.tokens.refreshToken ?? null;
//
//       try {
//         // немає access, але є refresh → одразу пробуємо рефреш
//         if (!accessToken && refreshToken) {
//           await dispatch(authAction.loadRefresh());
//           return;
//         }
//         // немає жодного токена → нехай нижче редіректить на логін
//         if (!accessToken && !refreshToken) return;
//
//         // access є → перевіряємо експайр
//         const decoded: { exp: number } = jwtDecode(accessToken as string);
//         if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
//           await dispatch(authAction.loadRefresh());
//         }
//       } finally {
//         setChecking(false);
//       }
//     };
//
//     checkToken();
//   }, [dispatch]);
//
//   if (!checking) {
//     const pair: AuthResDto | null = JSON.parse(localStorage.getItem('tokenPair') || 'null');
//     const hasRefresh = !!pair?.tokens?.refreshToken;
//     if (!hasRefresh) return <Navigate to="/auth/login" replace />;
//   }
//
//   return <Outlet />;
// };
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
        // немає access, але є refresh → одразу рефреш
        if (!accessToken && refreshToken) {
          await dispatch(authAction.loadRefresh());
          return;
        }
        // немає жодного токена → нехай нижче редіректить на логін
        if (!accessToken && !refreshToken) return;

        // access є → перевіряємо експайр або невалідний формат
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

    return () => { mounted = false; };
  }, [dispatch]);

  if (checking) {
    // можна показати спіннер/скелет, щоб не було миготіння
    return null;
  }

  // ВАЖЛИВО: перечитуємо актуальний localStorage після можливого refresh
  const current: AuthResDto | null = JSON.parse(localStorage.getItem('tokenPair') || 'null');
  const hasRefresh = !!current?.tokens?.refreshToken;
  if (!hasRefresh) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
};