const maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export default function getMaxDate(selectedDate) {
  console.log(selectedDate);
  if (selectedDate.getMonth() === 1) {
    if ((selectedDate.getFullYear() % 4 === 0 && selectedDate.getFullYear() % 100 !== 0) || selectedDate.getFullYear() % 400 === 0) {
      return 29;
    }
  }
  return maxDates[selectedDate.getMonth()];
}
