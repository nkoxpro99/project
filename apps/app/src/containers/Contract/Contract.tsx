import { useEffect } from 'react';

import { useContract } from '@/hooks';
import { useWarehouseResolver } from '@/resolver/WarehouseResolver';

export function Contract() {
  const { warehouse } = useWarehouseResolver();
  const { viewContract } = useContract();

  useEffect(() => {
    if (warehouse.rented) viewContract({ containerId: 'contract', base64: warehouse.rentedInfo.contractBase64 });
  });

  return <div id="contract" style={{ height: '100vh', width: '100%s' }}></div>;
}
