import { WardValue } from '@/enums/ward-value.enum';

export function getWardFromMapWard(ward: string): WardValue {
  const find = Object.keys(wards).find((wv) => {
    const wardValue = wards[Number(wv) as Exclude<WardValue, WardValue.ALL>];
    return ward.includes(wardValue);
  });

  if (find !== undefined) return Number(find);
  else return 0;
}

type WardGetType = { [key in Exclude<WardValue, WardValue.ALL>]: string };

const wards: WardGetType = {
  [WardValue.CAM_LE]: 'Cẩm Lệ',
  [WardValue.HAI_CHAU]: 'Hải Châu',
  [WardValue.LIEN_CHIEU]: 'Liên Chiểu',
  [WardValue.NGU_HANH_SON]: 'Ngũ Hành Sơn',
  [WardValue.SON_TRA]: 'Sơn Trà',
  [WardValue.THANH_KHE]: 'Thanh Khê',
  [WardValue.HOA_VANG]: 'Hoà Vang',
  [WardValue.HOANG_SA]: 'Hoàng Sa',
};
