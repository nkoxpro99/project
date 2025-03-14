import { WardValue } from '../enums/ward-value.enum';
import { SelectOption } from '../models/select-option.model';
import { WardLabel } from './ward-label.constant';

export const WARD_OPTIONS: SelectOption[] = [
  {
    label: WardLabel[WardValue.ALL],
    value: WardValue.ALL.toString(),
  },
  {
    label: WardLabel[WardValue.CAM_LE],
    value: WardValue.CAM_LE.toString(),
  },
  {
    label: WardLabel[WardValue.HAI_CHAU],
    value: WardValue.HAI_CHAU.toString(),
  },
  {
    label: WardLabel[WardValue.LIEN_CHIEU],
    value: WardValue.LIEN_CHIEU.toString(),
  },
  {
    label: WardLabel[WardValue.NGU_HANH_SON],
    value: WardValue.NGU_HANH_SON.toString(),
  },
  {
    label: WardLabel[WardValue.SON_TRA],
    value: WardValue.SON_TRA.toString(),
  },
  {
    label: WardLabel[WardValue.THANH_KHE],
    value: WardValue.THANH_KHE.toString(),
  },
  {
    label: WardLabel[WardValue.HOA_VANG],
    value: WardValue.HOA_VANG.toString(),
  },
  {
    label: WardLabel[WardValue.HOANG_SA],
    value: WardValue.HOANG_SA.toString(),
  },
];
