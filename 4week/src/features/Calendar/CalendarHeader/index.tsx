import ChangeMonthButton from './ChangeMonthButton';
import HeadLine from './HeadLine';

export default function CalendarHeader() {
  return (
    <>
      <HeadLine />
      <ChangeMonthButton type="after" />
      <ChangeMonthButton type="before" />
    </>
  );
}
