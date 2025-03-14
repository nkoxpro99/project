import { useEffect, useState } from 'react';

import { AddressLocation } from '@/models/warehouse.model';

type InitAutoCompleteOptions = {
  onPlaceChangeAfterSearch?: (data: PlaceChangeAfterSearchPayload) => void;
} & MapWithSearchBoxOptions;

function initAutocomplete({ onPlaceChangeAfterSearch, ...otherOptions }: InitAutoCompleteOptions) {
  const mapElementId = otherOptions.mapElementId ?? 'map';
  const mapElement = document.getElementById(mapElementId);

  if (mapElement === null) throw Error(`Element with id #${mapElementId} for displaying map is not existed`);

  const map = new google.maps.Map(mapElement, {
    center: { lat: 16.06571795654765, lng: 108.2169500477852 },
    zoom: 13,
    mapTypeId: 'roadmap',
  });
  // Create the search box and link it to the UI element.
  const searchBoxElementId = otherOptions.searchBoxElementId ?? 'map-search-box';
  const searchBoxElement = document.getElementById(searchBoxElementId) as HTMLInputElement;

  if (otherOptions.markerLocation) {
    new google.maps.Marker({
      map,
      position: otherOptions.markerLocation,
    });

    map.setCenter(otherOptions.markerLocation);
  }

  if (searchBoxElement === null)
    throw Error(`Element with id #${searchBoxElementId} for map search box is not existed`);

  const searchBox = new google.maps.places.SearchBox(searchBoxElement);

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBoxElement);
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
    let address: string | undefined;

    places.slice(0, 1).forEach((place) => {
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
      } as google.maps.Icon;

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

      console.log(place);

      address = place.formatted_address;

      const ward = place.address_components?.find((ac) => ac.types.includes('administrative_area_level_2'))?.long_name;

      if (address) searchBoxElement.value = address;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      onPlaceChangeAfterSearch?.({
        address,
        position: {
          lat,
          lng,
        },
        ward,
      });
    });
    map.fitBounds(bounds);
  });
}

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

export const useMapWithSearchBox = (options?: MapWithSearchBoxOptions) => {
  const [currentSearchPayload, setCurrentSearchPayload] = useState<PlaceChangeAfterSearchPayload>();

  useEffect(() => {
    initAutocomplete({
      ...options,
      onPlaceChangeAfterSearch: (data) => {
        setCurrentSearchPayload(data);
      },
    });
  }, []);

  return { currentSearchPayload };
};
