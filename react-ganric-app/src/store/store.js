import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/employeeSlices';


export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    //employee: employeeReducer,
    
  },
});

export default store;

