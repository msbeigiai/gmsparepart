import { useEffect, useCallback } from "react";
import { useAppDispatch } from "./app/hooks";
import Navbar from "./components/navigation/Navbar";
import { Toaster } from "./components/ui/toaster";
import {
  initializeKeycloak,
  keycloak,
  loginSuccess,
  tokenRefreshed,
  logout,
} from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useAppDispatch();

  const refreshToken = useCallback(async () => {
    try {
      const refreshed = await keycloak.updateToken(30);
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
  }, [dispatch]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to restore the session
        const authenticated = await initializeKeycloak();

        if (authenticated) {
          // Set up token refresh
          keycloak.onTokenExpired = () => {
            console.log("Token expired, refreshing...");
            keycloak.updateToken(70).catch(() => {
              console.error("Failed to refresh token");
            });
          };

          dispatch(
            loginSuccess({
              token: keycloak.token!,
              refreshToken: keycloak.refreshToken!,
              user: keycloak.tokenParsed!,
              expiresIn:
                keycloak.tokenParsed?.exp! - Math.floor(Date.now() / 1000),
            })
          );

          // Set up periodic token refresh (every 5 minutes)
          const refreshInterval = setInterval(() => {
            keycloak.updateToken(70).catch(console.error);
          }, 300000);

          return () => clearInterval(refreshInterval);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      }
    };

    initAuth();
  }, [dispatch, refreshToken]);

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.onTokenExpired = () => {
        console.log("Token expired, attempting to refresh...");
        refreshToken();
      };
    }
  }, [refreshToken]);

  return (
    <div className="m-0">
      <Toaster />
      <div className="flex flex-col">
        <Navbar />
        <main className="m-3">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
