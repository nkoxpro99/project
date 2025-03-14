import { useAuthStore } from '@/auth';
import { Invalid } from '@/components/Fallback';
import { useWarehouseResolver } from '@/resolver/WarehouseResolver';

import { GuardResolveFunc, GuardResolver } from './GuardResolver';

export function RentedWarehouseGuard() {
  const { user } = useAuthStore();
  const { warehouse } = useWarehouseResolver();

  console.log(user, warehouse);

  const resolve: GuardResolveFunc = () => {
    if (warehouse.rented) {
      if (warehouse.userId === user?.id || warehouse.rentedInfo?.renterId === user?.id) return { result: true };
      else {
        return { result: false, fallback: <Invalid /> };
      }
    } else {
      return { result: true };
    }
  };

  return <GuardResolver guardFuncs={[resolve]}></GuardResolver>;
}
