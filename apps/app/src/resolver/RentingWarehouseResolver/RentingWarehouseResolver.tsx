import { createContext, useContext, useEffect, useState } from 'react';
import { Loading } from 'react-admin';
import { Outlet } from 'react-router-dom';

import { useAuthStore } from '@/auth';
import { UserModel } from '@/models/user.model';
import { WareHouseModel } from '@/models/warehouse.model';
import userService from '@/service/user-service';

import { useWarehouseResolver } from '../WarehouseResolver/WarehouseResolver';

type RentingWarehouseResolverType = {
  renter: UserModel;
  owner: UserModel;
  warehouse: WareHouseModel;
};

const RentingWarehouseResolverContext = createContext<RentingWarehouseResolverType | undefined>(undefined);

export function useRentingWarehouseResolver() {
  const context = useContext(RentingWarehouseResolverContext);

  if (context === undefined) throw Error(`RentingWarehouseResolver: The component is not inside the resolver`);

  return context;
}

export function RentingWarehouseResolver() {
  const { warehouse } = useWarehouseResolver();
  const { user } = useAuthStore();
  const [renter, setRenter] = useState<UserModel>();
  const [owner, setOwner] = useState<UserModel>();

  useEffect(() => {
    if (!!warehouse && !!user) {
      userService.get(warehouse.userId).then((data) => setOwner(data));
      userService.get(user.id).then((data) => setRenter(data));
    }
  }, [warehouse, user]);

  return (
    <>
      {!!renter && !!owner ? (
        <RentingWarehouseResolverContext.Provider value={{ renter, owner, warehouse }}>
          <Outlet />
        </RentingWarehouseResolverContext.Provider>
      ) : (
        <Loading />
      )}
    </>
  );
}
