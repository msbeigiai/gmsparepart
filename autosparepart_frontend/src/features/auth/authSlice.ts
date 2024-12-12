import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: Keycloak.KeycloakTokenParsed | null;
}

const keycloak = new Keycloak('/keycloak.json');

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: Keycloak.KeycloakTokenParsed }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      keycloak.logout();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authenticateUser = () => async (dispatch: any) => {
  await keycloak.init({ onLoad: 'login-required' });
  if (keycloak.authenticated) {
    dispatch(loginSuccess({ token: keycloak.token as string, user: keycloak.tokenParsed! }));
  }
};

export default authSlice.reducer;

