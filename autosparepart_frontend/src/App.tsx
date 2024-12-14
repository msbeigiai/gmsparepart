import { Route, Routes } from 'react-router-dom'
import AppSidebar from './components/AppSidebar'
import Home from './components/Home'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import About from './components/About'

function App() {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </SidebarProvider>
    </div>
  )
}

export default App
