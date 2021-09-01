import Component from './core/Component.js';
import Calendar from './component/Calendar.js';
export default class App extends Component {
  template() {
    return `
    <div data-component="Calendar"></div>
    `
  }
  mounted() {
    const $Calendar = document.querySelector('[data-component="Calendar"]');
    new Calendar($Calendar);
  }
}

