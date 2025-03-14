import moment from 'moment';

import { RentedWarehouseInfo, RentedWarehouseStatus } from '@/models/rented-warehouse.model';

import { DateProgress } from '../Common/DateProgress';

export type RentedWarehouseProgressProps = {
  rentedInfo?: RentedWarehouseInfo;
};

export function RentedWarehouseProgress({ rentedInfo }: RentedWarehouseProgressProps) {
  const renderProgress = () => {
    if (rentedInfo) {
      const { startDate, endDate, rentedDate, status } = rentedInfo;

      switch (status) {
        case RentedWarehouseStatus.Waiting:
          return (
            <DateProgress
              daysLeftTemplate={'Còn {0} để thanh toán hợp đồng'}
              endDate={startDate}
              startDate={rentedDate}
            ></DateProgress>
          );
        case RentedWarehouseStatus.Renting:
          return (
            <DateProgress
              daysLeftTemplate={'Còn {0} trước khi hết hạn hợp đồng'}
              endDate={endDate}
              startDate={startDate}
            ></DateProgress>
          );
        case RentedWarehouseStatus.Confirmed:
          return (
            <DateProgress
              daysLeftTemplate={'Còn {0} trước khi chính thức thuê'}
              endDate={startDate}
              startDate={rentedDate}
            ></DateProgress>
          );
      }
    }
  };

  return <>{renderProgress()}</>;
}
