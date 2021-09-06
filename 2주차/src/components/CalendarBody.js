import Component from "../core/Component.js";
import { store } from "../app.js";
import CalendarCell from "./CalendarCell.js";


export default class CalendarBody extends Component {



  template() {
    return `
      ${this.dayList.outerHTML}
      <ol data-component="CalendarCell"></ol>
    `
  }
  get dayList() {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    let $dayCells = this.$el.querySelector('.day-cell-container')
    if (!$dayCells) {
      $dayCells = document.createElement('ol');
      $dayCells.className += 'day-cell-container';
      for (let i = 0; i < 7; i++) {
        const $dayCell = document.createElement('li');
        $dayCell.className += 'day-cell'
        $dayCell.textContent = days[i];
        $dayCells.appendChild($dayCell);
      }
    }
    return $dayCells;
  }

  mounted() {
    const $CalendarCell = document.querySelectorAll('[data-component="CalendarCell"]');
    new CalendarCell($CalendarCell);
  }
  get cells() {
    let $CalendarCells = this.$el.querySelector('.calendar-cell-container');
    const { selectedDate, startDate, today, select, maxDate, prevMonthLast } = this;
    const beforeUsed = $CalendarCells ? true : false;
    const startDay = startDate.getDay();
    if (!$CalendarCells) {
      $CalendarCells = document.createElement('ol')
      $CalendarCells.className = 'calendar-cell-container';
    }

    if (selectedDate.getMonth() === 1) {
      if ((selectedDate.getFullYear() % 4 === 0 && selectedDate.getFullYear() % 100 !== 0) || selectedDate.getFullYear() % 400 === 0) {
        maxDate = 29;
      }
    }
    for (let i = 0, j = 1; i < 42; i++) {

      let $CalendarCell = $CalendarCells.children[i];
      if ($CalendarCell) {
        const attributes = ['today', 'selected', 'before', 'after'];
        attributes.forEach(v => {
          if ($CalendarCell.getAttribute(v)) $CalendarCell.removeAttribute(v);
        })
      }
      else {
        $CalendarCell = document.createElement('li');
        $CalendarCell.className = 'calendar-cell';
      }
      if (i >= startDay && i < maxDate + startDay) {
        $CalendarCell.setAttribute('date', j);
        if (j === today.getDate() && today.getFullYear() === selectedDate.getFullYear() && today.getMonth() === selectedDate.getMonth()) {
          $CalendarCell.setAttribute('today', true);
        }
        if (select && j === selectedDate.getDate()) {
          $CalendarCell.setAttribute('selected', true);
        }
        j++;
      }
      else {
        if (i < startDay) {
          $CalendarCell.setAttribute('date', prevMonthLast - startDay + i + 1);
          $CalendarCell.setAttribute('before', true);
        }
        else if (i >= maxDate + startDay) {
          $CalendarCell.setAttribute('date', i - maxDate - startDay + 1);
          $CalendarCell.setAttribute('after', true);
        }
      }
      $CalendarCell.dataset.component = "CalendarCell"
      if (!beforeUsed)
        $CalendarCells.appendChild($CalendarCell);
    }
    return $CalendarCells;
  }

}

