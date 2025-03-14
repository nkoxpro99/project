import { useEffect } from 'react';

import { AddressLocation } from '@/models/warehouse.model';

import { MapContainer } from './MapSearchBoxItem';

async function initMap(lat: number, lng: number) {
  const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;
  const map = new Map(document.getElementById('map') as HTMLElement, {
    center: { lat, lng },
    zoom: 14,
    mapId: '4504f8b37365c3d0',
  });
  const marker = new AdvancedMarkerElement({
    map,
    position: { lat, lng },
  });
}

type MapViewProps = {
  location?: AddressLocation;
};

export const MapView = (props: MapViewProps) => {
  const { location } = props;

  useEffect(() => {
    if (location) initMap(location?.lat, location?.lng);
  }, [location]);

  return <MapContainer />;
};
