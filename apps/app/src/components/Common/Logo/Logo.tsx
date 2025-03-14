import { HeartFilledIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

export const Logo = () => {
  return (
    <Container>
      <Icon>
        <HeartFilledIcon color="red" />
      </Icon>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  font-size: 32px;
  display: flex;
  align-items: center;
  padding: 0 36px;
  font-family: 'Pacifico', cursive;

  &:after {
    content: 'iRent';
  }
`;

const Icon = styled.div`
  position: absolute;
  top: -12px;
  left: 34px;
`;
