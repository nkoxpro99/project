import styled from 'styled-components';

export const MapContainer = styled.div.attrs({ id: 'map' })`
  height: inherit;
`;

export const MapSearchBoxInput = styled.input.attrs({
  id: 'map-search-box',
  className: 'controls',
})`
  width: 300px;
  padding: 8px 16px;
  border-radius: 4px;
`;
