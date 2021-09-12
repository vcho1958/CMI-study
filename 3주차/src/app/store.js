import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: counterReducer,
  },
});
