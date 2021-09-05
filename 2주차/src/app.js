import Component from './core/Component.js';
import Calendar from './components/Calendar.js';
//import Todo from './components/Todo.js';
import { Store } from './core/Store.js';

export const store = new Store(
  {
    state: {
      today: new Date(),
      selectedDate: new Date(),
      select: true
    },
    mutations: {
      selectDate(state, payload) {
        state.selectedDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), payload);
        console.log('selectedDate', state.selectedDate);
        state.select = true;
      },
      changeMonth(state, payload) {
        state.selectedDate = payload;
        console.log('changeMonth', state.selectedDate);
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

