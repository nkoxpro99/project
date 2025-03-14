import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

export type DialogFallbackProps = {
  children: ReactNode;
};

export function DialogFallback({ children }: DialogFallbackProps) {
  return <DialogFallBackRoot>{children}</DialogFallBackRoot>;
}

const DialogFallBackRoot = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
