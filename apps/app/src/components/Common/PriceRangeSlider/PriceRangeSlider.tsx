import 'react-range-slider-input/dist/style.css';
import './style.css';

import { violetDark } from '@radix-ui/colors';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import styled from 'styled-components';

import { formatPrice } from '@/utils/format-price.util';

import { Button } from '../Button';

type PriceRangeSliderProps = {
  min: number;
  max: number;
  onInput?: (options: [number, number]) => void;
};

export const PriceRangeSlider = (props: PriceRangeSliderProps) => {
  const { min, max, onInput } = props;
  const [value, setValue] = useState<[number, number]>([min, max]);
  const [appliedValue, setAppliedValue] = useState<[number, number]>([min, max]);

  useEffect(() => {
    console.log('123');
  }, []);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Label>
          Giá: {formatPrice(appliedValue[0])} VND - {formatPrice(appliedValue[1])} VND
        </Label>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <Container>
            <Title>
              <Text>{formatPrice(value[0])} VND</Text>
              <Text>-</Text>
              <Text>{formatPrice(value[1])} VND</Text>
            </Title>
            <RangeSlider
              defaultValue={[value[0], value[1]]}
              max={max}
              min={min}
              onInput={(priceRange: [number, number]) => {
                setValue(priceRange);
              }}
            />
            <ButtonContainer>
              <Button
                onClick={() => {
                  onInput?.(value);
                  setAppliedValue(value);
                }}
              >
                Áp dụng
              </Button>
            </ButtonContainer>
          </Container>
          <DropdownMenu.Arrow style={{ fill: '#216ba5' }} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const Container = styled.div`
  width: 300px;
  background: white;
  padding: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const Title = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const Text = styled.span``;

const Label = styled.label`
  display: flex;
  align-items: center;
  border: 1px solid ${violetDark.violet10};
  width: 250px;
  border-radius: 4px;
  justify-content: center;
  font-size: 12px;
  color: ${violetDark.violet10};
`;

const ButtonContainer = styled.div`
  margin-top: 36px;
  text-align: right;
`;
