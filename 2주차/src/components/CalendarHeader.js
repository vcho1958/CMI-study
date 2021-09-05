import Component from "../core/Component.js";
import { store } from "../app.js"

export default class CalendarHeader extends Component {


  template() {
    return `
      
      <h1>${this.year}년 ${this.month}월</h1>
      
      <button className="nextMonth" after="true">></button>
      <button className="prevMonth" before="true"><</button>
    `
  }
  get month() {
    return store.state.selectedDate.getMonth() + 1;
  }

  get year() { return store.state.selectedDate.getFullYear() }
}

