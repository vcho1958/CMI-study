import React from "react";
import ChangeMonthButton from "./ChangeMonthButton.jsx";
import HeadLine from "./HeadLine.jsx";
import './style.css';
export default function CalendarHeader() {

  return (
    <>
      <HeadLine />
      <ChangeMonthButton after />
      <ChangeMonthButton before />

    </>
  )
}





