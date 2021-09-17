import React, { useState } from "react";

import DateContext from "../../App.js";
export default class CalendarHeader extends Component {


  template() {
    return `
      
      <h1>${this.year}년 ${this.month}월</h1>
      
      <button className="nextMonth" after="true">></button>
      <button className="prevMonth" before="true"><</button>
    `
  }
  get month() {
    return store.state.selectedMonth + 1;
  }

  get year() { return store.state.selectedYear }
}

