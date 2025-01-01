import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Address {
  addressId: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
}

interface AddressState {
  items: Address[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AddressState = {
  items: [],
  status: 'idle',
  error: null
};

const API_BASE_URL = 'http://localhost:8081/api/v1/addresses';

export const fetchAddresses = createAsyncThunk('addresses/fetchAddresses', async (_, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  console.log("TOKEN: ", token);
  console.log("Full state:", getState());
  const response = await axios.get<Address[]>(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching addresses';
      })
  }
});

export default addressSlice.reducer;