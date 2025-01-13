import { Product } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
};
const API_BASE_URL = 'http://localhost:8081/api/v1/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  // const state: any = getState();
  // const token = state.auth.token;
  // console.log("TOKEN: ", token);
  const response = await axios.get<Product[]>(API_BASE_URL, {
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
  });
  return response.data;
});

export const getProductCategoryCount = createAsyncThunk("categories/getProducts", 
  async ({ categoryId }: { categoryId: number }) => {
  const response = await axios.get<number>(`${API_BASE_URL}/${categoryId}/count`);
  return response.data;
});

export const getProductsByCategory = createAsyncThunk("categories/getProductsByCategory", 
  async ({ categoryId }: { categoryId: number }) => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/category/${categoryId}`);
  return response.data;
});

export const fetchProductsByCategoryIds = createAsyncThunk("categories/getProductsByCategoryIds", 
  async ({ categoryIds }: { categoryIds: string[] }) => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/categories`, {
    params: {
      categoryIds: categoryIds.join(","),
    }
  });
  return response.data;
});

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
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching products';
      })
      .addCase(fetchProductsByCategoryIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategoryIds.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategoryIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching products';
      })
  }
});

export default productSlice.reducer;