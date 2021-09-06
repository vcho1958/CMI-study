
import Component from "../core/Component.js";
import { store } from "../app.js"
export default class CalendarCell extends Component {
  get startDate() {
    return new Date(store.state.selectedYear, store.state.selectedMonth, 1);
  }

  get prevMonthLast() {
    return new Date(store.state.selectedYear, store.state.selectedMonth, 0).getDate();
  }

  get maxDate() {
    const maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return maxDates[store.state.selectedMonth];
  }

  get selectedDate() {
    return new Date(store.state.selectedYear, store.state.selectedMonth, store.state.selectedDate);
  }
  get today() { return store.state.today; }

  get select() { return store.state.select; }
  get date() {
    return this.$el.getAttribute("date");
  }

  template() {
    return `${this.cells}`
  }

  get cells() {
    console.log(this.$el)
    const { selectedDate, startDate, today, select, maxDate, prevMonthLast } = this;
    const startDay = startDate.getDay();
    if (selectedDate.getMonth() === 1) {
      if ((selectedDate.getFullYear() % 4 === 0 && selectedDate.getFullYear() % 100 !== 0) || selectedDate.getFullYear() % 400 === 0) {
        maxDate = 29;
      }
    }
    for (let i = 0, j = 1; i < 42; i++) {
      let $CalendarCell = this.$el[0].children[i];
      if ($CalendarCell) {
        const attributes = ['today', 'selected', 'before', 'after'];
        attributes.forEach(v => {
          if ($CalendarCell.getAttribute(v)) $CalendarCell.removeAttribute(v);
        })
      }
      else {
        $CalendarCell = document.createElement('li');
        this.$el[0].appendChild($CalendarCell);
        $CalendarCell.className = 'calendar-cell';
      }
      if (i >= startDay && i < maxDate + startDay) {
        $CalendarCell.textContent = j;
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
          $CalendarCell.textContent = prevMonthLast - startDay + i + 1;
          $CalendarCell.setAttribute('before', true);
        }
        else if (i >= maxDate + startDay) {
          $CalendarCell.textContent = i - maxDate - startDay + 1;
          $CalendarCell.setAttribute('after', true);
        }
      }

    }
  }
}

