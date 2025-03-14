import { useAuthStore } from '@/auth';
import { Invalid } from '@/components/Fallback';
import { WarehouseStatus } from '@/models/warehouse.model';
import { useWarehouseResolver } from '@/resolver/WarehouseResolver';

import { GuardResolveFunc, GuardResolver } from './GuardResolver';

export function WarehouseGuard() {
  const { user } = useAuthStore();
  const { warehouse } = useWarehouseResolver();

  const resolve: GuardResolveFunc = () => {
    if (warehouse.status === WarehouseStatus.Accepted || warehouse.userId === user?.id) {
      return { result: true };
    } else {
      return { result: false, fallback: <Invalid /> };
    }
  };

  return <GuardResolver guardFuncs={[resolve]}></GuardResolver>;
}
