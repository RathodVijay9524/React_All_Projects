// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/service/slices/employeeSlice'; // Replace with your specific slice
import employeeReducers from '../features/employeeSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer, // Add other reducers here if needed
    employeess: employeeReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
