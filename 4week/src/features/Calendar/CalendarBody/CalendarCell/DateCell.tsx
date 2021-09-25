/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { changeDate } from '../../../../slices/dateSlice';
import { Attribute } from '../../../../interfaces';

export interface DateCellProps<T> {
  attribute: T;
  children: React.ReactNode;
}

export default function DateCell(props: DateCellProps<Attribute>) {
  const dispatch = useAppDispatch();
  const { attribute, children } = props;
  const { keyword } = attribute;
  const date = Number(children);
  return (
    <li className="calendarCell" {...attribute} onClick={() => dispatch(changeDate({ target: date, type: keyword }))}>
      {children}
    </li>
  );
}
