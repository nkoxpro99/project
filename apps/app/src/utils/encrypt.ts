import CryptoJS from 'crypto-js';
import moment from 'moment';

import { CONTRACT_SECRET_KEY } from '@/libs/constants';

export function generateRandomAlphanumeric(length: number) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
}

export type GenerateContractHashOptions = {
  renterId: number;
  warehouseId: number;
  rentedDate: Date | string;
};

export function generateContractHash({ rentedDate, renterId, warehouseId }: GenerateContractHashOptions) {
  const key = generateRandomAlphanumeric(6);
  const dataToHash = `${renterId}.${warehouseId}.${moment(rentedDate).format('DD-MM-YYYY')}.${key}`;
  const hmacHash = CryptoJS.HmacSHA256(dataToHash, CONTRACT_SECRET_KEY);
  const hashHex = hmacHash.toString(CryptoJS.enc.Hex).slice(0, 30);
  return { key, hash: hashHex };
}
