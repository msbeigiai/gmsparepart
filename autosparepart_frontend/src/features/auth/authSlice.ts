import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import Keycloak from "keycloak-js";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: Keycloak.KeycloakTokenParsed | null;
  tokenExpiresAt: number | null;
}

export const keycloak = new Keycloak("/keycloak.json");

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: null,
  tokenExpiresAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user: Keycloak.KeycloakTokenParsed;
        expiresIn: number;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.tokenExpiresAt = Date.now() + action.payload.expiresIn * 1000;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("tokenExpiresAt", state.tokenExpiresAt.toString());
    },
    tokenRefreshed: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        expiresIn: number;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiresAt = Date.now() + action.payload.expiresIn * 1000;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("tokenExpiresAt", state.tokenExpiresAt.toString());
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.tokenExpiresAt = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiresAt");
      keycloak.logout();
    },
  },
});

export const { loginSuccess, tokenRefreshed, logout } = authSlice.actions;

export const refreshTokenIfNeeded =
  (): AppThunk => async (dispatch, getState) => {
    const state = getState().auth;
    const tokenExpiresAt = state.tokenExpiresAt;

    if (tokenExpiresAt && Date.now() + 60000 > tokenExpiresAt) {
      try {
        const refreshed = await keycloak.updateToken(30); // حداقل ۳۰ ثانیه اعتبار درخواست میکند

        if (refreshed) {
          dispatch(
            tokenRefreshed({
              token: keycloak.token!,
              refreshToken: keycloak.refreshToken!,
              expiresIn:
                keycloak.tokenParsed?.exp! - Math.floor(Date.now() / 1000),
            })
          );
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        dispatch(logout());
      }
    }
  };

export const initializeKeycloak = async () => {
  try {
    const authenticated = await keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      checkLoginIframe: false, // Important for better reliability
      enableLogging: true, // Helpful for debugging
      pkceMethod: "S256",
    });

    if (authenticated) {
      setInterval(() => {
        keycloak.updateToken(30).catch(() => {
          console.error("Failed to refresh token periodically");
        });
      }, 30000);
      sessionStorage.setItem("keycloak-token", keycloak.token!);
      sessionStorage.setItem("keycloak-refresh-token", keycloak.refreshToken!);
    }

    return authenticated;
  } catch (error) {
    console.error("Failed to initialize Keycloak:", error);
    throw error;
  }
};

export default authSlice.reducer;
