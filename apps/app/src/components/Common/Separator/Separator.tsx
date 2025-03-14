import { gray } from '@radix-ui/colors';
import * as SeparatorRadix from '@radix-ui/react-separator';
import styled from 'styled-components';

export type SeparatorProps = SeparatorRadix.SeparatorProps & SeparatorRootStyledType;

export function Separator({
  start = 10,
  end = 10,
  color = gray.gray8,
  decorative = true,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <SeparatorRoot {...props} color={color} decorative={decorative} end={end} orientation={orientation} start={start} />
  );
}

type SeparatorRootStyledType = {
  start?: number;
  end?: number;
  color?: string;
};

const SeparatorRoot = styled(SeparatorRadix.Root)<SeparatorRootStyledType>`
  background-color: ${({ color }) => color};

  &[data-orientation='horizontal'] {
    margin-top: ${({ start }) => start}px;
    margin-bottom: ${({ end }) => end}px;
    height: 1px;
    width: 100%;
  }

  &[data-orientation='vertical'] {
    margin-right: ${({ start }) => start}px;
    margin-left: ${({ end }) => end}px;
    height: 100%;
    width: 1px;
  }
`;
