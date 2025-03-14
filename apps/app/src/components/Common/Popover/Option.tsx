import { blue } from '@radix-ui/colors';
import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const Title = styled.span`
  color: #696969;
`;

const Container = styled.button<{
  hoverBackground?: string;
  customHoverBackgroundColor?: string;
}>`
  padding: 10px 12px;
  outline: none;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  cursor: pointer;
  background: transparent;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-end-end-radius: 4px;
    border-end-start-radius: 4px;
  }

  &:hover {
    background: ${(props) =>
      props.customHoverBackgroundColor ? props.customHoverBackgroundColor : props.hoverBackground};

    ${Title} {
      color: #fff;
    }
  }
`;

type OptionProps = {
  title: string;
  hoverBackground?: string;
  customHoverBackgroundColor?: string;
  children?: React.ReactNode; // for icon and something else
} & ComponentPropsWithoutRef<'button'>;

export function Option({ color, title, customHoverBackgroundColor = blue.blue8, ...props }: OptionProps) {
  return (
    <Container {...props} customHoverBackgroundColor={customHoverBackgroundColor}>
      <Title color={color}>{title}</Title>
      {props.children}
    </Container>
  );
}
