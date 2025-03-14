import axios from 'axios';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

import { ChartData } from '../../models/chart-data.model';
import { apiUrl } from '../../provider';
import { Datagrid, ListContextProvider, TextField, useList } from 'react-admin';

ChartJS.register(ArcElement, Tooltip, Legend);

type UserPieData = {
  id: number;
  role: number;
  email: string;
};

export const Users = () => {
  const [users, setUsers] = useState<UserPieData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>();
  const listContext = useList({ data: users });

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/user/static`, {})
      .then((m) =>
        m.data.map((it: any) => {
          console.log(it);
          return {
            id: it.id,
            role: it.role,
            email: it.email,
            name: it.name,
            phone: it.phoneNumber,
            ioc: it.ioc,
            roleName: it.role === 2 ? 'Chủ kho' : 'Người thuê'
          };
        }),
      )
      .then((v) => setUsers(v));
  }, []);

  useEffect(() => {
    setChartData({
      labels: ['Chủ kho bãi', 'Người thuê'],
      datasets: [
        {
          label: 'Số lượng',
          data: users.reduce(
            (prev, curr) => {
              if (curr.role === 1) {
                prev[0] += 1;
              } else {
                prev[1] += 1;
              }

              return prev;
            },
            [0, 0],
          ),
          backgroundColor: ['#667CFF', 'rgba(255, 159, 64, 0.5)'],
        },
      ],
    });
  }, [users]);

  return (
    <>
      <h1>Thống kê người dùng</h1>
      <ChartContainer>{chartData ? <Pie data={chartData} /> : <></>}</ChartContainer>
      <Table>
        <ListContextProvider value={listContext}>
          <Datagrid>
            <TextField source="id" />
            <TextField label="Tên" source="name" />
            <TextField label="Email" source="email" />
            <TextField label="SĐT" source="phone" />
            <TextField label="CMND/CCCD" source="ioc" />
            <TextField label="Vai trò" source="roleName" />
          </Datagrid>
        </ListContextProvider>
      </Table>
    </>
  );
};

const ChartContainer = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

const Table = styled.div`
  margin: 32px 0;
`;

