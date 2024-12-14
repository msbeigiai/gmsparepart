import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const API_BASE_URL = 'http://localhost:8081/api/v1/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  const state: any = getState();  
  const token = state.auth.token;
  const response = await axios.get<Product[]>(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching products';
      })
  }
});

export default productSlice.reducer;