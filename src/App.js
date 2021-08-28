
import './App.css';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function createCells(date) {
  const cells = [];
  let maxDate = maxDates[date.getMonth()];
  let startDay = new Date(date.getFullYear(), date.getMonth(), 1);
  startDay = startDay.getDay();
  if (date.getMonth() === 1) {
    if ((date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) || date.getFullYear() % 400 === 0) {
      maxDate = 29;
    }
  }
  for (let i = 0, j = 1; i < 42; i++) {
    if (i < startDay || i >= maxDate + startDay)
      cells.push(<div key={i} className="calendar-cell empty"></div>)
    else {
      cells.push(<div key={i} className={classnames('calendar-cell', { 'selected-date': j === date.getDate() })
      }> {j}</div >);
      j++;
    }
  }
  for (let i = 1; i <= maxDate; i++) {

  }
  for (let i = cells.length; i < 42; i++) {
    cells.push(<div key={i + 1} className="calendar-cell empty"></div>)
  }

  return cells;
}

function createColumns() {
  const columns = [];
  for (let i = 0; i < 7; i++) { columns.push(<div key={i} className="calender-column">{days[i].substr(0, 3).toLocaleUpperCase()}</div>); }
  return columns;
}
function Calender() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);
  const [cells, setCells] = useState(createCells(selectedDate));
  const columns = createColumns();
  const [month, setMonth] = useState(date.getMonth());
  useEffect(() => {
    if (month !== selectedDate.getMonth()) {
      setCells(createCells(selectedDate));
      setMonth(selectedDate.getMonth());
    }
  }, [month, selectedDate])

  const prev = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));

  }
  const next = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  }
  return (<>
    <section className="calendar-header">
      <button className="prevMonth" onClick={prev}>Previous</button>
      <h1>{months[selectedDate.getMonth()]}</h1>
      <button className="nextMonth" onClick={next}>Next</button>
    </section>
    <section className="calendar-main">
      {columns}{cells}
    </section>
  </>);
}



export default Calender;
