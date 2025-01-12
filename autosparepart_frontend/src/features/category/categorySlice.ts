import { Category } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CategoryState = {
  items: [],
  status: 'idle',
  error: null
};

const API_BASE_URL = 'http://localhost:8081/api/v1/categories';

export const getAllCategories = createAsyncThunk("categories/allCategories", async (_, {getState}) => {
  const state: any = getState();
  const products = state.products;
  const response = await axios.get<Category[]>(API_BASE_URL, {});
  return response.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Categories did not fetched successfully!"
      })
  }
});

export default categorySlice.reducer;
