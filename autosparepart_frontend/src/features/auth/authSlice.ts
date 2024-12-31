// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Keycloak from 'keycloak-js';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: Keycloak.KeycloakTokenParsed | null;
}

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
    loginSuccess: (state, action: PayloadAction<{ token: string, user: Keycloak.KeycloakTokenParsed }>) => {
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

let isKeycloakInitialized = false;

export const initializeKeycloak = async () => {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    });
    console.log('Keycloak initialized:', authenticated);
    return authenticated;
  } catch (error) {
    console.error('Failed to initialize Keycloak:', error);
    throw error;
  }
};

export default authSlice.reducer;
