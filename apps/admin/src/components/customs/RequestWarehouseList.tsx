import axios from 'axios';
import { useEffect, useState } from 'react';
import { Datagrid, ListContextProvider, TextField, useGetList, useList } from 'react-admin';

import { apiUrl } from '../../provider';

export const RequestWarehouseList = () => {
  const [data, setData] = useState([]);
  const listContext = useList<any>({ data });

  useEffect(() => {
    axios.post<any, any>(`${apiUrl}/warehouse/static`, {
      includes: ['RentedWarehouses', 'Comments', 'Comments.User', 'Images']
    }).then(v => {
      setData((v.data || []).filter((it: any) => it.status === 0).map((it: any) => ({
        ...it,
        price: (it.price * 1000).toLocaleString('vi-VN') + ' VND',
        area: it.area + ' m2',
        createdDate: new Date(it.createdDate).toISOString().split('T').join(' ')
      })));
    });
  }, [])

  return (
    <>
      <h1>Kho bãi đang chờ duyệt</h1>
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
    </>
  );
};

