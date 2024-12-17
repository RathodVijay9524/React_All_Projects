import { createResourceSlice } from "../redux/genericSlice";

// Define the API URL for Employee resource
const API_URL = 'http://localhost:9090/api/v1/employees';

// Create the Employee slice using the generic function
const {
  fetchResource,
  addResource,
  updateResource,
  deleteResource,
  resourceSlice,
} = createResourceSlice('employees', API_URL);

// Export each function explicitly
export const fetchEmployees = fetchResource;
export const addEmployee = addResource;
export const updateEmployee = updateResource;
export const deleteEmployee = deleteResource;
export const { resetSuccessMessage } = resourceSlice.actions;

export default resourceSlice.reducer;
