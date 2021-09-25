import { useAppSelector } from '../../../app/hooks';
import { selectDate } from '../../../slices/dateSlice';
import './style.css';

export default function HeadLine() {
  const { selectedDate } = useAppSelector(selectDate);
  return (
    <h1>
      {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
    </h1>
  );
}
