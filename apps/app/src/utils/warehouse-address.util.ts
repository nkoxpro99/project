import { AddressLocation, AddressModel } from '@/models/warehouse.model';

export function resolveAddress(address: string | undefined): string | undefined {
  if (!address) return;

  try {
    return (JSON.parse(address) as AddressModel).address;
  } catch {
    return address;
  }
}

export function resolveLocation(address: string | undefined): AddressLocation | undefined {
  if (!address) return;

  try {
    console.log(address);
    console.log(JSON.parse(address) as AddressModel);
    return (JSON.parse(address) as AddressModel).position;
  } catch {
    return;
  }
}
