import { useEffect } from 'react';
import styled from 'styled-components';

import { MapContainer, MapSearchBoxInput } from './MapSearchBoxItem';

function initAutocomplete(setValueCb?: (data: PlaceChangeAfterSearchPayload) => void) {
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 16.06571795654765, lng: 108.2169500477852 },
    zoom: 13,
    mapTypeId: 'roadmap',
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById('pac-input') as HTMLInputElement;
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', () => {
    const mapBounds = map.getBounds();
    mapBounds && searchBox.setBounds(mapBounds);
  });

  let markers: any[] = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();

    if (!places || places.length === 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    let name = '';

    places.forEach((place: any) => {
      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry');
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      name = place.name;
    });

    const lat = (bounds as any).Va.lo;
    const lng = (bounds as any).Ia.lo;

    setValueCb?.({
      name,
      lat,
      lng,
    });
    map.fitBounds(bounds);
  });
}

type MapSearchBoxProps = {
  className?: string;
  onPlaceChangeAfterSearch?: (data: PlaceChangeAfterSearchPayload) => void;
};

type PlaceChangeAfterSearchPayload = {
  name: string;
  lat: number;
  lng: number;
};

export const MapSearchBox = (props: MapSearchBoxProps) => {
  const { onPlaceChangeAfterSearch } = props;

  useEffect(() => {
    initAutocomplete(onPlaceChangeAfterSearch);
  }, []);

  return (
    <MapSearchBoxRoot className={props.className}>
      <MapSearchBoxInput />
      <MapContainer />
    </MapSearchBoxRoot>
  );
};

const MapSearchBoxRoot = styled.div`
  height: 100%;
`;
