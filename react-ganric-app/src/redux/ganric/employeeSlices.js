/* eslint-disable no-unused-vars */
import { createResourceSlice } from "./GenericSlice";


// Define the API URL for Employee resource
const API_URL = 'http://localhost:9090/api/v1/employees';

// Create the Employee slice using the generic function
const {
  fetchResource: fetchEmployees,
  addResource: addEmployee,
  updateResource: updateEmployee,
  deleteResource: deleteEmployee,
  resourceSlice: employeeSlices,
} = createResourceSlice('employees', API_URL);

export const { resetSuccessMessage } = employeeSlices.actions;
export default employeeSlices.reducer;
