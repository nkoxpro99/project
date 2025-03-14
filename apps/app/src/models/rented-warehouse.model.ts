export type RentedWarehouseModel = {
  id: number;
  renterId: number;
  warehouseId: number;
  rentedDate: string;
  startDate: string;
  endDate: string;
  confirmDate: string;
  contractBase64: string;
  deposit: number;
  confirm: number;
  total: number;
  status: RentedWarehouseStatus;
};

export type RentedWarehouseInfo = {
  id: number;
  renterId: number;
  rentedDate: string;
  startDate: string;
  endDate: string;
  confirmDate: string;
  contractBase64: string;
  deposit: number;
  confirm: number;
  total: number;
  status: RentedWarehouseStatus;
};

export type CreateRentedWarehouseModel = Omit<RentedWarehouseModel, 'status' | 'confirmDate' | 'id'> & {
  depositPayment: string;
  hash: string;
};

export type CreateExtendRentingModel = {
  duration: number;
  extendDate: string;
  total: number;
  newEndDate: string;
  newContractBase64: string;
};

export enum RentedWarehouseStatus {
  None = 0,
  Waiting = 1,
  Renting = 2,
  Canceling = 3,
  Canceled = 4,
  Expired = 5,
  Ended = 6,
  Confirmed = 7,
}

type A = typeof RentedWarehouseStatus;

export const RentedWarehouseLabel: Record<RentedWarehouseStatus, string> = {
  [RentedWarehouseStatus.Canceled]: 'Đã hủy',
  [RentedWarehouseStatus.Canceling]: 'Đang yêu cầu hủy',
  [RentedWarehouseStatus.Confirmed]: 'Đã xác nhận thuê',
  [RentedWarehouseStatus.Ended]: 'Đã thuê xong',
  [RentedWarehouseStatus.Expired]: 'Hết hạn',
  [RentedWarehouseStatus.None]: 'Không',
  [RentedWarehouseStatus.Renting]: 'Đang thuê',
  [RentedWarehouseStatus.Waiting]: 'Đang chờ thanh toán',
};
