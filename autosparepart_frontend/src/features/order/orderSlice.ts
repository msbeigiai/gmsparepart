import { API_BASE_URL, Order } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
  item: Order;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  item: {} as Order,
  status: "idle",
  error: null,
};

export const fetchOrderByOrderId = createAsyncThunk(
  "order/fetchOrderByOrderId",
  async (orderId: string, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
    const response = await axios.get<Order>(
      `${API_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByOrderId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrderByOrderId.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.status = "succeeded";
          state.item = action.payload;
        }
      )
      .addCase(fetchOrderByOrderId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default orderSlice.reducer;
