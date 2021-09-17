import React from 'react';
import Calendar from './feature/Calendar';
import './App.css';


export const DateContext = React.createContext({
  today: new Date(),
  selectedDate: new Date().getDate(),
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  select: true
});

function App() {
  return (
    <DateContext.Provider>
      <Calendar />
    </DateContext.Provider>
  );
}

export default App;
