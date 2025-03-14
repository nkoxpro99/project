import styled from 'styled-components';

import { Spinner } from '../../Common/Spinner';

export type LoadingProps = {
  size?: number;
  margin?: number;
};

export function Loading({ size = 50, margin = 5 }: LoadingProps) {
  return (
    <LoadingRoot>
      <Spinner innerSize={(size * 4) / 5} margin={margin} outerSize={size} />
    </LoadingRoot>
  );
}

const LoadingRoot = styled.div`
  display: flex;
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
