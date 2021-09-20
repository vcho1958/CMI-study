import React from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";




export default function Calendar(props) {
  return (<>
    <header>
      <CalendarHeader />
    </header>
    <main>
      <CalendarBody />
    </main>

  </>
  )
}
