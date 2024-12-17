/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface EntityState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  successMessage: string;
}

function createGenericSlice<T>(name: string, apiUrl: string) {
  const fetchItems = createAsyncThunk(`${name}/fetchAll`, async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  });

  const addItem = createAsyncThunk(`${name}/add`, async (item: T) => {
    const response = await axios.post(apiUrl, item);
    return response.data;
  });

  const updateItem = createAsyncThunk(
    `${name}/update`,
    async ({ id, item }: { id: number | string; item: T }) => {
      const response = await axios.put(`${apiUrl}/${id}`, item);
      return response.data;
    }
  );

  const deleteItem = createAsyncThunk(`${name}/delete`, async (id: number | string) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  });

  const slice = createSlice({
    name,
    initialState: {
      items: [] as T[],
      loading: false,
      error: null as string | null,
      successMessage: '',
    } as EntityState<T>,
    reducers: {
      resetSuccessMessage(state) {
        state.successMessage = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchItems.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch items';
        })
        .addCase(addItem.fulfilled, (state, action) => {
          state.items.push(action.payload);
          state.successMessage = `${name} added successfully!`;
        })
        .addCase(updateItem.fulfilled, (state, action) => {
          const index = state.items.findIndex((item: any) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.successMessage = `${name} updated successfully!`;
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
          state.items = state.items.filter((item: any) => item.id !== action.payload);
          state.successMessage = `${name} deleted successfully!`;
        });
    },
  });

  return { slice, fetchItems, addItem, updateItem, deleteItem };
}

export default createGenericSlice;
