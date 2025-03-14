import axios from 'axios';
import { useEffect, useState } from 'react';
import { BooleanField, Datagrid, List, ListContextProvider, TextField, useList } from 'react-admin';

import { apiUrl } from '../../provider';

export const WarehouseList = () => {
  const [data, setData] = useState([]);
  const listContext = useList<any>({ data });

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/warehouse/static`, {
        includes: ['RentedWarehouses', 'Comments', 'Comments.User', 'Images'],
      })
      .then((v) => {
        setData(v.data.map(it => ({
          ...it,
          address: JSON.parse(it.address).address
        })) || []);
      });
  }, []);

  return (
    <>
      <h1>Tất cả kho bãi</h1>
      <ListContextProvider value={listContext}>
        <Datagrid rowClick={(e) => String(e)}>
          <TextField source="id" />
          <TextField label="Tên" source="name" />
          <TextField label="Địa chỉ" source="address" />
          <TextField label="Giá" source="price" />
          <TextField label="Tầng" source="floors" />
          <TextField label="Cửa" source="doors" />
          <TextField label="Diện tích" source="area" />
          <BooleanField label="Đã thuê" source="rented" />
        </Datagrid>
      </ListContextProvider>
    </>
  );
};

