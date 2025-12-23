// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Brain, LogOut, User, Home, Sparkles, Zap, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // HAPUS useEffect yang tidak perlu
  // HAPUS state scrollY jika tidak digunakan

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/quiz', label: 'Quiz', icon: <Brain className="w-4 h-4" /> },
    ...(user ? [{ path: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> }] : []),
    ...(isAdmin ? [{ path: '/admin', label: 'Admin', icon: <Sparkles className="w-4 h-4" /> }] : []),
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-900/80 to-blue-900/80 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                QuizSep
              </h1>
              <p className="text-xs text-purple-300/70">Explore The Universe</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:text-white rounded-xl hover:bg-white/5"
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-gray-800/95 rounded-xl">
            <div className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}