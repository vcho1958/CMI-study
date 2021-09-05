
import Component from "../core/Component.js";

export default class CalendarCell extends Component {

  get date() {
    return this.$el.getAttribute("date");
  }

  template() {
    return `${this.date}`
  }


}

