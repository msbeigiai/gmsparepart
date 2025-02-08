import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import Navbar from "./components/navigation/Navbar";
import { Toaster } from "./components/ui/toaster";
import {
  initializeKeycloak,
  keycloak,
  loginSuccess,
} from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeKeycloak().then((authenticated) => {
      console.log("Keycloak initialized: ", authenticated);
      if (authenticated) {
        console.log("Keycloak initialized: ", authenticated);
        localStorage.setItem("checkoutRedirect", "true");
        dispatch(
          loginSuccess({ token: keycloak.token!, user: keycloak.tokenParsed! })
        );
      }
    });
  }, [dispatch]);

  return (
    <div className="m-0">
      <Toaster />
      <div className="flex flex-col">
        <Navbar />
        <main className="m-3">
          <AppRoutes />
        </main>
      </div>
      {/* </SidebarProvider> */}
    </div>
  );
}

export default App;
