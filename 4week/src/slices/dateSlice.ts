/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface DateState {
  select: boolean;
  selectedDate: Date;
  today: Date;
}

const initialState: DateState = {
  select: false,
  selectedDate: new Date(),
  today: new Date()
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    changeMonth: (state: DateState, action: PayloadAction<Date>) => {
      state.select = false;
      state.selectedDate = new Date(action.payload.getFullYear(), action.payload.getMonth(), action.payload.getDate());
    },
    changeDate: (
      state: DateState,
      action: PayloadAction<{
        target: number;
        type: string | undefined;
      }>
    ) => {
      const newDate: Date = new Date(
        state.selectedDate.getFullYear(),
        state.selectedDate.getMonth(),
        action.payload.target
      );
      switch (action.payload.type) {
        case 'before':
          newDate.setMonth(newDate.getMonth() - 1);
          break;
        case 'after':
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        default:
          break;
      }
      state.select = true;
      state.selectedDate = newDate;
    }
  }
});

export const { changeMonth, changeDate } = dateSlice.actions;
export const selectDate = (state: RootState) => state.date;

export default dateSlice.reducer;
