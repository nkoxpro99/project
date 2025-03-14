import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
  Confirm
} from 'react-admin';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { apiUrl } from '../../provider';

export const TransactionDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const [isContractOpen, setContractOpen] = useState(false);

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/warehouse/static/${id}`, {
        includes: ['RentedWarehouses', 'Comments', 'Comments.User', 'Images'],
      })
      .then((v) => {
        setData(v.data || []);
      });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <FlexField>
          <LeftSide>
            <Title>Tên kho bãi</Title>
            <Title>Chủ sở hữu</Title>
            <Title>Người thuê</Title>
            <Title>Giá</Title>
            <Title>Ngày thuê</Title>
            <Title>Ngày kết thúc</Title>
            <Title>Thời gian tạo</Title>
            <Title>Tình trạng</Title>
          </LeftSide>
          <RightSide>
            <Text>{data.name}</Text>
            <Text>{data.userId}</Text>
            <Text>{data.rentedInfo?.renterId || 'Chưa thuê'}</Text>
            <Text>{(data.price * 1000).toLocaleString('vi-VN')} VND</Text>
            <Text>{data.rentedInfo?.rentedDate || 'Chưa thuê'}</Text>
            <Text>{data.rentedInfo?.endDate || 'Chưa thuê'}</Text>
            <Text>{data.createdDate}</Text>
            <Text>{data.rented ? 'Đã thuê' : 'Chưa thuê'}</Text>
          </RightSide>
        </FlexField>
      </Wrapper>
      <div>
        {data.rentedInfo && (
          <>
            <Button onClick={() => setContractOpen(true)}>
              <>{'View contract'}</>
            </Button>
            <Confirm
              confirm="Ok"
              content={
                <div
                  style={{
                    height: 'calc(100vh - 200px)',
                    width: 1280,
                  }}
                >
                  <embed
                    src={`data:application/pdf;base64,${data.rentedInfo ? data.rentedInfo.contractBase64 : ''}`}
                    style={{
                      height: '100%',
                      width: 'calc(100% - 2*24px)',
                    }}
                    type="application/pdf"
                  ></embed>
                </div>
              }
              isOpen={isContractOpen}
              maxWidth={false}
              scroll="body"
              style={{ height: '100%' }}
              title="Contract"
              onClose={() => {
                setContractOpen(false);
              }}
              onConfirm={() => setContractOpen(false)}
            ></Confirm>
          </>
        )}
      </div>
    </>
  );
};

const Wrapper = styled.div`
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FlexField = styled.div`
  display: flex;
  gap: 48px;
  align-items: start;
`;
const LeftSide = styled.div``;
const RightSide = styled.div``;
const Field = styled.div``;

const Title = styled.h4``;
const Text = styled.h4`
  font-weight: normal;
`;