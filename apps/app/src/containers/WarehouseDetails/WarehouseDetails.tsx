import { HeartIcon, RulerSquareIcon, StackIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { useAuthStore } from '@/auth';
import { Carousel } from '@/components/Carousel';
import { Button } from '@/components/Common/Button/Button';
import { CommentSection } from '@/components/Feedback';
import { MapSearchBoxInput, useMapWithSearchBox } from '@/components/Map';
import { RouteDirection } from '@/components/RouteDirection';
import { Role } from '@/enums/role.enum';
import { ClientCommentModel, CreateCommentModel } from '@/models/comment.model';
import { WarehouseStatus } from '@/models/warehouse.model';
import warehouseService from '@/service/warehouse-service';
import { formatPrice } from '@/utils/format-price.util';
import { resolveAddress, resolveLocation } from '@/utils/warehouse-address.util';

import { useWarehouseResolver } from '../../resolver/WarehouseResolver';
import { convertTimestampToDate } from '../../utils/convert-timestamp-to-date.util';

// const mockWarehouseDetails: WareHouseModel = {
//   id: 1,
//   name: 'Thien Thai Ho',
//   ward: WardValue.HAI_CHAU,
//   address: '73 Ha Huy Tap, Thanh Khe, Khue My',
//   price: 45,
//   area: 100,
//   createdDate: 1,
//   doorQuantity: 3,
//   floors: 3,
// };

export const WarehouseDetails = () => {
  const { warehouse, id, isOwner } = useWarehouseResolver();
  const { user } = useAuthStore(({ user }) => ({
    user,
  }));

  const address = resolveAddress(warehouse.address);
  const location = resolveLocation(warehouse.address);
  const { currentSearchPayload } = useMapWithSearchBox({ markerLocation: location });

  const [searchedAddress, setSearchedAddress] = useState('');

  const navigate = useNavigate();

  const goToRentingForm = () => {
    navigate(`/warehouse/${id}/renting`);
  };

  const handleViewContract = () => {
    navigate('contract');
  };

  const resolveComment = (comment: ClientCommentModel) => {
    const warehouseId = warehouse.id;
    const userId = user!.id;
    const createComment: CreateCommentModel = { userId, warehouseId, ...comment };
    return warehouseService.addComment(userId, warehouseId, createComment);
  };

  useEffect(() => {
    setSearchedAddress(currentSearchPayload?.address || '');
  }, [currentSearchPayload]);

  return (
    <Container>
      <ImageContainer>
        <Carousel images={warehouse.images}></Carousel>
      </ImageContainer>
      <BodyContainer>
        <Title>{warehouse?.name}</Title>
        <Address>{address}</Address>
        {/* {!!location && (
          <MapViewContainer>
            <MapView location={resolveLocation(warehouse.address)} />
          </MapViewContainer>
        )} */}
        <Date>Tạo vào lúc: {warehouse?.createdDate ? convertTimestampToDate(warehouse?.createdDate) : ''}</Date>
        <br />
        <ButtonContainer>
          {user?.role === Role.Renter && (
            <Button disabled={warehouse.rented} onClick={goToRentingForm}>
              {warehouse.rented ? 'Đã thuê' : 'Thuê'}
            </Button>
          )}
          {warehouse.rented && <Button onClick={handleViewContract}>Xem hợp đồng</Button>}
        </ButtonContainer>
        {!isOwner && (
          <IconActions>
            <IconActionItem>
              <HeartIcon></HeartIcon>
              <Text>Yêu thích</Text>
            </IconActionItem>
          </IconActions>
        )}

        <MetricsContainer>
          <Price>{formatPrice(warehouse?.price)} VND/tháng</Price>
          <OtherMetrics>
            <OtherMetricItem>
              <RulerSquareIcon color="#999" height={32} width={32}></RulerSquareIcon>
              <Text>{warehouse?.area} mét vuông</Text>
            </OtherMetricItem>
            <OtherMetricItem>
              <ViewVerticalIcon color="#999" height={32} width={32}></ViewVerticalIcon>
              <Text>{warehouse?.doors ?? 0} cửa</Text>
            </OtherMetricItem>
            <OtherMetricItem>
              <StackIcon color="#999" height={32} width={32}></StackIcon>
              <Text>{warehouse?.floors ?? 0} tầng</Text>
            </OtherMetricItem>
          </OtherMetrics>
        </MetricsContainer>
        <h4>Mô tả kho bãi</h4>
        {warehouse.description ? (
          <DescriptionContainer>
            <Description dangerouslySetInnerHTML={{ __html: warehouse.description }} />
          </DescriptionContainer>
        ) : (
          <small>
            <i>Không có mô tả gì ở đây cả</i>
          </small>
        )}
        <h4>Tìm kiếm đường đi đến kho bãi</h4>
        <InteractionContainer>
          <AddressSearchInput placeholder="Nhập địa chỉ xuất phát của bạn" />
          <DirectionContainer>
            <RouteDirection from={searchedAddress} to={address} />
          </DirectionContainer>
        </InteractionContainer>
        {warehouse.status === WarehouseStatus.Accepted && (
          <CommentsContainer>
            <CommentSection data={warehouse.comments} resolveComment={resolveComment} />
          </CommentsContainer>
        )}
      </BodyContainer>
    </Container>
  );
};

const ImageContainer = styled.div``;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
`;

const BodyContainer = styled.div`
  position: relative;
`;

const Title = styled.h1``;

const Address = styled.h4``;

const MapViewContainer = styled.div`
  height: 500px;
`;

const Date = styled.span`
  color: #999;
`;

const DirectionText = styled.span`
  color: #e03c31;
  pointer-events: none;
`;

const IconActions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const IconActionItem = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  cursor: pointer;

  &:hover {
    color: #999;
  }
`;

const MetricsContainer = styled.div`
  display: flex;
  margin-top: 24px;
  padding: 24px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  justify-content: space-between;
  align-items: center;
`;

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: bold;
`;

const OtherMetrics = styled.div`
  display: flex;
  gap: 24px;
`;

const OtherMetricItem = styled.div`
  text-align: center;
  span {
    margin-top: 8px;
    display: block;
    font-size: 24px;
  }
`;

const Text = styled.span``;

const Container = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
  text-align: right;
  cursor: pointer;
`;

const InteractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  align-items: flex-start;
`;

const DirectionContainer = styled.div`
  width: 100%;
`;

const inputStyles = css`
  height: 50px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid gray;
  box-sizing: border-box;
`;

const AddressSearchInput = styled(MapSearchBoxInput)`
  ${inputStyles};
  width: 100%;
`;

const DescriptionContainer = styled.div`
  margin-bottom: 16px;
`;

const Description = styled.div`
  padding: 4px 16px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
`;
