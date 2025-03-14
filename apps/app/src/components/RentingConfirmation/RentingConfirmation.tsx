import { useFormikContext } from 'formik';
import styled from 'styled-components';

import { WardLabel } from '@/constants/ward-label.constant';
import { RentingState } from '@/containers/RentingForm/RentingFormContent';
import { WardValue } from '@/enums/ward-value.enum';
import { WareHouseModel } from '@/models/warehouse.model';
import { convertDateToLocaleDateFormat } from '@/utils/datetime-format.util';

import { formatPrice } from '../../utils/format-price.util';
import { Carousel } from '../Carousel';
import { RenterInformationFormValuesType } from '../RenterInformation';

type RentingConfirmationProps = {
  warehouse: WareHouseModel;
  rentingState: RentingState;
};

export const RentingConfirmation = (props: RentingConfirmationProps) => {
  const { warehouse, rentingState } = props;
  const {
    values: { duration },
  } = useFormikContext<RenterInformationFormValuesType>();

  const { deposit, confirm: remain, total: totalPrice } = rentingState;

  return (
    <Container>
      <Title>Xác nhận thông tin</Title>
      <Body>
        <WarehouseContainer>
          <WarehouseContainerInfo>
            <Subtitle>Thông tin kho bãi</Subtitle>
            <ProductName>{warehouse.name}</ProductName>
            <Address>Quận: {warehouse.ward === WardValue.ALL ? '' : WardLabel[warehouse.ward]}</Address>
            <WarehouseBody>
              <div>
                <WarehouseBodyLabel>Diện tích</WarehouseBodyLabel>
                <WarehouseBodyLabel>Số lượng cửa</WarehouseBodyLabel>
                <WarehouseBodyLabel>Số tầng</WarehouseBodyLabel>
                <WarehouseBodyLabel>Giá</WarehouseBodyLabel>
                <WarehouseBodyLabel>Giá cọc (50% giá thuê 1 tháng)</WarehouseBodyLabel>
                <WarehouseBodyLabel>Số tiền cần thanh toán sau cọc</WarehouseBodyLabel>
                <WarehouseBodyLabel>Hạn thanh toán sau cọc</WarehouseBodyLabel>
              </div>
              <div>
                <WarehouseBodyData>{warehouse.area} mét vuông</WarehouseBodyData>
                <WarehouseBodyData>{warehouse.doors ?? 0} cửa</WarehouseBodyData>
                <WarehouseBodyData>{warehouse.floors ?? 0} tầng</WarehouseBodyData>
                <WarehouseBodyData>
                  {formatPrice(warehouse.price)} VND / tháng x {duration} = {formatPrice(totalPrice)} VND
                </WarehouseBodyData>
                <WarehouseBodyData>
                  {formatPrice(warehouse.price)} VND / tháng x 0.5 = {formatPrice(deposit)} VND
                </WarehouseBodyData>
                <WarehouseBodyData>
                  {formatPrice(totalPrice)} VND - {formatPrice(deposit)} VND = {formatPrice(remain)} VND
                </WarehouseBodyData>
                <WarehouseBodyData>
                  {convertDateToLocaleDateFormat(rentingState.startDate, { capital: true })}
                </WarehouseBodyData>
              </div>
            </WarehouseBody>
          </WarehouseContainerInfo>
          <WarehouseContainerImage>
            <StyledCarousel
              images={warehouse.images}
              showFullscreenButton={false}
              showPlayButton={false}
              showThumbnails={false}
            ></StyledCarousel>
          </WarehouseContainerImage>
        </WarehouseContainer>
        <RenterInfoContainer>
          <RenterInfoContainerLeft>
            <Subtitle>Địa chỉ thanh toán</Subtitle>
          </RenterInfoContainerLeft>
          <RenterInfoContainerRight>
            <Subtitle>Phương thức thanh toán</Subtitle>
          </RenterInfoContainerRight>
        </RenterInfoContainer>
      </Body>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h1``;

const Body = styled.div``;

const WarehouseContainer = styled.div`
  border-radius: 8px;
  padding: 24px 16px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const WarehouseContainerInfo = styled.div``;

const WarehouseContainerImage = styled.div`
  border-radius: 16px;
`;
const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-color: #8080806a;

  .image-gallery-content:not(.fullscreen) .image-gallery-image {
    height: 300px;
    width: 400px;
    padding-top: 0;
  }

  .image-gallery-thumbnail-image {
    height: 62px;
    width: 92px;
    object-fit: cover;
    object-position: center;
  }
`;

const Subtitle = styled.h4`
  color: gray;
`;

const ProductName = styled.h3``;

const Address = styled.h4``;

const WarehouseBody = styled.div`
  display: flex;
  gap: 16px;
`;

const WarehouseBodyLabel = styled.label`
  display: block;
  padding: 8px 16px 8px 0;
  border-right: 1px solid #c9c9c9;
`;

const WarehouseBodyData = styled.span`
  display: block;
  padding: 8px 0;
`;

const RenterInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RenterInfoContainerLeft = styled.div``;

const RenterInfoContainerRight = styled.div``;
