import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Generic API Service for CRUD Operations
export const createResourceSlice = (resourceName, apiUrl) => {
  const fetchResource = createAsyncThunk(`${resourceName}/fetchAll`, async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  });

  const addResource = createAsyncThunk(`${resourceName}/add`, async (resource) => {
    const response = await axios.post(apiUrl, resource);
    return response.data;
  });

  const updateResource = createAsyncThunk(`${resourceName}/update`, async ({ id, resource }) => {
    const response = await axios.put(`${apiUrl}/${id}`, resource);
    return response.data;
  });

  const deleteResource = createAsyncThunk(`${resourceName}/delete`, async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  });

  const resourceSlice = createSlice({
    name: resourceName,
    initialState: {
      data: [],
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
        .addCase(fetchResource.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchResource.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchResource.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addResource.fulfilled, (state, action) => {
          state.data.push(action.payload);
          state.successMessage = `${resourceName} added successfully!`;
        })
        .addCase(updateResource.fulfilled, (state, action) => {
          const index = state.data.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.data[index] = action.payload;
          }
          state.successMessage = `${resourceName} updated successfully!`;
        })
        .addCase(deleteResource.fulfilled, (state, action) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
          state.successMessage = `${resourceName} deleted successfully!`;
        });
    },
  });

  return {
    fetchResource,
    addResource,
    updateResource,
    deleteResource,
    resourceSlice,
  };
};
