import { useAppSelector } from '../../../../app/hooks';
import { selectDate } from '../../../../slices/dateSlice';
import conditionFactory from './conditionFactory';
import DateCell from './DateCell';
import './style.css';

export default function CalendarCell() {
  const dateState = useAppSelector(selectDate);
  const { attributes, days } = conditionFactory(dateState);
  return (
    <>
      <ol className="DateCellContainer">
        {days.map((v, i) => (
          <DateCell key={i.toString()} attribute={attributes[i]}>
            {v}
          </DateCell>
        ))}
      </ol>
    </>
  );
}
