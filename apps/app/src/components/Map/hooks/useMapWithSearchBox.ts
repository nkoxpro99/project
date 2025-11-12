/*
  Google Maps based SearchBox has been removed.
  This file now provides a no-op hook for backward compatibility during migration.
*/
import { useMemo } from 'react';

import { AddressLocation } from '@/models/warehouse.model';

type MapWithSearchBoxOptions = {
  mapElementId?: string;
  searchBoxElementId?: string;
  markerLocation?: AddressLocation;
};

type PlaceChangeAfterSearchPayload = {
  address?: string;
  position: AddressLocation;
  ward?: string;
};

export const useMapWithSearchBox = (_options?: MapWithSearchBoxOptions) => {
  const currentSearchPayload = useMemo<PlaceChangeAfterSearchPayload | undefined>(() => undefined, []);
  return { currentSearchPayload };
};
