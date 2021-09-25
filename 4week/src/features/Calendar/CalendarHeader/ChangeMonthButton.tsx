import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeMonth, selectDate } from '../../../slices/dateSlice';
import './style.css';

export interface ChangeMonthButtonProps {
  type: string;
}
export default function ChangeMonthButton(props: ChangeMonthButtonProps) {
  const dispatch = useAppDispatch();
  const { type } = props;
  const { selectedDate } = useAppSelector(selectDate);
  return (
    <button
      type="button"
      className="change-month-btn"
      onClick={() => {
        const newDate: Date = new Date(selectedDate);
        switch (type) {
          case 'before':
            newDate.setMonth(newDate.getMonth() - 1);
            break;
          case 'after':
            newDate.setMonth(newDate.getMonth() + 1);
            break;
          default:
            break;
        }
        return dispatch(changeMonth(newDate));
      }}>
      {type === 'before' ? '<' : '>'}
    </button>
  );
}
