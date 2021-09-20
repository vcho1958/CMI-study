import React, { useContext } from "react";
import { DateContext } from '../../../../context';
import conditionFactory from "./conditionFactory.js";
import DateCell from "./DateCell.jsx";
import styles from "./style.css";
export default function CalendarCell() {
  const {state} = useContext(DateContext);
  const [attributes, days] = conditionFactory(state);
  console.log(days);
  return (<>
    <ol className={styles.dateCellContainer}>
    {days.map((v, i) =>
      <DateCell  key={i.toString()} attribute={attributes[i]}>{v}</DateCell>
      )}
    </ol>

  </>);
}







