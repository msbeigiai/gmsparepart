// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Keycloak from 'keycloak-js';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: Keycloak.KeycloakTokenParsed | null;
}

// Singleton instance outside of the component
export const keycloak = new Keycloak('/keycloak.json');

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

let isKeycloakInitialized = false; // Add this outside the function

export const authenticateUser = () => async (dispatch: any) => {
  try {
    if (!isKeycloakInitialized) {
      await keycloak.init({ onLoad: 'login-required' });
      isKeycloakInitialized = true;

      if (keycloak.authenticated) {
        dispatch(
          loginSuccess({
            token: keycloak.token as string,
            user: keycloak.tokenParsed!,
          })
        );
      }
    }
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
  }
};

export default authSlice.reducer;
