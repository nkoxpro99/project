import { WardValue } from '@/enums/ward-value.enum';

export const WardLabel: { [key in WardValue]: string } = {
  [WardValue.ALL]: 'Tất cả',
  [WardValue.CAM_LE]: 'Quận Cẩm Lệ',
  [WardValue.HAI_CHAU]: 'Quận Hải Châu',
  [WardValue.LIEN_CHIEU]: 'Quận Liên Chiểu',
  [WardValue.NGU_HANH_SON]: 'Quận Ngũ Hành Sơn',
  [WardValue.SON_TRA]: 'Quận Sơn Trà',
  [WardValue.THANH_KHE]: 'Quận Thanh Khê',
  [WardValue.HOA_VANG]: 'Huyện Hoà Vang',
  [WardValue.HOANG_SA]: 'Huyện Hoàng Sa',
};
