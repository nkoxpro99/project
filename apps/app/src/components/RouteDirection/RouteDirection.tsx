import { useEffect } from 'react';
import styled from 'styled-components';

import { AddressLocation } from '@/models/warehouse.model';

type RouteDirectionProps = {
  from: string;
  to: string;
  location: AddressLocation;
};

const directionsRenderer = new google.maps.DirectionsRenderer({});
const directionsService = new google.maps.DirectionsService();

function calculateAndDisplayRoute(from: string, to: string) {
  directionsService
    .route({
      origin: {
        query: from,
      },
      destination: {
        query: to,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch(() => window.alert('Can not load the direction'));
}

export const RouteDirection = (props: RouteDirectionProps) => {
  const { from, to, location } = props;

  function initMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 13,
      center: location,
    });

    directionsRenderer.setMap(map);
  }

  useEffect(() => {
    if (!!from && !!to) {
      calculateAndDisplayRoute(from, to);
      initMap();
    }
  }, [from, to]);
  return (
    <>
      <MapContainer />
    </>
  );
};

const MapContainer = styled.div.attrs({ id: 'map' })`
  height: 550px;
  width: 100%;
`;
