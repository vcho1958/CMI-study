import { DateContext } from '../../../context';
import { useContext } from 'react';

export default function HeadLine({ selectedDate }) {
  const {state} = useContext(DateContext);
  return <h1>{state.selectedDate.getFullYear()}년 {state.selectedDate.getMonth()+1}월</h1>;
}



