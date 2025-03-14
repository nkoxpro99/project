import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Loading } from '@/components/Fallback';

import { useRefreshToken } from '../hooks';
import { useAuthStore } from '../store';

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!isAuthenticated) verifyRefreshToken();
    else setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{isLoading ? <Loading /> : <Outlet />}</div>;
};
