import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BooleanField,
  Button,
  Confirm,
  Datagrid,
  FunctionField,
  ListContextProvider,
  TextField,
  useList,
  useNotify,
  useRedirect,
} from 'react-admin';
import styled from 'styled-components';

import { apiUrl, dataProvider } from '../../provider';

type WarehouseRecord = {
  id: number;
  name: string;
  address: string;
  price: number;
  floors: number;
  doors: number;
  area: number;
  rented: boolean;
  [key: string]: unknown;
};

type RawWarehouseRecord = WarehouseRecord & { address: string };

export const WarehouseList = () => {
  const [data, setData] = useState<WarehouseRecord[]>([]);
  const [recordPendingDelete, setRecordPendingDelete] = useState<WarehouseRecord | null>(null);
  const notify = useNotify();
  const redirect = useRedirect();
  const listContext = useList<WarehouseRecord>({ data, resource: 'Warehouse' });

  useEffect(() => {
    axios
      .post<RawWarehouseRecord[]>(`${apiUrl}/warehouse/static`, {
        includes: ['RentedWarehouses', 'Comments', 'Comments.User', 'Images'],
      })
      .then(({ data: response }) => {
        const warehouses: WarehouseRecord[] = (response || []).map((it) => ({
          ...it,
          address: JSON.parse(it.address).address,
        }));
        setData(warehouses);
      });
  }, []);

  const handleConfirmDelete = async () => {
    if (!recordPendingDelete) {
      return;
    }

    try {
      await dataProvider.delete('Warehouse', { id: recordPendingDelete.id });
      setData((prev) => prev.filter((item) => item.id !== recordPendingDelete.id));
      notify('Xóa thành công', { type: 'info' });
    } catch (error) {
      notify('Xóa thất bại', { type: 'warning' });
    } finally {
      setRecordPendingDelete(null);
    }
  };

  return (
    <PageSection>
      <SectionHeader>
        <h1>Tất cả kho bãi</h1>
      </SectionHeader>
      <Confirm
        content={`Bạn có chắc muốn xóa kho bãi ${recordPendingDelete?.name ?? ''} không?`}
        isOpen={Boolean(recordPendingDelete)}
        title="Xác nhận"
        onClose={() => setRecordPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <TableContainer>
        <ListContextProvider value={listContext}>
          <Datagrid bulkActionButtons={false} rowClick={false}>
            <TextField source="id" />
            <TextField label="Tên" source="name" />
            <TextField label="Địa chỉ" source="address" />
            <TextField label="Giá" source="price" />
            <TextField label="Tầng" source="floors" />
            <TextField label="Cửa" source="doors" />
            <TextField label="Diện tích" source="area" />
            <BooleanField label="Đã thuê" source="rented" />
            <FunctionField
              label="Hành động"
              render={(record: WarehouseRecord) => (
                <ActionRow>
                  <Button
                    label="Xem"
                    onClick={(event) => {
                      event.stopPropagation();
                      redirect(`/warehouse/${record.id}`);
                    }}
                  />
                  <Button
                    color="error"
                    label="Xóa"
                    onClick={(event) => {
                      event.stopPropagation();
                      setRecordPendingDelete(record);
                    }}
                  />
                </ActionRow>
              )}
            />
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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const TableContainer = styled.div`
  position: relative;
`;

const ActionRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;
