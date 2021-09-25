/* eslint-disable no-plusplus */
import getMaxDate from './getMaxDate';
import { Attribute } from '../../../../interfaces';
import { DateState } from '../../../../slices/dateSlice';

export default function conditionFactory({ selectedDate, today, select }: DateState): {
  attributes: Array<Attribute>;
  days: Array<number>;
} {
  const maxDate: number = getMaxDate(selectedDate);

  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const attributes: Array<Attribute> = [];
  const days: Array<number> = [];
  for (let i = 0, j = 1; i < 42; i++) {
    const attribute: Attribute = {};
    if (i >= firstDay.getDay() && i < maxDate + firstDay.getDay()) {
      if (
        j === today.getDate() &&
        today.getFullYear() === selectedDate.getFullYear() &&
        today.getMonth() === selectedDate.getMonth()
      )
        attribute.today = 'true';
      if (select && j === selectedDate.getDate()) attribute.select = 'true';
      days[i] = j++;
    } else if (i < firstDay.getDay()) {
      days[i] = prevMonthLastDate.getDate() - firstDay.getDay() + i + 1;
      attribute.keyword = 'before';
    } else {
      days[i] = i - maxDate - firstDay.getDay() + 1;
      attribute.keyword = 'after';
    }

    attributes[i] = attribute;
  }
  return { attributes, days };
}
