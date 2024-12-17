import createGenericSlice from '../../GenericSlice';
import { Employee } from '../Employee';

const { slice, fetchItems, addItem, updateItem, deleteItem } = createGenericSlice<Employee>(
  'employees',
  'http://localhost:9090/api/v1/employees'
);

export const fetchEmployees = fetchItems;
export const addEmployee = addItem;
export const updateEmployee = updateItem;
export const deleteEmployee = deleteItem;

export const { resetSuccessMessage } = slice.actions;
export default slice.reducer;
