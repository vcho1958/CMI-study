import Component from "../core/Component.js";
import { store } from "../app.js"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMonth,
} from './calendarSlice';
import styles from './Counter.module.css';

export default function CalendarHeader(props) {
  const dispatch = useDispatch();
  return (
    <>
      <h1>${props.year}년 ${props.month}월</h1>
      <button onClick={() => dispatch(setMonth({ month: props.month + 1, year: props.year }))}>{">"}</button>
      <button onClick={() => dispatch(setMonth({ month: props.month - 1, year: props.year }))}>
        {"<"}
      </button>
    </>
  )
}

