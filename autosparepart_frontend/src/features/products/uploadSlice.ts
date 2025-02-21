import { API_ADMIN_BASE_URL, UploadResponse } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UploadState {
  item: UploadResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UploadState = {
  item: {} as UploadResponse,
  status: "idle",
  error: null,
};

const api = axios.create({
  baseURL: `${API_ADMIN_BASE_URL}/products`,
});

export const uploadProducts = createAsyncThunk(
  "upload/products",
  async (file: File, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post<UploadResponse>("import", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.status = "idle";
      state.error = null;
      state.item = {} as UploadResponse;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        uploadProducts.fulfilled,
        (state, action: PayloadAction<UploadResponse>) => {
          state.status = "succeeded";
          state.item = action.payload;
        }
      )
      .addCase(uploadProducts.rejected, (state, payload) => {
        state.status = "failed";
        state.error = payload.error.message || "Error uploading product";
      });
  },
});

export const { resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
