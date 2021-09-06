import Component from './core/Component.js';
import Calendar from './components/Calendar.js';
//import Todo from './components/Todo.js';
import { Store } from './core/Store.js';

export const store = new Store(
  {
    state: {
      today: new Date(),
      selectedDate: new Date().getDate(),
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      select: true
    },
    mutations: {
      selectDate(state, payload) {
        state.selectedDate = payload;
        state.select = true;
      },
      changeMonth(state, payload) {
        state.selectedMonth = payload.getMonth();
        state.selectedYear = payload.getFullYear();
        state.select = false;
      }
    }
  }
);

export default class App extends Component {
  template() {
    return `
    <article data-component="Calendar"></article>
    `
  }
  mounted() {
    const $Calendar = document.querySelector('[data-component="Calendar"]');
    new Calendar($Calendar);
  }
}

