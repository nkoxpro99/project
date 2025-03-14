import { isEmpty } from 'lodash';

import { useAuthStore } from '@/auth';
import { Unauthorized } from '@/components/Fallback';
import { Role } from '@/enums/role.enum';

import { GuardResolveFunc, GuardResolver } from './GuardResolver';

type AuthGuardProps = {
  requireRoles?: Role[];
};

export function AuthGuard({ requireRoles }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore();

  const resolve: GuardResolveFunc = () => {
    if (isAuthenticated) {
      if (requireRoles === undefined || isEmpty(requireRoles)) return { result: true };
      else {
        return user?.role && requireRoles.includes(user.role)
          ? { result: true }
          : { result: false, fallback: <Unauthorized /> };
      }
    } else {
      return { result: '/login' };
    }
  };

  return <GuardResolver guardFuncs={[resolve]}></GuardResolver>;
}
