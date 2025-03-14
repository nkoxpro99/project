import styled from 'styled-components';

import { Invalid } from '@/components/Fallback';
import { useWarehouseResolver } from '@/resolver/WarehouseResolver';

import { RenterInformationProvider } from '../../components/RenterInformation';
import { RentingFormContent } from './RentingFormContent';

export const RentingForm = () => {
  const { warehouse } = useWarehouseResolver();

  return (
    <>
      {warehouse.rented ? (
        <Invalid></Invalid>
      ) : (
        <Container>
          <RenterInformationProvider>
            <RentingFormContent />
          </RenterInformationProvider>
        </Container>
      )}
    </>
  );
};

const Container = styled.div``;
