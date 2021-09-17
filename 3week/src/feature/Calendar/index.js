import React, { useContext } from "react";
import CalendarHeader from "./CalendarHeader.js";
import CalendarBody from "./CalendarBody.js";
import { DateContext } from "../../App.js";
export default Calendar = () => {
  return (<>
    <CalendarHeader />
    <CalendarBody />
  </>
  )
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