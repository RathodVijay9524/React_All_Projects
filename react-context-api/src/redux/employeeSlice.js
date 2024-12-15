import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API service using axios to interact with backend
const API_URL = 'http://localhost:9090/api/v1/employees';

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addEmployee = createAsyncThunk('employees/add', async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, employee }) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    resetSuccessMessage: (state) => {
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        state.successMessage = 'Employee added successfully!';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.successMessage = 'Employee updated successfully!';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
        state.successMessage = 'Employee deleted successfully!';
      });
  },
});

export const { resetSuccessMessage } = employeeSlice.actions;
export default employeeSlice.reducer;
