
import './App.css';
import React from 'react';


class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.day,
      holiday: props.holiday,
    }
  }
  render() {
    return <div class="calender-cell">{this.state.day}</div>;
  }
}
class Calender extends React.Component {
  days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
    }
    // this.setState({ month: new Date(), selected: new Date })

  };
  generateCalendar() {
    const cells = [];
    for (let i = 1; i <= this.maxDates[this.state.month]; i++) {
      cells.push(<Cell day={i} holiday={true} />)
    }
    return cells;
  }
  render() {
    return <div class="calender">{
      this.generateCalendar()
    }</div>;
  }
}

export default Calender;
