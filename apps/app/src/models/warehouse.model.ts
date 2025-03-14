import { WardValue } from '@/enums/ward-value.enum';

import { CommentModel } from './comment.model';
import { RentedWarehouseInfo } from './rented-warehouse.model';
import { WarehouseImage } from './warehouse-image.model';

export type WareHouseModel = {
  id: number;
  userId: number;
  name: string;
  ward: WardValue;
  address: string;
  price: number;
  area: number;
  createdDate: number;
  doors: number;
  floors: number;
  description: string;
  rented?: boolean;
  comments?: CommentModel[];
  images?: WarehouseImage[];
  rentedInfo?: RentedWarehouseInfo;
  status: WarehouseStatus;
  rejectedReason?: string;
};

export enum WarehouseStatus {
  Pending,
  Accepted,
  Rejected,
}

export const WarehouseLabel: Record<WarehouseStatus, string> = {
  [WarehouseStatus.Pending]: 'Đang chờ duyệt',
  [WarehouseStatus.Accepted]: 'Đã chấp thuận',
  [WarehouseStatus.Rejected]: 'Đã từ chối',
};

export type AddressModel = {
  address: string;
  position: AddressLocation;
};

export type AddressLocation = { lat: number; lng: number };
