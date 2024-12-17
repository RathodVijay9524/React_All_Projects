import createGenericSlice from '../features/genericSlice';
import { Employee } from '../features/types';

const API_URL = 'http://localhost:9090/api/v1/employees';

const {
  reducer: employeeReducer,
  actions: employeeActions,
  thunks: employeeThunks
} = createGenericSlice<Employee>('employees', API_URL);

export const { resetSuccessMessage } = employeeActions;
export const { 
  fetchAll: fetchEmployees, 
  add: addEmployee, 
  update: updateEmployee, 
  remove: deleteEmployee 
} = employeeThunks;
export default employeeReducer;
