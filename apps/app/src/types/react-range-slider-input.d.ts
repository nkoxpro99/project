declare module 'react-range-slider-input' {
  import * as React from 'react';
  export type RangeSliderProps = {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: [number, number];
    onInput?: (value: [number, number]) => void;
    onThumbDragEnd?: (value: [number, number]) => void;
    className?: string;
  };
  const RangeSlider: React.FC<RangeSliderProps>;
  export default RangeSlider;
}
