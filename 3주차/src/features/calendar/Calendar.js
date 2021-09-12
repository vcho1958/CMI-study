import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectYear,
  selectMonth,
} from './calendarSlice';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
export function Calendar() {
  const selectedYear = useSelector(selectYear);
  const selectedMonth = useSelector(selectMonth);
  useEffect(() => {

  })
  const today = useState(new Date());
  return (
    <>
      <CalendarHeader year={selectedYear} month={selectedMonth} />
      <CalendarBody today={today} />
    </>
  );
}
