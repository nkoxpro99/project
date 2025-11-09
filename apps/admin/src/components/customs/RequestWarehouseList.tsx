import axios from 'axios';
import { useEffect, useState } from 'react';
import { Datagrid, ListContextProvider, TextField, useList } from 'react-admin';
import styled from 'styled-components';

import { apiUrl } from '../../provider';

type PendingWarehouseRecord = {
  id: number;
  name: string;
  address: string;
  price: string;
  area: string;
  createdDate: string;
};

type RawPendingWarehouseRecord = PendingWarehouseRecord & {
  price: number;
  area: number;
  status: number;
  createdDate: string;
};

export const RequestWarehouseList = () => {
  const [data, setData] = useState<PendingWarehouseRecord[]>([]);
  const listContext = useList<PendingWarehouseRecord>({ data });

  useEffect(() => {
    axios
      .post<RawPendingWarehouseRecord[]>(`${apiUrl}/warehouse/static`, {
        includes: ['RentedWarehouses', 'Comments', 'Comments.User', 'Images'],
      })
      .then((v) => {
        setData(
          (v.data || [])
            .filter((it) => it.status === 0)
            .map((it) => ({
              id: it.id,
              name: it.name,
              address: it.address,
              price: `${(it.price * 1000).toLocaleString('vi-VN')} VND`,
              area: `${it.area} m2`,
              createdDate: new Date(it.createdDate).toISOString().split('T').join(' '),
            })),
        );
      });
  }, []);

  return (
    <PageSection>
      <SectionHeader>
        <h1>Kho bãi đang chờ duyệt</h1>
      </SectionHeader>
      <TableContainer>
        <ListContextProvider value={listContext}>
          <Datagrid rowClick={(e) => String(e)}>
            <TextField source="id" />
            <TextField label="Tên" source="name" />
            <TextField label="Địa chỉ" source="address" />
            <TextField label="Giá" source="price" />
            <TextField label="Diện tích" source="area" />
            <TextField label="Ngày tạo" source="createdDate" />
          </Datagrid>
        </ListContextProvider>
      </TableContainer>
    </PageSection>
  );
};

const PageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const TableContainer = styled.div`
  position: relative;
`;
