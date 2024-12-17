import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
//import employeeReducer from './ganric/employeeSlices';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    //employee: employeeReducer,
    
  },
});

export default store;

