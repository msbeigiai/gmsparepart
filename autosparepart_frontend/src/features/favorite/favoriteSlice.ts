import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Favorite {
  message: string;
}

interface FavoriteState {
  item: Favorite
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoriteState = {
  item: { message: "" },
  status: 'idle',
  error: null
}

const API_BASE_URL = '/api/v1/favorites';

export const addToFavorite = createAsyncThunk('favorites/addFavorites', async ({ productId }: { productId: string }, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  const response = await axios.post<Favorite>(API_BASE_URL + "/add/" + productId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToFavorite.fulfilled, (state, action: PayloadAction<Favorite>) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error adding to favorites';
      })
  }
});

export default favoriteSlice.reducer;