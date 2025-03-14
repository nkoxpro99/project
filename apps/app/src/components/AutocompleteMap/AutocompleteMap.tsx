import { useEffect } from 'react';
import styled from 'styled-components';

async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const map = new Map(document.getElementById('map'), {
    center: { lat: 16.02298393469663, lng: 108.1880701495974 },
    zoom: 14,
    mapId: '4504f8b37365c3d0',
  });
  const marker = new AdvancedMarkerElement({
    map,
    position: { lat: 16.02298393469663, lng: 108.1880701495974 },
  });
}


export const AutocompleteMap = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  useEffect(() => {
    initMap();

    // initAutocomplete();
  }, []);

  return (
    <>
      <input className="controls" id="pac-input" placeholder="Search Box" type="text" />
      <MapContainer />
    </>
  );
};

const MapContainer = styled.div.attrs({ id: 'map' })`
  height: 100%;
`;

