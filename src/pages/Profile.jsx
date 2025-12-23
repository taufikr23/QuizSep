// src/pages/Profile.jsx - VERSI BAHASA INDONESIA
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Calendar, Award, Edit, LogOut, Trophy, 
  Clock, Sparkles, ChevronRight, Shield, Brain, BookOpen, 
  Lock, Eye, EyeOff, BarChart2, Target, Zap, Star, 
  Percent, TrendingUp, Rocket, Home, X
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [stars, setStars] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    categoriesCompleted: 0,
    streakDays: 0
  });

  const [categoryProgress, setCategoryProgress] = useState([]);

  // Inisialisasi latar belakang bintang kosmik
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load statistik kuis user dari localStorage
  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = () => {
    try {
      // Ambil semua hasil kuis dari localStorage
      const allQuizKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('quiz_') || key === 'quizResults'
      );
      
      let allResults = [];
      
      // Coba baca dari key khusus 'quizResults' dulu
      const savedResults = localStorage.getItem('quizResults');
      if (savedResults) {
        try {
          const parsedResults = JSON.parse(savedResults);
          if (Array.isArray(parsedResults)) {
            allResults = parsedResults;
          }
        } catch (error) {
          console.log('Error parsing quizResults:', error);
        }
      }
      
      // Jika tidak ada di quizResults, cari semua key yang dimulai dengan 'quiz_'
      if (allResults.length === 0) {
        allQuizKeys.forEach(key => {
          if (key.startsWith('quiz_')) {
            try {
              const result = localStorage.getItem(key);
              if (result) {
                const parsedResult = JSON.parse(result);
                allResults.push(parsedResult);
              }
            } catch (error) {
              console.log(`Error parsing ${key}:`, error);
            }
          }
        });
      }
      
      // Hitung statistik
      const stats = calculateUserStats(allResults);
      setUserStats(stats);
      
      // Hitung progress per kategori
      const progress = calculateCategoryProgress(allResults);
      setCategoryProgress(progress);
      
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const calculateUserStats = (quizResults) => {
    if (!quizResults || quizResults.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTime: 0,
        categoriesCompleted: 0,
        streakDays: 0
      };
    }

    // Validasi dan filter data yang tidak valid
    const validResults = quizResults.filter(result => 
      result && typeof result.score === 'number' && result.category
    );

    if (validResults.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTime: 0,
        categoriesCompleted: 0,
        streakDays: 0
      };
    }

    const totalQuizzes = validResults.length;
    const totalScore = validResults.reduce((sum, result) => sum + result.score, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const bestScore = Math.max(...validResults.map(r => r.score));
    
    // Hitung total waktu (jika ada data waktu)
    const totalTime = validResults.reduce((sum, result) => {
      if (result.timeUsed) {
        // timeUsed dalam detik
        return sum + result.timeUsed;
      }
      // Default 5 menit per quiz jika tidak ada data
      return sum + 300;
    }, 0);

    // Hitung kategori yang sudah diselesaikan (score > 0)
    const categoriesCompleted = [...new Set(validResults
      .filter(r => r.score > 0)
      .map(r => r.category))].length;

    // Hitung streak days (sederhana: jumlah quiz dalam 7 hari terakhir)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentQuizzes = validResults.filter(result => {
      if (result.date) {
        const quizDate = new Date(result.date);
        return quizDate > sevenDaysAgo;
      }
      return false;
    });
    
    const streakDays = Math.min(recentQuizzes.length, 30);

    return {
      totalQuizzes,
      averageScore,
      bestScore,
      totalTime,
      categoriesCompleted,
      streakDays
    };
  };

  const calculateCategoryProgress = (quizResults) => {
    const categories = [
      'Matematika', 'Bahasa Inggris', 'Fisika', 'Kimia', 
      'Biologi', 'Sejarah', 'Geografi', 'Ekonomi'
    ];
    
    const progressData = categories.map(category => {
      // Cari hasil kuis untuk kategori ini
      const categoryResults = quizResults.filter(result => 
        result && result.category && result.category.toLowerCase().includes(category.toLowerCase())
      );
      
      if (categoryResults.length === 0) {
        return {
          category,
          progress: 0,
          score: 0,
          count: 0,
          color: getCategoryColor(category)
        };
      }
      
      // Hitung rata-rata score untuk kategori ini
      const totalScore = categoryResults.reduce((sum, result) => sum + result.score, 0);
      const avgScore = Math.round(totalScore / categoryResults.length);
      
      // Hitung progress (score maksimal 100%)
      const progress = Math.min(avgScore, 100);
      
      return {
        category,
        progress,
        score: avgScore,
        count: categoryResults.length,
        color: getCategoryColor(category)
      };
    });
    
    // Urutkan berdasarkan progress tertinggi
    return progressData.sort((a, b) => b.progress - a.progress);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Matematika': 'from-blue-500 to-cyan-500',
      'Bahasa Inggris': 'from-emerald-500 to-teal-500',
      'Fisika': 'from-purple-500 to-violet-500',
      'Kimia': 'from-amber-500 to-orange-500',
      'Biologi': 'from-rose-500 to-pink-500',
      'Sejarah': 'from-yellow-500 to-amber-500',
      'Geografi': 'from-teal-500 to-cyan-500',
      'Ekonomi': 'from-indigo-500 to-blue-500'
    };
    
    return colors[category] || 'from-gray-500 to-gray-700';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden relative">
        {/* Latar Belakang Kosmik */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <User className="w-10 h-10 text-white" />
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Silakan Login Terlebih Dahulu</h2>
            <p className="text-gray-400 mb-8">Anda perlu login untuk melihat profil kosmik Anda</p>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transition-all"
            >
              <Rocket className="w-5 h-5" />
              Ke Halaman Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    if (!editData.name.trim()) {
      setMessage({ text: 'Nama diperlukan', type: 'error' });
      return;
    }

    const result = updateProfile({
      name: editData.name,
      email: editData.email,
    });

    if (result.success) {
      setIsEditing(false);
      setMessage({ text: 'Profil berhasil diperbarui!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } else {
      setMessage({ text: result.message || 'Gagal memperbarui profil', type: 'error' });
    }
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword) {
      setMessage({ text: 'Password saat ini diperlukan', type: 'error' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ text: 'Password baru minimal 6 karakter', type: 'error' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'Password tidak cocok', type: 'error' });
      return;
    }

    const result = updateProfile({
      password: passwordData.newPassword
    });

    if (result.success) {
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setMessage({ text: 'Password berhasil diubah!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } else {
      setMessage({ text: 'Gagal mengubah password', type: 'error' });
    }
  };

  // Format waktu dari detik ke menit
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  // Data statistik user
  const statsCards = [
    { 
      icon: <Trophy className="w-5 h-5" />, 
      label: 'Kuis Diselesaikan', 
      value: userStats.totalQuizzes, 
      subtext: 'Perjalanan kosmik',
      gradient: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20',
      border: 'border-amber-500/30',
      color: 'text-amber-400'
    },
    { 
      icon: <Target className="w-5 h-5" />, 
      label: 'Rata-rata Skor', 
      value: `${userStats.averageScore}%`, 
      subtext: 'Penampilan bintang',
      gradient: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20',
      border: 'border-emerald-500/30',
      color: 'text-emerald-400'
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: 'Skor Terbaik', 
      value: `${userStats.bestScore}%`, 
      subtext: 'Pencapaian tertinggi',
      gradient: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      color: 'text-blue-400'
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      label: 'Total Waktu', 
      value: formatTime(userStats.totalTime), 
      subtext: 'Waktu menjelajah',
      gradient: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30',
      color: 'text-purple-400'
    },
  ];

  // Data progress - sekarang menggunakan data real
  const progressData = categoryProgress.length > 0 
    ? categoryProgress.slice(0, 6) // Ambil 6 kategori teratas
    : [
        { category: 'Matematika', progress: 85, color: 'from-blue-500 to-cyan-500' },
        { category: 'Bahasa Inggris', progress: 70, color: 'from-emerald-500 to-teal-500' },
        { category: 'Fisika', progress: 60, color: 'from-purple-500 to-violet-500' },
        { category: 'Kimia', progress: 45, color: 'from-amber-500 to-orange-500' },
        { category: 'Biologi', progress: 80, color: 'from-rose-500 to-pink-500' },
        { category: 'Sejarah', progress: 55, color: 'from-yellow-500 to-amber-500' },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden relative">
      {/* Latar Belakang Kosmik */}
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

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-full blur-3xl" />
      </div>

      {/* Bagian Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-cyan-900/80 pt-12 pb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm backdrop-blur-sm bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 group-hover:border-purple-400/50 transition-all duration-300">
                <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center border-2 border-white/80 shadow-lg">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-pulse" />
            </div>

            {/* Info User */}
            <div className="flex-1 text-white">
              {isEditing ? (
                <div className="space-y-4 max-w-md">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Masukkan nama kosmik Anda"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="kosmik@penjelajah.com"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                    {user.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 px-3 py-1.5 rounded-lg">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 px-3 py-1.5 rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span>Bergabung {new Date().toLocaleDateString('id-ID', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm border border-purple-400/30 rounded-full text-sm capitalize">
                      {user.role || 'Kosmik'} Explorer
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-2 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative">Simpan Perubahan</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({ name: user.name, email: user.email });
                    }}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profil
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Ubah Password
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-rose-500/30 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl backdrop-blur-xl ${
            message.type === 'success' 
              ? 'bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 text-emerald-300' 
              : 'bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-center gap-3">
              {message.type === 'success' ? 
                <div className="p-2 bg-emerald-900/50 rounded-lg"><Zap className="w-4 h-4" /></div> : 
                <div className="p-2 bg-red-900/50 rounded-lg"><Brain className="w-4 h-4" /></div>
              }
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        )}

        {/* Modal Ubah Password */}
        {isChangingPassword && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 rounded-2xl p-6 max-w-md w-full animate-slide-up border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Ubah Password
                </h3>
                <button 
                  onClick={() => setIsChangingPassword(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password Saat Ini
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm"
                      placeholder="Masukkan password saat ini"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm"
                      placeholder="Masukkan password baru"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm"
                    placeholder="Konfirmasi password baru"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="flex-1 px-4 py-3 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative">Perbarui Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div 
              key={index}
              className="rounded-xl shadow-2xl p-6 border border-white/10 hover:shadow-purple-500/10 transition-all duration-300 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-950/80"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.gradient} border ${stat.border}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri - Progress & Aksi */}
          <div className="lg:col-span-2 space-y-8">
         
            {/* Progress per Kategori */}
            <div className="rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-950/80">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-purple-400" />
                  Progress berdasarkan Konstelasi
                  {userStats.totalQuizzes === 0 && (
                    <span className="text-sm font-normal text-gray-400 ml-2">
                      (Selesaikan kuis untuk melihat progress)
                    </span>
                  )}
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {progressData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{item.progress}%</span>
                          {item.count > 0 && (
                            <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                              {item.count} kuis
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      {item.progress === 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Belum ada kuis yang diselesaikan di kategori ini
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                {userStats.totalQuizzes === 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl">
                    <p className="text-blue-300 text-sm flex items-center gap-2">
                      <Rocket className="w-4 h-4" />
                      Mulai perjalanan kosmik Anda! Selesaikan kuis pertama Anda untuk melihat progress di sini.
                    </p>
                    <Link 
                      to="/quiz"
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm hover:shadow-lg"
                    >
                      <Trophy className="w-4 h-4" />
                      Mulai Kuis Pertama
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Akun & Hasil Terbaru */}
          <div className="space-y-8">
            {/* Detail Akun */}
            <div className="rounded-2xl shadow-2xl border border-white/10 p-6 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-950/80">
              <h2 className="text-xl font-bold text-white mb-6">Profil Kosmik</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-1 block">ID Explorer</label>
                  <div className="px-4 py-3 bg-gray-800/50 rounded-xl text-white font-mono backdrop-blur-sm border border-white/10">
                    #{user.id?.toString().padStart(6, '0') || '000000'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-1 block">Status Akun</label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30">
                      Explorer Aktif
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-1 block">Anggota Sejak</label>
                  <div className="px-4 py-3 bg-gray-800/50 rounded-xl text-white backdrop-blur-sm border border-white/10">
                    {new Date().toLocaleDateString('id-ID', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-1 block">Streak Kosmik</label>
                  <div className="flex items-center gap-2">
                    <FlameIcon />
                    <span className="font-bold text-white">{userStats.streakDays} hari</span>
                    <span className="text-sm text-gray-400">berturut-turut</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-1 block">Kategori Diselesaikan</label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-bold text-white">{userStats.categoriesCompleted}</span>
                    <span className="text-sm text-gray-400">dari 8 konstelasi</span>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen ikon api untuk streak
const FlameIcon = () => (
  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);



export default Profile;