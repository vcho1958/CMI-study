import React from "react";
import CalendarCell from "./CalendarCell";
import DayList from "./DayList";
import './style.css';




export default function CalendarBody() {
  return (<section className="CalendarBody">
    <DayList />
    <CalendarCell />
  </section>)
}

