import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

const API_BASE_URL = 'http://localhost:8081/api/v1/carts';


export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
      }
      return rejectWithValue('Failed to fetch cart items');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      console.log("URI: ", API_BASE_URL + '/add' + productId + '?' + quantity);
      const response = await axios.post(API_BASE_URL + '/add', null, {
        params: { productId, quantity }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
      }
      return rejectWithValue('Failed to add item to cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(API_BASE_URL);
      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
      }
      return rejectWithValue('Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch cart items
    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload.items;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Clear cart
    builder.addCase(clearCart.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.status = 'succeeded';
      state.items = [];
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default cartSlice.reducer;
