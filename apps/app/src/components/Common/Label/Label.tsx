import { ReactNode } from 'react';
import styled from 'styled-components';

export type LabelProps = {
  className?: string;
  children?: ReactNode;
  color?: string;
  textColor?: string;
};

export function Label({ color = 'black', textColor = 'white', ...otherProps }: LabelProps) {
  return <LabelRoot {...otherProps} $color={color} $textColor={textColor}></LabelRoot>;
}

const LabelRoot = styled.div<{ $color: string; $textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  height: 16px;
  padding: 4px;
  background: ${({ $color }) => $color};
  color: ${({ $textColor }) => $textColor};
  border-radius: 4px;
  text-align: center;
`;
