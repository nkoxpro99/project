import { RentedWarehouseRevenue } from '../models/rented-warehouse-revenue.model';
import { generateDayLabelsInMonth, generateMonthLabels } from './time.util';

export function calculateRevenuePerMonthByStatus(data: RentedWarehouseRevenue[]): number[] {
  const monthLabels = generateMonthLabels();
  const dataByMonth = data.reduce(
    (prev, curr) => {
      const label = monthLabels[curr.rentedMonth - 1];
      if (prev[label]) {
        prev[label].push(curr);
      } else {
        prev[label] = [curr];
      }

      return prev;
    },
    {} as Record<string, RentedWarehouseRevenue[]>,
  );

  return monthLabels.map((it) => {
    const dataInMonth = dataByMonth[it] ?? [];

    return dataInMonth.reduce((prev, curr) => {
      if ([1, 3, 5].includes(curr.status)) {
        return prev + (curr.deposit * 2) / 100;
      }

      if ([2, 6, 7].includes(curr.status)) {
        return prev + (curr.total * 2) / 100;
      }

      return 0;
    }, 0);
  });
}

export function calculateRevenuePerDayByStatus(data: RentedWarehouseRevenue[], month: number, year: number): number[] {
  const dayLabels = generateDayLabelsInMonth(month, year);
  const dataByDay = data.filter(it => it.rentedMonth === month).reduce(
    (prev, curr) => {
      const label = dayLabels[curr.rentedDay - 1];
      if (prev[label]) {
        prev[label].push(curr);
      } else {
        prev[label] = [curr];
      }

      return prev;
    },
    {} as Record<string, RentedWarehouseRevenue[]>,
  );

  return dayLabels.map((it) => {
    const dataInMonth = dataByDay[it] ?? [];

    return dataInMonth.reduce((prev, curr) => {
      if ([1, 3, 5].includes(curr.status)) {
        return prev + (curr.deposit * 2) / 100;
      }

      if ([2, 6, 7].includes(curr.status)) {
        return prev + (curr.total * 2) / 100;
      }

      return 0;
    }, 0);
  });
}

export function generateBarChartOptions(options?: { onClickCallback?: (...args: any) => void }) {
  const { onClickCallback } = options || {};

  return {
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          autoSkipPadding: 0.5,
        },
      },
      y: {
        ticks: {
          callback: function (value: any) {
            return (value * 1000).toLocaleString('vi-VN') + ' VND';
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          labelTextColor: function () {
            return 'white';
          },
          label: function (data: any) {
            return (data.raw * 1000).toLocaleString('vi-VN') + ' VND';
          },
        },
      },
    },
    onClick: function (e: any) {
        if (onClickCallback) {
            onClickCallback(e);
        }
    },
  };
}

