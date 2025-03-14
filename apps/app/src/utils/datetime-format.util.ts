import { capitalize } from 'lodash';
import moment from 'moment';

export type ConvertDateToLocaleDateFormatOptions = {
  capital?: boolean;
};

export function convertDateToLocaleDateFormat(date: string | Date, options?: ConvertDateToLocaleDateFormatOptions) {
  let result = moment(date).format('[ngày] DD [tháng] MM [năm] yyyy');

  if (options?.capital) result = capitalize(result);

  return result;
}
