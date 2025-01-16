import { Address } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AddressRequest {
  addressLine1: string;
  city: string;
  postalCode: string
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
  const response = await axios.get<Address[]>(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const addAddress = createAsyncThunk('addresses/addAddresses',
  async ({ request }: { request: AddressRequest }, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
    const response = await axios.post<Address>(API_BASE_URL, request,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data;
  });

export const deleteAddress = createAsyncThunk('addresses/deleteAddress',
  async ({ addressId }: { addressId: number }, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
    await axios.delete(`${API_BASE_URL}/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return addressId;
  });


export const updateAddress = createAsyncThunk('addresses/updateAddress',
  async ({ addressId, address }: { addressId: number; address: Address }, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
    const response = await axios.put<Address>(`${API_BASE_URL}/${addressId}`,
      { address },
      {
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
      .addCase(addAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching addresses';
      })
      .addCase(deleteAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAddress.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.items = state.items.filter(address => address.addressId !== action.payload)
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error deleting addresses';
      })
      .addCase(updateAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item)=>item.addressId === action.payload.addressId);
        if (index && index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error deleting addresses';
      })
  }
});

export default addressSlice.reducer;