import styled from 'styled-components';

import { WareHouseModel } from '../../models/warehouse.model';

export const RentingWarehouseDetails = (warehouse: WareHouseModel) => {
  const { name } = warehouse;
  return (
    <Container>
      <Title>Thông tin kho bãi</Title>
      <Body>
        <Text>Tên: {name}</Text>
        <Text>Tên: {name}</Text>
        <Text>Tên: {name}</Text>
      </Body>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h1``;

const Body = styled.div``;

const Text = styled.span``;
