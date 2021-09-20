import getMaxDate from "./getMaxDate.js";

export default function conditionFactory({ selectedDate, today, select }) {

  const maxDate = getMaxDate(selectedDate);

  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const attributes = [];
  const days = [];
  console.log(prevMonthLastDate)
  for (let i = 0, j = 1; i < 42; i++) {
    let attribute = {}
    if (i >= firstDay.getDay() && i < maxDate + firstDay.getDay()) {
      if (j === today.getDate() && today.getFullYear() === selectedDate.getFullYear() && today.getMonth() === selectedDate.getMonth()) attribute.today = 'true';
      if (select && j === selectedDate.getDate()) attribute.select = 'true';
      days[i] = j++;
    }
    else if (i < firstDay.getDay()) {
      days[i] = prevMonthLastDate.getDate() - firstDay.getDay() + i + 1;
      attribute.keyword = 'before';
    }
    else {
      days[i] = i - maxDate - firstDay.getDay() + 1;
      attribute.keyword = 'after';
    }

    attributes[i] = attribute;
  }
  return [attributes, days];
}