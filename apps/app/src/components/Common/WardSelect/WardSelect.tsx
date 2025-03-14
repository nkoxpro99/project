import { blackA, mauve, violet } from '@radix-ui/colors';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { styled } from '@stitches/react';
import { debounce } from 'lodash';
import React, { ReactNode, useCallback } from 'react';

import { WARD_OPTIONS } from '@/constants/ward-options.constant';
import { WardValue } from '@/enums/ward-value.enum';

type WardSelectProps = {
  triggerStyles?: React.CSSProperties;
  name?: string;
  onSelect?: (value: string) => void;
  allSelect?: boolean;
  defaultValue?: string;
  value?: string;
};

export const WardSelect = (props: WardSelectProps) => {
  const { onSelect } = props;
  const debouncedOnSelect = useCallback(
    debounce((value: string) => onSelect?.(value), 400),
    [],
  );

  return (
    <Select.Root
      defaultValue={props.defaultValue}
      name={props.name}
      value={props.value}
      onValueChange={(value) => debouncedOnSelect(value)}
    >
      <SelectTrigger aria-label="Food" style={props.triggerStyles}>
        <Select.Value placeholder="Chọn quận" />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <Select.Group>
              {WARD_OPTIONS.filter((ward) => (props.allSelect ? ward.value !== WardValue.ALL.toString() : true)).map(
                (it) => (
                  <SelectItem key={it.value} value={it.value}>
                    {it.label}
                  </SelectItem>
                ),
              )}
            </Select.Group>
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: 'white',
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: mauve.mauve3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-placeholder]': { color: violet.violet9 },
});

const SelectIcon = styled(Select.SelectIcon, {
  color: violet.violet11,
});

const SelectContent = styled(Select.Content, {
  zIndex: 99,
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

type SelectItemProps = {
  children: ReactNode;
  value: string;
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
});

const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
});

const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: violet.violet11,
  cursor: 'default',
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);
