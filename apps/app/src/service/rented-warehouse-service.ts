import { produce } from 'immer';

import { MyWarehouseDetailsModel } from '@/models/my-warehouse-details.model';
import { CreateExtendRentingModel } from '@/models/rented-warehouse.model';
import { WareHouseModel } from '@/models/warehouse.model';

import { Service } from './service';

class RentedWarehouseService extends Service<WareHouseModel, WareHouseModel, WareHouseModel> {
  constructor() {
    super();
    this.setBaseURL('rentedWarehouse');
    this.setDefaultRequestPayload(
      produce((payload) => {
        payload.includes?.push('Warehouse', 'Warehouse.Images', 'Extends');
      }),
    );
  }

  async getRenterWarehouses(userId: string | number) {
    const response = await this.api.post<MyWarehouseDetailsModel[]>(`renter/${userId}`, this.defaultRequestPayload);

    return response.data;
  }

  async getOwnerWarehouses(userId: string | number) {
    const response = await this.api.post<MyWarehouseDetailsModel[]>(`owner/${userId}`, this.defaultRequestPayload);

    return response.data;
  }

  async confirmWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`confirm/${rentedWarehouseId}`);
  }

  async requestCancelWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`cancel_request/${rentedWarehouseId}`, {}, { withCredentials: true });
  }

  async confirmCancelWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`cancel_confirm/${rentedWarehouseId}`, {}, { withCredentials: true });
  }

  async cancelWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`cancel/${rentedWarehouseId}`, {}, { withCredentials: true });
  }

  async extendRenting(rentedWarehouseId: string | number, extend: CreateExtendRentingModel) {
    await this.api.put(`extend/${rentedWarehouseId}`, extend, { withCredentials: true });
  }
}

export default new RentedWarehouseService();
