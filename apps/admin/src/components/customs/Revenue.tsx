import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import { ChartData } from '../../models/chart-data.model';
import { RentedWarehouseRevenue } from '../../models/rented-warehouse-revenue.model';
import { apiUrl } from '../../provider';
import {
  calculateRevenuePerDayByStatus,
  calculateRevenuePerMonthByStatus,
  generateBarChartOptions,
} from '../../utils/chart-data.util';
import { generateDayLabelsInMonth, generateMonthLabels } from '../../utils/time.util';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Revenue = () => {
  const [rentedWarehouseRevenue, setRentedWarehouseRevenue] = useState<RentedWarehouseRevenue[]>([]);
  const [yearChartData, setYearChartData] = useState<ChartData | null>();
  const [monthChartData, setMonthChartData] = useState<ChartData | null>();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const onClickMonthBar = (e: any) => {
    const elements = e.chart.getElementsAtEventForMode(
      e as unknown as Event,
      'nearest',
      {
        intersect: true,
      },
      true,
    );

    if (elements.length) {
      setSelectedMonth(elements[0].index + 1);
    }
  };

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/RentedWarehouse/static`, {
        includes: ['Warehouse'],
      })
      .then((m) =>
        m.data.map((it: any) => {
          const info = it.rentedInfo;
          const rentedMonth = new Date(info.rentedDate).getMonth() + 1;
          const rentedYear = new Date(info.rentedDate).getFullYear();
          const rentedDay = new Date(info.rentedDate).getDate();

          return {
            deposit: info.deposit,
            total: info.total,
            status: info.status,
            rentedMonth,
            rentedYear,
            rentedDay,
          };
        }),
      )
      .then((v) => setRentedWarehouseRevenue(v));
  }, []);

  useEffect(() => {
    const monthLabels = generateMonthLabels();
    setYearChartData({
      labels: monthLabels,
      datasets: [
        {
          label: 'Doanh thu',
          data: calculateRevenuePerMonthByStatus(rentedWarehouseRevenue),
          backgroundColor: '#667CFF',
        },
      ],
    });
  }, [rentedWarehouseRevenue]);

  useEffect(() => {
    if (selectedMonth) {
      const dayLabelsInMonth = generateDayLabelsInMonth(selectedMonth, 2023);
      setMonthChartData({
        labels: dayLabelsInMonth,
        datasets: [
          {
            label: 'Doanh thu trong tháng',
            data: calculateRevenuePerDayByStatus(rentedWarehouseRevenue, selectedMonth, 2023),
            backgroundColor: '#2196f3',
          },
        ],
      });

      setTimeout(() => {
        const monthBarChartElement = document.getElementById('month-bar-chart');

        console.log(monthBarChartElement);
        monthBarChartElement?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedMonth]);

  return (
    <Container>
      <h1>Doanh thu</h1>
      <h4>Năm 2023</h4>
      {yearChartData ? (
        <Bar
          data={yearChartData as any}
          options={generateBarChartOptions({
            onClickCallback: onClickMonthBar,
          })}
        />
      ) : (
        <></>
      )}
      <Spacing />
      {selectedMonth ? (
        <MonthBarChartWrapper>
          <h4>Tháng {selectedMonth}/2023</h4>
          {monthChartData ? <Bar data={monthChartData as any} options={generateBarChartOptions()} /> : <></>}
        </MonthBarChartWrapper>
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0 32px;
`

const Spacing = styled.div`
  margin: 16px 0;
`;

const MonthBarChartWrapper = styled.div.attrs({
  id: 'month-bar-chart',
})`
  background: rgba(0, 0, 0, 0.025);
  padding: 8px 16px;
  border-radius: 8px;
`;

