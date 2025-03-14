function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function generateMonthLabels(): string[] {
  return [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
}

export function generateDayLabelsInMonth(month: number, year: number): string[] {
  const totalDays = daysInMonth(month, year);
  const result = [];

  for (let i = 1; i <= totalDays; i++) {
    result.push(`${i < 10 ? '0' + i : String(i)}`);
  }

  return result;
}

