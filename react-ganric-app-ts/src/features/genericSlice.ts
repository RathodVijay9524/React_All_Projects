import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../redux/service/apiService';
import { BaseEntity, GenericState } from '../features/types';


const createGenericSlice = <T extends BaseEntity>(
  entity: string,
  apiUrl: string
) => {
  const fetchAll = createAsyncThunk(`${entity}/fetchAll`, async () => {
    return await apiService.fetchAll(apiUrl);
  });

  const add = createAsyncThunk(`${entity}/add`, async (item: T) => {
    return await apiService.add(apiUrl, item);
  });

  const update = createAsyncThunk(`${entity}/update`, async ({ id, item }: { id: number, item: T }) => {
    return await apiService.update(apiUrl, id, item);
  });

  const remove = createAsyncThunk(`${entity}/delete`, async (id: number) => {
    return await apiService.remove(apiUrl, id);
  });

  const slice = createSlice({
    name: entity,
    initialState: {
      items: [],
      loading: false,
      error: null,
      successMessage: '',
    } as GenericState<T>,  // Use GenericState here
    reducers: {
      resetSuccessMessage: (state) => {
        state.successMessage = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch items';
        })
        .addCase(add.fulfilled, (state, action) => {
          state.items.push(action.payload);
          state.successMessage = `${entity} added successfully!`;
        })
        .addCase(update.fulfilled, (state, action) => {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.successMessage = `${entity} updated successfully!`;
        })
        .addCase(remove.fulfilled, (state, action) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.successMessage = `${entity} deleted successfully!`;
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
    thunks: { fetchAll, add, update, remove }
  };
};

export default createGenericSlice;
