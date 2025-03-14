import { redDark } from '@radix-ui/colors';
import styled, { keyframes } from 'styled-components';

export type SpinnerProps = {
  outerSize?: number;
  innerSize?: number;
  margin?: number;
};

export function Spinner({ outerSize = 50, innerSize = 40, margin = 4 }: SpinnerProps) {
  const minCurveThickness = 4;
  const actualInnerSize =
    outerSize - innerSize <= minCurveThickness * 2 ? outerSize - minCurveThickness * 2 : innerSize;
  const curveThickness = (outerSize - actualInnerSize) / 2;
  const totalSize = outerSize + margin * 2;

  return (
    <SpinnerContainer
      $curveThickness={curveThickness}
      $innerSize={actualInnerSize}
      $margin={margin}
      $outerSize={outerSize}
      $size={totalSize}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerContainer>
  );
}

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

type SpinnerContainerProps = {
  $size: number;
  $outerSize: number;
  $innerSize: number;
  $curveThickness: number;
  $margin: number;
};

const SpinnerContainer = styled.div<SpinnerContainerProps>`
  & {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    display: inline-block;
    position: relative;
    filter: drop-shadow(0px 10px 41px rgba(81, 173, 246, 0.49))
      drop-shadow(0px 5.0625px 17.8734px rgba(81, 173, 246, 0.33075));
  }

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ $outerSize }) => $outerSize}px;
    height: ${({ $outerSize }) => $outerSize}px;
    margin: ${({ $margin }) => $margin}px;
    border: ${({ $curveThickness }) => $curveThickness}px solid ${redDark.red8};
    border-radius: 50%;
    animation: ${loading} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(81, 173, 246) transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
