import { Component } from "../core/Component.js";


export class CalendarHeader extends Component {
  template() {
    return `
      <button className="prevMonth" onClick={prev}>Previous</button>
      <h1>{months[selectedDate.getMonth()]}</h1>
      <button className="nextMonth" onClick={next}>Next</button>
    `
  }
}

