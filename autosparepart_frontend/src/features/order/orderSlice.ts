import { API_BASE_URL, CartItem, Order } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
  item: Order;
  items: Order[];
  pendingOrderId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  item: {} as Order,
  items: [],
  status: "idle",
  error: null,
  pendingOrderId: null,
};

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { getState }) => {
    const state: any = getState();
    const token: string = state.auth.token;
    const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

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

export const transferCart = createAsyncThunk(
  "order/transferCardItem",
  async (
    { cartItems, addressId }: { cartItems: CartItem[]; addressId: number },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state: any = getState();
    const token = state.auth.token;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/orders/transfer-cart`,
        { cartItems, addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // dispatch(clearCart());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to add to cart"
        );
      }
      return rejectWithValue("Failed to add to cart");
    }
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
    // Add to cart
    builder
      .addCase(transferCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        transferCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.pendingOrderId = action.payload;
        }
      )
      .addCase(transferCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    // fetch all orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
