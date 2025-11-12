/* eslint-disable simple-import-sort/imports, import/order */
import { useCallback, useEffect, useState } from 'react';

import { HeartIcon, RulerSquareIcon, StackIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Carousel } from '@/components/Carousel';
import { Button } from '@/components/Common/Button/Button';
import { CommentSection } from '@/components/Feedback';
import { MapView } from '@/components/Map';
import { Role } from '@/enums/role.enum';
import { ClientCommentModel, CreateCommentModel } from '@/models/comment.model';
import { WarehouseStatus } from '@/models/warehouse.model';
import warehouseService from '@/service/warehouse-service';
import { formatPrice } from '@/utils/format-price.util';
import { resolveAddress, resolveLocation, buildGeocodeQuery, geocodeAddress, buildOsmSearchUrl, extractProvinceFromAddress } from '@/utils/warehouse-address.util';

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
  const province = extractProvinceFromAddress(warehouse.address);
  const [dynamicLocation, setDynamicLocation] = useState<typeof location | undefined>(undefined);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const geocodeQuery = buildGeocodeQuery(warehouse.address);
  const handleTryGeocode = useCallback(async () => {
    if (!geocodeQuery) return;
    setGeoError(null);
    setGeoLoading(true);
    try {
      const loc = await geocodeAddress(geocodeQuery);
      if (loc) {
        setDynamicLocation(loc);
      } else {
        setGeoError('Không tìm thấy vị trí phù hợp.');
      }
    } catch (e) {
      setGeoError('Đã xảy ra lỗi khi tìm vị trí.');
    } finally {
      setGeoLoading(false);
    }
  }, [geocodeQuery]);
  
  // Tự động thử geocode khi chưa có tọa độ lưu và có địa chỉ hợp lệ
  useEffect(() => {
    if (!location && geocodeQuery && !dynamicLocation && !geoLoading) {
      void handleTryGeocode();
    }
  }, [location, geocodeQuery, dynamicLocation, geoLoading, handleTryGeocode]);
  // Google-based search/directions removed; destination-only map retained

  const navigate = useNavigate();

  const goToRentingForm = () => {
    navigate(`/warehouse/${id}/renting`);
  };

  const handleViewContract = () => {
    navigate('contract');
  };

  const resolveComment = (comment: ClientCommentModel) => {
    if (!user) {
      return Promise.reject(new Error('User is not authenticated'));
    }
    const warehouseId = warehouse.id;
    const userId = user.id;
    const createComment: CreateCommentModel = { userId, warehouseId, ...comment };
    return warehouseService.addComment(userId, warehouseId, createComment);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <ImageContainer>
        <Carousel images={warehouse.images} />
      </ImageContainer>
      <BodyContainer>
        <Title>{warehouse?.name}</Title>
        <Address>
          {address}
          {province ? <ProvinceTag> · {province}</ProvinceTag> : null}
        </Address>
        {(location || dynamicLocation) && (
          <MapViewContainer>
            <MapView height="260px" location={location || dynamicLocation} />
          </MapViewContainer>
        )}
        {!location && !dynamicLocation && (
          <MapViewContainer>
            <FallbackBox>
              <p className="text-sm mb-2">Chưa có tọa độ được lưu cho địa chỉ này.</p>
              {geocodeQuery ? (
                <div>
                  <FallbackActions>
                    {geoLoading ? (
                      <HintText>Đang tự động tìm vị trí từ địa chỉ…</HintText>
                    ) : (
                      <FallbackButton disabled={geoLoading} onClick={handleTryGeocode}>
                        Thử lại tìm vị trí
                      </FallbackButton>
                    )}
                    <ManualLink href={buildOsmSearchUrl(geocodeQuery)} rel="noreferrer" target="_blank">
                      Tra cứu thủ công trên OpenStreetMap
                    </ManualLink>
                  </FallbackActions>
                  {geoError && <ErrorText>{geoError}</ErrorText>}
                  {!geoLoading && !geoError && (
                    <HintText>Đã dùng Photon / Nominatim để tìm vị trí. Ward chỉ là thông tin phụ.</HintText>
                  )}
                </div>
              ) : (
                <HintText>Không có địa chỉ hợp lệ để tìm.</HintText>
              )}
            </FallbackBox>
          </MapViewContainer>
        )}
        <Date>Tạo vào lúc: {warehouse?.createdDate ? convertTimestampToDate(warehouse?.createdDate) : ''}</Date>
        <br />
        <ButtonContainer>
          {user?.role === Role.Renter && (
            <ActionButton disabled={warehouse.rented} onClick={goToRentingForm}>
              {warehouse.rented ? 'Đã thuê' : 'Thuê'}
            </ActionButton>
          )}
          {warehouse.rented && <ActionButton onClick={handleViewContract}>Xem hợp đồng</ActionButton>}
        </ButtonContainer>
        {!isOwner && (
          <IconActions>
            <IconActionItem>
              <HeartIcon />
              <Text>Yêu thích</Text>
            </IconActionItem>
          </IconActions>
        )}
        <MetricsContainer>
          <Price>{formatPrice(warehouse?.price)} VND/tháng</Price>
          <OtherMetrics>
            <OtherMetricItem>
              <RulerSquareIcon color="#999" height={32} width={32} />
              <Text>{warehouse?.area} mét vuông</Text>
            </OtherMetricItem>
            <OtherMetricItem>
              <ViewVerticalIcon color="#999" height={32} width={32} />
              <Text>{warehouse?.doors ?? 0} cửa</Text>
            </OtherMetricItem>
            <OtherMetricItem>
              <StackIcon color="#999" height={32} width={32} />
              <Text>{warehouse?.floors ?? 0} tầng</Text>
            </OtherMetricItem>
          </OtherMetrics>
        </MetricsContainer>
        <SectionLabel>Mô tả kho bãi</SectionLabel>
        {warehouse.description ? (
          <DescriptionContainer>
            <Description dangerouslySetInnerHTML={{ __html: warehouse.description }} />
          </DescriptionContainer>
        ) : (
          <small>
            <i>Không có mô tả gì ở đây cả</i>
          </small>
        )}
        {/* Đã lược bỏ tính năng chỉ đường trực tiếp để tăng độ ổn định.
            Người dùng có thể dùng liên kết trong bản đồ để mở xem chi tiết trên OSM. */}
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

const BodyContainer = styled.div`
  position: relative;
`;

const Title = styled.h1``;

const Address = styled.h4``;
const ProvinceTag = styled.small`
  color: #64748b;
  font-weight: normal;
`;

/* Removed unused MapViewContainer styled component */

const Date = styled.span`
  color: #999;
`;

/* Removed unused DirectionText styled component */

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

const MapViewContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  width: 100%;
  /* Ensure consistent radius wrapper */
  & > div {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  text-align: right;
  cursor: pointer;
`;

// Unify action button size with comment section button
const ActionButton = styled(Button)`
  height: 38px;
  border-radius: 12px;
  min-width: 140px;
  padding: 0 16px;
`;

/* Google-based directions/search UI removed */

const DescriptionContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 16px;
`;

const Description = styled.div`
  padding: 8px 16px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  text-align: justify; /* căn đều hai bên để dễ đọc */
  line-height: 1.6; /* giãn dòng thoáng hơn */
  word-break: break-word;

  /* Chuẩn hoá khoảng cách giữa các đoạn văn trong nội dung HTML */
  p {
    margin: 0 0 8px;
  }
`;

const FallbackBox = styled.div`
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
`;

const FallbackActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FallbackButton = styled(Button)`
  height: 32px;
  border-radius: 8px;
  padding: 0 12px;
`;

const ManualLink = styled.a`
  font-size: 13px;
  color: #6d28d9;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  margin-top: 8px;
  color: #dc2626;
  font-size: 12px;
`;

const HintText = styled.p`
  margin-top: 8px;
  color: #64748b;
  font-size: 12px;
`;

const SectionLabel = styled.h4`
  margin: 16px 0 8px; /* thêm khoảng cách phía trên và dưới tiêu đề */
`;
