import { API_BASE_URL, UserProfile } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProfileState {
  item: UserProfile;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserProfileState = {
  item: {} as UserProfile,
  status: "idle",
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (_, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;

    const response = await axios.get<UserProfile>(
      `${API_BASE_URL}/users/my-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = "succeeded";
          state.item = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching user profile";
      });
  },
});

export default userSlice.reducer;
