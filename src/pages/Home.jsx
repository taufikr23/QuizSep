// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowRight, Brain, Sparkles, Zap, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [pulse, setPulse] = useState(0)
  const [stars, setStars] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const generatedStars = Array.from({ length: isMobile ? 40 : 80 }, (_, i) => ({
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
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2
        })
      }
    }

    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 100)
    }, 2000)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
      clearInterval(interval)
    }
  }, [isMobile])

  const stats = [
    { value: "8+", label: "Kategori", color: "text-purple-400", gradient: "from-purple-500 to-pink-500" },
    { value: "50+", label: "Soal", color: "text-blue-400", gradient: "from-blue-500 to-cyan-500" },
    { value: "1K+", label: "Pengguna", color: "text-emerald-400", gradient: "from-emerald-500 to-teal-500" },
    { value: "98%", label: "Kepuasan", color: "text-amber-400", gradient: "from-amber-500 to-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden relative">
      {/* Animated Stars Background */}
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
              animationTimingFunction: 'linear',
              filter: 'blur(0.5px)',
            }}
          />
        ))}

        {/* Nebula Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-purple-700/5 to-pink-700/5 rounded-full blur-2xl" />
        </div>

        {/* Constellation Lines - Only show on desktop */}
        <svg className="absolute inset-0 w-full h-full opacity-10 hidden lg:block">
          {Array.from({ length: 15 }).map((_, i) => {
            const x1 = Math.random() * 100
            const y1 = Math.random() * 100
            const x2 = x1 + (Math.random() * 20 - 10)
            const y2 = y1 + (Math.random() * 20 - 10)

            return (
              <line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#constellation-gradient)"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            )
          })}

          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header Section with brain as background on mobile */}
      <div className="pt-8 md:pt-16 pb-8 md:pb-12 relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 relative">
          {/* Brain as background on mobile - positioned behind text */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
            <div className="relative">
              <Brain className="w-64 h-64 md:w-80 md:h-80 text-purple-400/100 mx-auto animate-float-cosmic" />
              
              {/* Simplified glow effect for mobile */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-blue-900/90 rounded-full blur-2xl animate-pulse"
                style={{
                  width: '300px',
                  height: '300px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
            {/* Left Column - Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="max-w-2xl mx-auto lg:mx-0">
                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-size-200 animate-gradient">
                    Asah Otak
                  </span>
                  <br />
                  <span className="text-white">Di <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">QuizSep</span> Pengetahuan</span>
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Bergabung dengan komunitas pembelajar terbesar di Indonesia. Jelajahi galaksi pengetahuan melalui quiz interaktif yang dirancang oleh para ahli pendidikan.
                </p>

                {/* Stats with Glow Effect */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 md:gap-6 mb-6 md:mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1 relative`}>
                          <div className="absolute -inset-1 bg-gradient-to-r blur-lg opacity-30" style={{ background: `linear-gradient(to right, ${stat.gradient})` }} />
                          <span className="relative">{stat.value}</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link
                    to={user ? "/quiz" : "/register"}
                    className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-base md:text-lg font-bold hover:shadow-2xl transition-all duration-300 overflow-hidden text-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {user ? '🚀 Mulai Quiz' : '🚀 Daftar Sekarang'}
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>

                  <Link
                    to="/quiz"
                    className="group px-5 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-gray-600/50 text-gray-300 rounded-xl text-base md:text-lg font-bold hover:border-purple-500/50 hover:text-white hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-3"
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Lihat Kategori</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Full Brain Animation (Desktop only) */}
            <div className="hidden lg:flex lg:w-1/2 w-full items-center justify-center relative min-h-[500px]">
              <div className="relative w-full max-w-xl">
                {/* Orbiting Planets */}
                <div className="absolute inset-0">
                  {[1, 2, 3].map((planet) => (
                    <div
                      key={planet}
                      className="absolute rounded-full animate-orbit"
                      style={{
                        width: `${20 + planet * 8}px`,
                        height: `${20 + planet * 8}px`,
                        top: '50%',
                        left: '50%',
                        animationDuration: `${20 + planet * 5}s`,
                        animationDelay: `${planet * 2}s`,
                      }}
                    >
                      <div className={`w-full h-full rounded-full bg-gradient-to-r ${planet === 1 ? 'from-purple-500/30 to-pink-500/30' :
                        planet === 2 ? 'from-blue-500/30 to-cyan-500/30' :
                          'from-emerald-500/30 to-teal-500/30'
                        } blur-sm`} />
                    </div>
                  ))}
                </div>

                {/* Main Brain Container */}
                <div className="relative z-10">
                  {/* Galactic Core Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-blue-900/40 rounded-full blur-3xl animate-pulse"
                    style={{
                      width: '500px',
                      height: '500px',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${1 + Math.sin(pulse * 0.1) * 0.05}) rotate(${pulse * 0.1}deg)`
                    }} />

                  {/* Orbital Rings */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {[1, 2, 3].map((ring) => (
                      <div
                        key={ring}
                        className="absolute border border-purple-400/10 rounded-full animate-spin-slow"
                        style={{
                          width: `${300 + ring * 80}px`,
                          height: `${300 + ring * 80}px`,
                          animationDelay: `${ring * 0.5}s`,
                          animationDuration: `${30 + ring * 10}s`,
                          borderColor: `rgba(139, 92, 246, ${0.1 / ring})`
                        }}
                      />
                    ))}
                  </div>

                  {/* Cosmic Brain */}
                  <div className="relative">
                    <Brain className="w-[400px] h-[400px] text-purple-400/80 mx-auto drop-shadow-2xl animate-float-cosmic"
                      style={{
                        filter: `drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))`,
                        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) rotate(${mousePosition.x * 2}deg)`
                      }} />

                    {/* Neural Connections */}
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                      {[...Array(8)].map((_, i) => {
                        const angle = (i * 45 * Math.PI) / 180
                        const radius = 180
                        const x = Math.cos(angle) * radius
                        const y = Math.sin(angle) * radius

                        return (
                          <div
                            key={i}
                            className="absolute w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full animate-pulse"
                            style={{
                              top: `calc(50% + ${y}px)`,
                              left: `calc(50% + ${x}px)`,
                              transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          />
                        )
                      })}
                    </div>

                    {/* Floating Asteroids */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45 * Math.PI) / 180
                      const radius = 150
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius

                      return (
                        <div
                          key={i}
                          className="absolute w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-bounce-cosmic"
                          style={{
                            top: `calc(50% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s'
                          }}
                        >
                          <div className="relative">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-full blur-sm" />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full" />
                            <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-blue-300" />
                          </div>
                        </div>
                      )
                    })}

                    {/* Central Supernova */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-600/60 via-pink-600/50 to-blue-600/60 rounded-full flex items-center justify-center shadow-2xl animate-ping-cosmic">
                          <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-purple-600" />
                          </div>
                        </div>
                        {/* Energy Waves */}
                        <div className="absolute inset-0 animate-energy-wave">
                          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full" />
                          <div className="absolute inset-4 border-2 border-pink-400/20 rounded-full" />
                          <div className="absolute inset-8 border-2 border-blue-400/10 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shooting Stars */}
                  <div className="absolute inset-0">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-white to-cyan-300 rounded-full animate-shooting-star"
                        style={{
                          top: `${20 + i * 20}%`,
                          left: `${10 + i * 15}%`,
                          animationDelay: `${i * 3}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}