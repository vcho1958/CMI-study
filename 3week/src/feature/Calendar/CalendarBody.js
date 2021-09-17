import Component from "../core/Component.js";
import { store } from "../app.js";
import CalendarCell from "./CalendarCell.js";
import DateContext from "../../App.js";

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

}

