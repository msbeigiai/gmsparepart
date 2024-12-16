import AppSidebar from './components/navigation/AppSidebar'
import Navbar from './components/navigation/Navbar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4">
            <AppRoutes />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App
