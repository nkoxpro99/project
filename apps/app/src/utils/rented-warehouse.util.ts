import moment from 'moment';

export function getStartDate(startDate: string | Date) {
  return moment(startDate).startOf('days');
}

export function getCurrentDate() {
  return moment().startOf('days');
}

export function getEndDate(startDate: string | Date, duration: number) {
  const today = moment(getStartDate(startDate)).add(duration, 'months');

  return today;
}

export function getDuration(startDate: string | Date, endDate: string | Date) {
  return moment(endDate).diff(moment(startDate), 'months');
}

export function getAllRentingInfoDates(startDate: string | Date, duration: number) {
  return { rentedDate: getCurrentDate(), endDate: getEndDate(startDate, duration), startDate: getStartDate(startDate) };
}
