import Component from "../core/Component.js";
import CalendarHeader from "./CalendarHeader.js";
import CalendarBody from "./CalendarBody.js";
import { store } from "../app.js"



export default class Calendar extends Component {


  template() {
    return `
      <header data-component="CalendarHeader">
      </header>
      <main class="calendar-body" data-component="CalendarBody">
      </main>
    `
  }

  mounted() {
    const $CalendarHeader = document.querySelector('[data-component="CalendarHeader"]');
    const $CalendarBody = document.querySelector('[data-component="CalendarBody"]');
    new CalendarHeader($CalendarHeader);
    new CalendarBody($CalendarBody);
  }
  setEvent() {
    this.addEvent('click', '.calendar-cell', (event) => {
      if (event.target.textContent) {
        const { selectedMonth, selectedYear } = store.state;
        if (event.target.getAttribute('before')) {
          store.commit('changeMonth', new Date(selectedYear, selectedMonth - 1, 1))
        }
        else if (event.target.getAttribute('after')) {
          store.commit('changeMonth', new Date(selectedYear, selectedMonth + 1, 1))
        }
        store.commit('selectDate', event.target.textContent);
      }


    });

    this.addEvent('click', '[data-component="CalendarHeader"]', (event) => {
      const { selectedMonth, selectedYear } = store.state;
      if (event.target.getAttribute('before')) {
        store.commit('changeMonth', new Date(selectedYear, selectedMonth - 1, 1))
      }
      else if (event.target.getAttribute('after')) {
        store.commit('changeMonth', new Date(selectedYear, selectedMonth + 1, 1))
      }

    })
  }

}