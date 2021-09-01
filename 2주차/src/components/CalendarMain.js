import { Component } from "../core/Component.js";



export class CalendarBody {



} { columns } { cells }

createCells() {
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