import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Navbar from "./components/navigation/Navbar";
import { Toaster } from "./components/ui/toaster";
import {
  initializeKeycloak,
  keycloak,
  loginSuccess,
  logout,
  tokenRefreshed,
} from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/navigation/AppSidebar";
import Cookies from "js-cookie";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const defaultOpen = Cookies.get("sidebar_state")?.value === "true";

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
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex pt-20">
          <AppSidebar />
          <div className="flex-1 w-full">
            <Toaster />
            <main className="p-4 max-w-full">
              {isAuthenticated &&
              user?.realm_access?.roles.includes("ADMIN", 0) ? (
                <SidebarTrigger />
              ) : null}
              <AppRoutes />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
