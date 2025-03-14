import { WareHouseModel } from "./warehouse.model";

export type MyWarehouseDetailsModel = WareHouseModel & {
    endDate: number;
    daysLeft: number;
}
