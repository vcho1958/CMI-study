const days = ['일', '월', '화', '수', '목', '금', '토'];
export default function DayList() {
  return (
    <ol className="dayCellContainer">
      {days.map((day) => (
        <li key={day} className="dayCell">
          {day}
        </li>
      ))}
    </ol>
  );
}
