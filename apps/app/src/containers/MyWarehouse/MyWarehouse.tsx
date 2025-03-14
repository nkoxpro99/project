import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { Tabs } from '@/components/Common/Tabs';
import { MyWarehouseViewCardType } from '@/components/MyWarehouseViewCard';
import { Role } from '@/enums/role.enum';
import { RentedWarehouseStatus } from '@/models/rented-warehouse.model';
import { WareHouseModel, WarehouseStatus } from '@/models/warehouse.model';
import { useMyWarehouseStore } from '@/store/my-warehouse.store';

import { MyWarehouseCardList } from './MyWarehouseCardList';

const rentingStatusWeight: Record<RentedWarehouseStatus, number> = {
  [RentedWarehouseStatus.Waiting]: 1,
  [RentedWarehouseStatus.Confirmed]: 2,
  [RentedWarehouseStatus.Renting]: 3,
  [RentedWarehouseStatus.Ended]: 4,
  [RentedWarehouseStatus.Canceling]: 5,
  [RentedWarehouseStatus.Expired]: 6,
  [RentedWarehouseStatus.Canceled]: 7,
  [RentedWarehouseStatus.None]: 8,
};

export const MyWarehouse = () => {
  const { user } = useAuthStore();
  const { fetchMyWarehouses, reset, ownWarehousesLoading, rentedWarehouses, ownWarehouse, rentedWarehousesLoading } =
    useMyWarehouseStore();

  useEffect(() => {
    fetchMyWarehouses(user);

    return () => {
      reset();
    };
  }, []);

  const sortByRentingStatus = (a: WareHouseModel, b: WareHouseModel) => {
    if (!a.rentedInfo && !b.rentedInfo) {
      return 0;
    } else if (!a.rentedInfo) {
      return 1;
    } else if (!b.rentedInfo) {
      return -1;
    } else {
      return rentingStatusWeight[a.rentedInfo.status] - rentingStatusWeight[b.rentedInfo.status];
    }
  };

  const renderNoContent = () => {
    return (
      <NothingContainer>
        <h2>Chưa có gì ở đây</h2>
      </NothingContainer>
    );
  };

  const renderMyList = () => {
    if (user?.role === Role.Renter)
      return (
        <MyWarehouseCardList
          fallback={renderNoContent()}
          loading={rentedWarehousesLoading}
          type={MyWarehouseViewCardType.RenterRentingHistory}
          warehouses={rentedWarehouses.sort(sortByRentingStatus)}
        />
      );
    else if (user?.role === Role.Owner)
      return (
        <MyWarehouseTabs
          tabs={[
            {
              tab: 'Kho bãi',
              content: (
                <MyWarehouseCardList
                  fallback={renderNoContent()}
                  loading={ownWarehousesLoading}
                  type={MyWarehouseViewCardType.Owning}
                  warehouses={ownWarehouse.filter((w) => w.status === WarehouseStatus.Accepted)}
                />
              ),
            },
            {
              tab: 'Lịch sử',
              content: (
                <MyWarehouseCardList
                  fallback={renderNoContent()}
                  loading={rentedWarehousesLoading}
                  type={MyWarehouseViewCardType.OwnerRentingHistory}
                  warehouses={rentedWarehouses.sort(sortByRentingStatus)}
                />
              ),
            },
            {
              tab: 'Trạng thái duyệt bài',
              content: (
                <MyWarehouseCardList
                  fallback={renderNoContent()}
                  loading={ownWarehousesLoading}
                  type={MyWarehouseViewCardType.RequestHistory}
                  warehouses={ownWarehouse}
                />
              ),
            },
          ]}
        ></MyWarehouseTabs>
      );
  };

  return (
    <MyWarehouseRoot>
      {user?.role === Role.Owner && (
        <CreateWareHouse>
          <Link to="/create">
            <Button>Tạo kho bãi</Button>
          </Link>
        </CreateWareHouse>
      )}
      {renderMyList()}
    </MyWarehouseRoot>
  );
};

const MyWarehouseRoot = styled.div`
  --tabs-width: 1280px;
`;

const MyWarehouseTabs = styled(Tabs)`
  width: var(--tabs-width);
`;

const CreateWareHouse = styled.div`
  text-align: right;
`;

const NothingContainer = styled.div`
  color: gray;
  text-align: center;
`;
