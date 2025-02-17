import { Review } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PageContent {
  content: Review[];
  pageable: { pageNumber: number; pageSize: number };
  last: boolean;
  totalPages: number;
  numberOfElements: number;
}

interface PageContentState {
  item: PageContent;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PageContentState = {
  item: {
    content: [],
    pageable: { pageNumber: 0, pageSize: 0 },
    last: false,
    totalPages: 0,
    numberOfElements: 0,
  },
  status: "idle",
  error: null,
};

const API_BASE_URL = "http://localhost:8081/api/v1/reviews/products";

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async ({ productId }: { productId: string }, { getState }) => {
    const state: any = getState();
    const response = await axios.get<PageContent>(
      API_BASE_URL + "/" + productId
    );
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductReviews.fulfilled,
        (state, action: PayloadAction<PageContent>) => {
          state.status = "succeeded";
          state.item = action.payload;
        }
      )
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching reviews";
      });
  },
});

export default reviewSlice.reducer;
