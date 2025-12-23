// src/pages/Register.jsx - VERSI COSMIC THEME
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Rocket, Zap, User, Mail, 
  Lock, Eye, EyeOff, Sparkles
} from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [registerError, setRegisterError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { register } = useAuth()
  const navigate = useNavigate()
  const submitButtonRef = useRef(null)

  // Initialize cosmic stars background
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5,
    }))
    setStars(generatedStars)

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi'
    if (!formData.email.trim()) newErrors.email = 'Email harus diisi'
    if (!formData.password) newErrors.password = 'Password harus diisi'
    if (formData.password.length < 6) newErrors.password = 'Minimal 6 karakter'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Password tidak cocok'
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true)
      setRegisterError('')
      
      setTimeout(() => {
        const result = register(formData.name, formData.email, formData.password)
        
        if (result.success) {
          setIsSuccess(true)
          
          // Navigate setelah delay
          setTimeout(() => {
            navigate('/profile')
          }, 800)
        } else {
          setRegisterError(result.message)
          setIsLoading(false)
          
          // Error animation
          const form = e.target
          form.classList.add('animate-shake')
          setTimeout(() => {
            form.classList.remove('animate-shake')
          }, 500)
        }
      }, 800)
    } else {
      setErrors(validationErrors)
      const form = e.target
      form.classList.add('animate-shake')
      setTimeout(() => {
        form.classList.remove('animate-shake')
      }, 500)
    }
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-700/5 to-pink-700/5 rounded-full blur-2xl" />
        </div>

        {/* Orbiting Particles */}
        {[...Array(6)].map((_, i) => (
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
          {/* Register Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10 rounded-2xl shadow-2xl p-8 animate-slide-up">
            {registerError && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-3 text-red-300">
                  <div className="p-2 bg-red-900/50 rounded-lg">
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-sm">{registerError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm group-hover:border-purple-400/30 ${
                      errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                    }`}
                    placeholder="Your cosmic name"
                    disabled={isLoading || isSuccess}
                  />
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    errors.name ? 'text-red-400' : 'text-gray-400 group-hover:text-purple-400'
                  }`} />
                </div>
                {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
              </div>

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
                    className={`w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm group-hover:border-blue-400/30 ${
                      errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'
                    }`}
                    placeholder="cosmic@explorer.com"
                    disabled={isLoading || isSuccess}
                  />
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    errors.email ? 'text-red-400' : 'text-gray-400 group-hover:text-blue-400'
                  }`} />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
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
                    className={`w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm group-hover:border-emerald-400/30 pr-10 ${
                      errors.password ? 'border-red-500/50' : 'border-white/10 focus:border-emerald-500/50'
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading || isSuccess}
                  />
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    errors.password ? 'text-red-400' : 'text-gray-400 group-hover:text-emerald-400'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading || isSuccess}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={`w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm group-hover:border-emerald-400/30 pr-10 ${
                      errors.confirmPassword ? 'border-red-500/50' : 'border-white/10 focus:border-emerald-500/50'
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading || isSuccess}
                  />
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    errors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-hover:text-emerald-400'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading || isSuccess}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                ref={submitButtonRef}
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
                      <span>Creating Account...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Sparkless className="w-5 h-5 animate-spin" />
                      <span>Success!</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                      <span>Daftar</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register