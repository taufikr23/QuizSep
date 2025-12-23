import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { QuizProvider } from './context/QuizContext'
import { QuizResultsProvider } from './context/QuizResultsContext'
import { AdminProvider } from './context/AdminContext'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'
import QuizPage from './pages/QuizPage.jsx'
import QuizSession from './pages/QuizSession.jsx'
import QuizResults from './pages/QuizResults.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path: 'admin', element: <Admin /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'quiz/:category', element: <QuizSession /> },
      { path: 'quiz/results', element: <QuizResults /> },
      { 
        path: '*', 
        element: (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 flex items-center justify-center">
            <div className="text-center p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
              <div className="text-6xl mb-4">🚀</div>
              <h1 className="text-2xl font-bold text-white mb-2">404 - Halaman Tidak Ditemukan</h1>
              <p className="text-gray-400 mb-6">Halaman yang Anda cari telah menjelajah ke alam semesta lain.</p>
              <a 
                href="/" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        ) 
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QuizProvider>
        <QuizResultsProvider>
          <AdminProvider>
            <RouterProvider router={router} />
          </AdminProvider>
        </QuizResultsProvider>
      </QuizProvider>
    </AuthProvider>
  </StrictMode>
)