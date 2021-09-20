import {useContext} from 'react';
import { DateContext } from "../../../../context";

export default function DateCell(props) {
  const {dispatch} = useContext(DateContext);
  delete props.attribute.date;

  return (<li className="calendarCell" {...props.attribute} onClick={()=>dispatch({type: 'changeDate', keyword: props.attribute.keyword, date: +props.children})}>{props.children}</li>)
}
