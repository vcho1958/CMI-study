import { useContext } from 'react';
import { DateContext } from '../../../context';

export default function ChangeMonthButton(props) {
  const {dispatch} = useContext(DateContext);
  return (

        <button className="change-month-btn" onClick={() => dispatch({type: 'changeMonth', keyword: props.before ? 'before' : 'after'})} > {props.before ? '<' : '>'}</button>

  )

}