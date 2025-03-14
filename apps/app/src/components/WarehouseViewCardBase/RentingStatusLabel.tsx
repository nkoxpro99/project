import { blue, green, red, yellow } from '@radix-ui/colors';
import styled from 'styled-components';

import { RentedWarehouseLabel, RentedWarehouseStatus } from '@/models/rented-warehouse.model';

import { Label } from '../Common/Label';

export type RentingStatusLabelProps = {
  status: RentedWarehouseStatus;
};

export function RentingStatusLabel({ status }: RentingStatusLabelProps) {
  const getColor = () => {
    switch (status) {
      case RentedWarehouseStatus.Waiting:
      case RentedWarehouseStatus.Canceling:
      case RentedWarehouseStatus.Renting:
        return blue.blue9;
      case RentedWarehouseStatus.Canceled:
        return yellow.yellow9;
      case RentedWarehouseStatus.Expired:
        return red.red9;
      case RentedWarehouseStatus.Confirmed:
      case RentedWarehouseStatus.Ended:
        return green.green9;
      default:
        return blue.blue9;
    }
  };

  return <Status color={getColor()}>{RentedWarehouseLabel[status]}</Status>;
}

const Status = styled(Label)`
  position: absolute;
  top: -12px;
  right: 20px;
`;
