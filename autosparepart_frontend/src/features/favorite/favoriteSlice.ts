import { Favorite } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface FavoriteState {
  items: Favorite[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoriteState = {
  items: [],
  status: 'idle',
  error: null
}

const API_BASE_URL = 'http://localhost:8081/api/v1/favorites';

export const addToFavorite = createAsyncThunk('favorites/addFavorites', async ({ productId }: { productId: string }, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  const response = await axios.post<Favorite>(API_BASE_URL + "/add/" + productId, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async ({ productId }: { productId: string }, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  const response = await axios.delete(API_BASE_URL + "/delete/" + productId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;

    const response = await axios.get<Favorite[]>(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToFavorite.fulfilled, (state, action: PayloadAction<Favorite>) => {
        state.status = 'succeeded';
        const existingItem = state.items.find(item => item.productId === action.payload.productId);

        if (!existingItem) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error adding to favorites';
      })
      .addCase(removeFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<{ productId: string }>) => {
        state.status = 'succeeded';
        state.items = state.items.filter(fav => fav.productId !== action.payload.productId);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Error removing favorites";
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch favorites';
      })
  }
});

export default favoriteSlice.reducer;