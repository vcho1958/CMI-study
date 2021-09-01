import { Component } from "../core/Component.js";
import { CalendarHeader } from "./CalendarHeader.js";
import { CalendarBody } from "./CalendarBody.js";

export class Calendar extends Component {

  template() {
    return `
      <header data-component="CalendarHeader">
      </header>
      <main data-component="CalendarBody">
      </main>
    `
  }

  initState() {
    const state = {
      today: new Date(),
      selectedDate: new Date(),
      select: true
    };
    state.month = state.today.getMonth() + 1;
    state.year = state.today.getFullYear();
    return state;
  }

  mounted() {
    const $CalendarHeader = document.querySelector(['data-component="CalendarHeader"']);
    const $CalendarBody = document.querySelector(['data-component="CalendarBody"']);
    new CalendarHeader($CalendarHeader, { state: this.state });
    new CalendarBody($CalendarBody, { state: this.state });
  }

}