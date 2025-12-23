// src/App.jsx
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header dengan posisi fixed */}
      <Header />
      
      {/* Main content dengan padding-top untuk mengkompensasi header fixed */}
      <main className="flex-1 pt-16"> {/* h-16 = 4rem = 64px */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default App