import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import Navbar from './components/navigation/Navbar'
import { Toaster } from './components/ui/toaster'
import { initializeKeycloak, keycloak, loginSuccess } from './features/auth/authSlice'
import AppRoutes from './routes/AppRoutes'
import Home from './components/pages/Home'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeKeycloak().then((authenticated) => {
      console.log('Keycloak initialized: ', authenticated);
      if(authenticated) {
        console.log('Keycloak initialized: ', authenticated);
        localStorage.setItem('checkoutRedirect', 'true');
        dispatch(loginSuccess({ token: keycloak.token!, user: keycloak.tokenParsed! }));
      }
    }

  )}, [dispatch])

  return (
    <div className="flex">
      <Toaster />
      {/* <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger /> */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4">
            <AppRoutes />
          </main>
        </div>
      {/* </SidebarProvider> */}
    </div>
  )
}

export default App;
