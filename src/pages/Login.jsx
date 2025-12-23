// src/pages/Login.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import { 
  Brain, Sparkles, Rocket, Zap, Lock, Mail, 
  Eye, EyeOff
} from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [stars, setStars] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Initialize cosmic stars background
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5,
    }))
    setStars(generatedStars)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    setTimeout(() => {
      const result = login(formData.email, formData.password)
      
      if (result.success) {
        setIsSuccess(true)
        
        setTimeout(() => {
          navigate('/profile')
        }, 800)
      } else {
        setError(result.message)
        setIsLoading(false)
        
        // Error animation
        const form = e.target
        form.classList.add('animate-shake')
        setTimeout(() => {
          form.classList.remove('animate-shake')
        }, 500)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden relative">
      {/* Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-star-float"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${10 + star.speed * 10}s`,
              animationDelay: `${star.delay}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}

        {/* Nebula Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Orbiting Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/50 to-blue-400/50 rounded-full animate-float-cosmic"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Cosmic Brain Logo */}
          <div className="text-center mb-8">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl rounded-full opacity-50 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center">
                <div className="relative">
                  <Brain className="w-10 h-10 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-gray-400">Sign in to continue your cosmic journey</p>
          </div>

          {/* Login Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10 rounded-2xl shadow-2xl p-8 animate-slide-up">
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-3 text-red-300">
                  <div className="p-2 bg-red-900/50 rounded-lg">
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm group-hover:border-purple-400/30"
                    placeholder="cosmic@explorer.com"
                    required
                    disabled={isLoading || isSuccess}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm group-hover:border-blue-400/30"
                    placeholder="••••••••"
                    required
                    disabled={isLoading || isSuccess}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading || isSuccess}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full py-4 text-white rounded-xl font-bold transition-all duration-300 relative overflow-hidden group ${
                  isSuccess 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]'
                } ${isLoading || isSuccess ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute -inset-1 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 ${
                  isSuccess 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600'
                }`} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Proses...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      <span>Success!</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 transition-transform" />
                      <span>Login</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                >
                  Join the cosmos
                </Link>
              </p>
            </div>
          </div>       
        </div>
      </div>

      {/* Floating Gradient Effects - Static but animated */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-reverse" />
      </div>
    </div>
  )
}

export default Login