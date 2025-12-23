import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAdmin } from '../context/AdminContext'
import { 
  Trash2, Edit, Users, FileText, BarChart, Sparkles,
  Search, Eye, EyeOff, X, Save, Brain,
  UserMinus, RefreshCw, AlertCircle, Shield,
  Home, Plus, Database, FileCode, CheckCircle, Info
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Import data soal asli
import { initialQuestions } from '../data/questions'

// Toast Notification Component
const Toast = ({ type, title, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-emerald-500/20 border-emerald-500/30' :
                  type === 'error' ? 'bg-red-500/20 border-red-500/30' :
                  'bg-blue-500/20 border-blue-500/30'
  
  const textColor = type === 'success' ? 'text-emerald-300' :
                    type === 'error' ? 'text-red-300' :
                    'text-blue-300'
  
  const icon = type === 'success' ? <CheckCircle className="w-4 h-4" /> :
               type === 'error' ? <AlertCircle className="w-4 h-4" /> :
               <Info className="w-4 h-4" />

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} border rounded-lg p-3 max-w-sm shadow-lg backdrop-blur-sm`}>
        <div className="flex items-start gap-2">
          <div className={`p-1.5 rounded-full ${textColor}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white text-sm">{title}</h4>
            <p className="text-gray-300 text-xs mt-1">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Admin = () => {
  const { user } = useAuth()
  const {
    questions: adminQuestions,
    registeredUsers,
    quizCategories,
    isLoading,
    error,
    isAdmin,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteUser,
    resetUserPassword,
    filterQuestions,
    filterUsers,
    getStats
  } = useAdmin()
  
  // UI State
  const [activeTab, setActiveTab] = useState('questions')
  const [showForm, setShowForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [editingQuestion, setEditingQuestion] = useState(null)
  
  // Toast Notification State
  const [toast, setToast] = useState({
    show: false,
    type: 'success', // 'success', 'error', 'info'
    title: '',
    message: ''
  })
  
  const [filters, setFilters] = useState({ 
    search: '', 
    category: 'all', 
    difficulty: 'all',
    showAnswer: false
  })
  
  const [formData, setFormData] = useState({
    question: '', 
    category: 'Matematika', 
    options: ['', '', '', ''],
    correctAnswer: 0, 
    explanation: '',
    difficulty: 'Sedang'
  })

  // State untuk data soal gabungan
  const [combinedQuestions, setCombinedQuestions] = useState([])

  // Show toast function
  const showToast = (type, title, message) => {
    setToast({
      show: true,
      type,
      title,
      message
    })
    
    // Auto hide setelah 4 detik
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  // Gabungkan data dari questions.js dan localStorage
  useEffect(() => {
    const questionsFromFile = initialQuestions.map(q => ({ ...q, source: 'file' }))
    
    const questionsFromLocalStorage = adminQuestions?.map(q => ({ 
      ...q, 
      source: 'localStorage' 
    })) || []
    
    // Gabungkan, hindari duplikat berdasarkan id
    const allQuestionsMap = new Map()
    
    // Tambahkan dari file terlebih dahulu
    questionsFromFile.forEach(q => {
      allQuestionsMap.set(q.id, q)
    })
    
    // Tambahkan dari localStorage (akan menimpa jika id sama)
    questionsFromLocalStorage.forEach(q => {
      allQuestionsMap.set(q.id, q)
    })
    
    const combined = Array.from(allQuestionsMap.values())
      .sort((a, b) => (a.id || 0) - (b.id || 0))
    
    setCombinedQuestions(combined)
  }, [adminQuestions])

  // Get stats
  const stats = getStats()
  
  // Filter data
  const filteredQuestions = combinedQuestions.filter(q => {
    if (!q || typeof q !== 'object') return false
    
    const questionText = q.question || ''
    const categoryText = q.category || ''
    const searchTerm = filters.search || ''
    
    const matchesSearch = !searchTerm || 
      questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryText.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filters.category === 'all' || q.category === filters.category
    const matchesDifficulty = filters.difficulty === 'all' || q.difficulty === filters.difficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const filteredUsers = registeredUsers?.filter(u => {
    if (!u || typeof u !== 'object') return false
    
    const name = u.name || ''
    const email = u.email || ''
    const searchTerm = filters.search || ''
    
    const matchesSearch = !searchTerm || 
      name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filters.category === 'all' || (u.role || 'user') === filters.category
    
    return matchesSearch && matchesRole
  }) || []

  // Handle question form submission
  const handleQuestionSubmit = async (e) => {
    e.preventDefault()
    
    // Validasi data
    if (!formData.question.trim()) {
      showToast('error', 'Validasi Gagal', 'Pertanyaan tidak boleh kosong!')
      return
    }
    
    const validOptions = formData.options.filter(opt => opt.trim() !== '')
    if (validOptions.length < 2) {
      showToast('error', 'Validasi Gagal', 'Minimal 2 opsi jawaban harus diisi!')
      return
    }
    
    if (editingQuestion) {
      const result = await updateQuestion(editingQuestion.id, formData)
      if (result.success) {
        showToast('success', 'Berhasil!', 'Soal berhasil diperbarui.')
      } else {
        showToast('error', 'Gagal', result.error || 'Gagal mengupdate soal')
        return
      }
    } else {
      const result = await addQuestion(formData)
      if (result.success) {
        showToast('success', 'Berhasil!', 'Soal baru berhasil ditambahkan.')
      } else {
        showToast('error', 'Gagal', result.error || 'Gagal menambah soal')
        return
      }
    }
    
    // Reset form
    setShowForm(false)
    setEditingQuestion(null)
    setFormData({
      question: '', 
      category: 'Matematika', 
      options: ['', '', '', ''], 
      correctAnswer: 0, 
      explanation: '',
      difficulty: 'Sedang'
    })
  }

  // Handle user deletion
  const handleDeleteUser = async (userId, userName) => {
    const result = await deleteUser(userId)
    if (result.success) {
      showToast('success', 'Berhasil!', `Pengguna "${userName}" berhasil dihapus.`)
      setShowDeleteConfirm(null)
    } else {
      showToast('error', 'Gagal', result.error || 'Gagal menghapus pengguna')
    }
  }

  // Handle question deletion
  const handleDeleteQuestion = async (questionId) => {
    const result = await deleteQuestion(questionId)
    if (result.success) {
      showToast('success', 'Berhasil!', 'Soal berhasil dihapus.')
      setShowDeleteConfirm(null)
    } else {
      showToast('error', 'Gagal', result.error || 'Gagal menghapus soal')
    }
  }

  // Handle reset password
  const handleResetPassword = async (userId, userName) => {
    const result = await resetUserPassword(userId)
    if (result.success) {
      showToast('success', 'Password Direset', `Password untuk "${userName}" berhasil direset ke "reset123".`)
    } else {
      showToast('error', 'Gagal', result.error || 'Gagal mereset password')
    }
  }

  // Open form modal
  const openForm = (question = null) => {
    if (question) {
      setEditingQuestion(question)
      setFormData({
        question: question.question || '',
        category: question.category || 'Matematika',
        options: [...(question.options || ['', '', '', ''])],
        correctAnswer: question.correctAnswer || 0,
        explanation: question.explanation || '',
        difficulty: question.difficulty || 'Sedang'
      })
    } else {
      setEditingQuestion(null)
      setFormData({
        question: '', 
        category: 'Matematika', 
        options: ['', '', '', ''], 
        correctAnswer: 0, 
        explanation: '',
        difficulty: 'Sedang'
      })
    }
    setShowForm(true)
  }

  // StatCard component
  const StatCard = ({ icon, value, label, gradient, subtitle }) => (
    <div className="rounded-lg shadow-lg p-4 border border-white/10 hover:shadow-purple-500/10 transition-all duration-300 bg-gradient-to-br from-gray-900/80 to-gray-950/80">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${gradient} border border-white/20`}>
          {icon}
        </div>
        <div>
          <div className="text-xl font-bold text-white">{value}</div>
          <div className="text-gray-400 text-sm">{label}</div>
          {subtitle && <div className="text-gray-500 text-xs mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-300">Memuat data admin...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 flex items-center justify-center p-4">
        <div className="text-center bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10 rounded-xl shadow-lg p-6 max-w-md">
          <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Terjadi Kesalahan</h2>
          <p className="text-gray-300 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  // Admin check
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden relative">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="text-center bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10 rounded-xl shadow-lg p-6 max-w-md w-full">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              {!user ? 'Silakan masuk terlebih dahulu' : 'Akses ditolak'}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              {!user ? 'Anda perlu masuk sebagai admin untuk mengakses panel ini' : 'Hanya admin yang dapat mengakses panel ini'}
            </p>
            <Link 
              to={!user ? "/login" : "/"}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all text-sm"
            >
              {!user ? 'Masuk' : 'Kembali ke Home'}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Hitung statistik
  const fileQuestionsCount = combinedQuestions.filter(q => q.source === 'file').length
  const localStorageQuestionsCount = combinedQuestions.filter(q => q.source === 'localStorage').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden">
      {/* Toast Notification */}
      {toast.show && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
      
      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-cyan-900/80 text-white rounded-lg p-6 mb-6 border border-white/10 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h1 className="text-xl font-bold mb-1">Cosmic Admin Dashboard</h1>
              <p className="text-gray-300 text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Selamat datang, <span className="text-purple-300 font-semibold">{user.name || 'Admin'}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.location.reload()} 
                className="px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-1 text-sm"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
              <Link
                to="/"
                className="px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-1 text-sm"
              >
                <Home className="w-3 h-3" />
                Home
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={<FileText className="w-5 h-5 text-purple-400" />} 
            value={combinedQuestions.length} 
            label="Total Soal" 
            subtitle={`File: ${fileQuestionsCount} | Local: ${localStorageQuestionsCount}`}
            gradient="bg-gradient-to-r from-purple-500/20 to-pink-500/20"
          />
          <StatCard 
            icon={<BarChart className="w-5 h-5 text-emerald-400" />} 
            value={stats.totalCategories} 
            label="Kategori" 
            gradient="bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
          />
          <StatCard 
            icon={<Users className="w-5 h-5 text-amber-400" />} 
            value={stats.activeUsers || stats.totalUsers} 
            label={stats.activeUsers ? "Aktif" : "Pengguna"} 
            gradient="bg-gradient-to-r from-amber-500/20 to-orange-500/20"
          />
        </div>

        {/* Main Content */}
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-950/80 mb-6">
          {/* Tabs */}
          <div className="border-b border-white/10">
            <div className="flex space-x-3 px-4">
              <button 
                onClick={() => setActiveTab('questions')} 
                className={`py-3 border-b-2 font-medium transition-all text-sm ${activeTab === 'questions' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
              >
                <div className="flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  Kelola Soal ({combinedQuestions.length})
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('users')} 
                className={`py-3 border-b-2 font-medium transition-all text-sm ${activeTab === 'users' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
              >
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Kelola Pengguna ({registeredUsers?.length || 0})
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">Kelola Soal</h2>
                    <p className="text-gray-400 text-xs">
                      Menampilkan {filteredQuestions.length} dari {combinedQuestions.length} soal
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Div Sumber Data (dipindahkan ke kanan) */}
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1">
                        <FileCode className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-gray-300">File:</span>
                        <span className="text-xs text-white font-medium">{fileQuestionsCount}</span>
                      </div>
                      <div className="h-3 w-px bg-white/20"></div>
                      <div className="flex items-center gap-1">
                        <Database className="w-3 h-3 text-amber-400" />
                        <span className="text-xs text-gray-300">Local:</span>
                        <span className="text-xs text-white font-medium">{localStorageQuestionsCount}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => openForm()}
                      className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-1 text-sm"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Soal</span>
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 p-3 bg-gradient-to-br from-gray-900/60 to-gray-950/60 rounded-lg border border-white/10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Cari soal..." 
                      value={filters.search} 
                      onChange={e => setFilters({...filters, search: e.target.value})}
                      className="w-full pl-7 pr-2 py-1.5 bg-gray-800/50 border border-white/10 rounded focus:border-purple-500/50 text-white placeholder-gray-500 text-xs"
                    />
                  </div>
                  
                  <select 
                    value={filters.category} 
                    onChange={e => setFilters({...filters, category: e.target.value})}
                    className="px-2 py-1.5 bg-gray-800/50 border border-white/10 rounded focus:border-blue-500/50 text-white text-xs"
                  >
                    <option value="all">Semua Kategori</option>
                    {quizCategories?.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={filters.difficulty} 
                    onChange={e => setFilters({...filters, difficulty: e.target.value})}
                    className="px-2 py-1.5 bg-gray-800/50 border border-white/10 rounded focus:border-emerald-500/50 text-white text-xs"
                  >
                    <option value="all">Semua Tingkat</option>
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                  
                  <button 
                    onClick={() => setFilters({...filters, showAnswer: !filters.showAnswer})} 
                    className={`px-2 py-1.5 rounded flex items-center justify-center gap-1 border text-xs ${
                      filters.showAnswer ? 
                      'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 
                      'bg-gray-800/50 border-white/10 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {filters.showAnswer ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {filters.showAnswer ? 'Tampilkan' : 'Sembunyikan'} Jawaban
                  </button>
                </div>

                {/* Questions List */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredQuestions.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      Tidak ada soal ditemukan
                    </div>
                  ) : (
                    filteredQuestions.map(q => {
                      const isFromFile = q.source === 'file'
                      const isFromLocalStorage = q.source === 'localStorage'
                      
                      return (
                        <div key={q.id} className="p-3 border border-white/10 rounded-lg bg-gradient-to-br from-gray-900/60 to-gray-950/60">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-1 mb-2">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                                  {q.category || 'Tanpa Kategori'}
                                </span>
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                                  {q.difficulty || 'Sedang'}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full border ${
                                  isFromFile ? 
                                  'bg-purple-500/20 text-purple-300 border-purple-500/30' : 
                                  'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}>
                                  {isFromFile ? (
                                    <>
                                      <FileCode className="w-2.5 h-2.5 inline mr-1" />
                                      File
                                    </>
                                  ) : (
                                    <>
                                      <Database className="w-2.5 h-2.5 inline mr-1" />
                                      Local
                                    </>
                                  )}
                                </span>
                              </div>
                              
                              <h4 className="font-medium text-white mb-2 text-sm">{q.question || 'Pertanyaan tidak tersedia'}</h4>
                              
                              {filters.showAnswer && q.explanation && (
                                <div className="mb-3 p-2 bg-emerald-900/30 border border-emerald-500/30 rounded">
                                  <span className="font-medium text-emerald-300 text-xs">Penjelasan:</span>
                                  <p className="text-gray-300 text-xs mt-1">{q.explanation}</p>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {(q.options || []).map((option, idx) => (
                                  <div key={idx} className={`p-2 rounded border ${idx === q.correctAnswer ? 
                                    'bg-emerald-900/30 border-emerald-500/30' : 
                                    'bg-gray-900/50 border-white/10'
                                  }`}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                        idx === q.correctAnswer ? 
                                        'bg-emerald-500 text-white' : 
                                        'bg-gray-800 text-gray-400'
                                      }`}>
                                        {String.fromCharCode(65 + idx)}
                                      </div>
                                      <span className={idx === q.correctAnswer ? 'text-emerald-300 text-xs' : 'text-gray-300 text-xs'}>
                                        {option || 'Opsi kosong'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-1 ml-3">
                              <button 
                                onClick={() => openForm(q)}
                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded border border-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isFromFile}
                                title={isFromFile ? "Soal dari file tidak dapat diedit" : "Edit soal"}
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => setShowDeleteConfirm({ 
                                  type: 'question', 
                                  id: q.id,
                                  isFromFile: isFromFile,
                                  questionText: q.question || 'Soal ini'
                                })} 
                                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isFromFile}
                                title={isFromFile ? "Soal dari file tidak dapat dihapus" : "Hapus soal"}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 p-3 bg-gradient-to-br from-gray-900/60 to-gray-950/60 rounded-lg border border-white/10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Cari pengguna..." 
                      value={filters.search} 
                      onChange={e => setFilters({...filters, search: e.target.value})}
                      className="w-full pl-7 pr-2 py-1.5 bg-gray-800/50 border border-white/10 rounded focus:border-purple-500/50 text-white placeholder-gray-500 text-xs"
                    />
                  </div>
                  <select 
                    value={filters.category} 
                    onChange={e => setFilters({...filters, category: e.target.value})}
                    className="px-2 py-1.5 bg-gray-800/50 border border-white/10 rounded focus:border-blue-500/50 text-white text-xs"
                  >
                    <option value="all">Semua Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* Users Table */}
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    Tidak ada pengguna ditemukan
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded border border-white/10">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-900/80 to-gray-950/80 border-b border-white/10">
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Nama</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Email</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Role</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Status</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredUsers.map(u => (
                          <tr key={u.id} className="hover:bg-white/5">
                            <td className="px-3 py-2 font-medium text-white text-sm">{u.name || 'Tidak ada nama'}</td>
                            <td className="px-3 py-2 text-gray-300 text-sm">{u.email || 'Tidak ada email'}</td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                u.role === 'admin' ? 
                                'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 
                                'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              }`}>
                                {u.role || 'user'}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-1 text-xs rounded-full border ${
                                u.status === 'active' ?
                                'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                                'bg-gray-500/20 text-gray-300 border-gray-500/30'
                              }`}>
                                {u.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => setShowDeleteConfirm({ 
                                    type: 'resetPassword', 
                                    id: u.id, 
                                    name: u.name || u.email || 'Pengguna',
                                    userName: u.name || u.email
                                  })} 
                                  className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 hover:bg-amber-500/30"
                                >
                                  Reset PW
                                </button>
                                <button 
                                  onClick={() => setShowDeleteConfirm({ 
                                    type: 'user', 
                                    id: u.id, 
                                    name: u.name || u.email || 'Pengguna',
                                    userName: u.name || u.email
                                  })} 
                                  className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded border border-red-500/30 hover:bg-red-500/30 flex items-center gap-1"
                                >
                                  <UserMinus className="w-2.5 h-2.5" />Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* QUESTION FORM MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-3 max-w-sm w-full max-h-[80vh] overflow-y-auto border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-white">{editingQuestion ? 'Edit Soal' : 'Tambah Soal Baru'}</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              
              <form onSubmit={handleQuestionSubmit} className="space-y-2">
                {/* Question Text */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Pertanyaan</label>
                  <textarea 
                    value={formData.question} 
                    onChange={e => setFormData({...formData, question: e.target.value})}
                    className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs"
                    rows="2"
                    placeholder="Masukkan pertanyaan soal..."
                    required 
                    autoFocus
                  />
                </div>
                
                {/* Category and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Kategori</label>
                    <select 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs"
                    >
                      {quizCategories?.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Tingkat Kesulitan</label>
                    <select 
                      value={formData.difficulty} 
                      onChange={e => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs"
                    >
                      <option value="Mudah">Mudah</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Sulit">Sulit</option>
                    </select>
                  </div>
                </div>
                
                {/* Correct Answer */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Jawaban Benar</label>
                  <select 
                    value={formData.correctAnswer} 
                    onChange={e => setFormData({...formData, correctAnswer: parseInt(e.target.value) || 0})}
                    className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs"
                  >
                    {formData.options.map((_, i) => (
                      <option key={i} value={i}>Opsi {String.fromCharCode(65 + i)}</option>
                    ))}
                  </select>
                </div>
                
                {/* Options */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Pilihan Jawaban</label>
                  {formData.options.map((option, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                        formData.correctAnswer === i ? 
                        'bg-emerald-600 text-white' : 
                        'bg-gray-700 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <input 
                        type="text" 
                        value={option} 
                        onChange={e => {
                          const newOptions = [...formData.options]
                          newOptions[i] = e.target.value
                          setFormData({...formData, options: newOptions})
                        }}
                        className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs"
                        placeholder={`Opsi ${String.fromCharCode(65 + i)}...`}
                        required 
                      />
                    </div>
                  ))}
                </div>
                
                {/* Explanation */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Penjelasan (Opsional)</label>
                  <textarea 
                    value={formData.explanation} 
                    onChange={e => setFormData({...formData, explanation: e.target.value})}
                    className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs"
                    rows="2"
                    placeholder="Masukkan penjelasan jawaban..."
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-2 py-1.5 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 text-xs"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-2 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center gap-1 text-xs"
                  >
                    <Save className="w-3 h-3" />
                    <span>{editingQuestion ? 'Update' : 'Simpan'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-4 max-w-sm w-full border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded border ${
                  showDeleteConfirm.type === 'resetPassword' ? 
                  'bg-amber-900/30 border-amber-800' :
                  showDeleteConfirm.type === 'question' && showDeleteConfirm.isFromFile ?
                  'bg-purple-900/30 border-purple-800' :
                  'bg-red-900/30 border-red-800'
                }`}>
                  {showDeleteConfirm.type === 'resetPassword' ? (
                    <RefreshCw className="w-4 h-4 text-amber-400" />
                  ) : showDeleteConfirm.type === 'question' && showDeleteConfirm.isFromFile ? (
                    <Info className="w-4 h-4 text-purple-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {showDeleteConfirm.type === 'question' 
                      ? (showDeleteConfirm.isFromFile ? 'Informasi' : 'Hapus Soal') 
                      : showDeleteConfirm.type === 'resetPassword' ? 'Reset Password' : 'Hapus Pengguna'}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {showDeleteConfirm.type === 'question' 
                      ? (showDeleteConfirm.isFromFile 
                        ? 'Soal dari file tidak dapat dihapus. Anda hanya dapat mengeditnya.' 
                        : `Apakah Anda yakin ingin menghapus soal: "${showDeleteConfirm.questionText}"?`) 
                      : showDeleteConfirm.type === 'resetPassword' 
                      ? `Apakah Anda yakin ingin mereset password untuk "${showDeleteConfirm.userName}"? Password baru akan menjadi "reset123".`
                      : `Apakah Anda yakin ingin menghapus pengguna "${showDeleteConfirm.userName}"?`
                    }
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDeleteConfirm(null)} 
                  className="flex-1 px-3 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 text-sm"
                >
                  {showDeleteConfirm.type === 'question' && showDeleteConfirm.isFromFile ? 'Tutup' : 'Batal'}
                </button>
                {!(showDeleteConfirm.type === 'question' && showDeleteConfirm.isFromFile) && (
                  <button 
                    onClick={async () => {
                      if (showDeleteConfirm.type === 'question') {
                        await handleDeleteQuestion(showDeleteConfirm.id)
                      } else if (showDeleteConfirm.type === 'resetPassword') {
                        await handleResetPassword(showDeleteConfirm.id, showDeleteConfirm.userName)
                      } else {
                        await handleDeleteUser(showDeleteConfirm.id, showDeleteConfirm.userName)
                      }
                      setShowDeleteConfirm(null)
                    }}
                    className={`flex-1 px-3 py-2 rounded flex items-center justify-center gap-1 text-sm ${
                      showDeleteConfirm.type === 'resetPassword' 
                        ? 'bg-amber-600 text-white hover:bg-amber-700' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {showDeleteConfirm.type === 'resetPassword' ? (
                      <>
                        <RefreshCw className="w-3 h-3" />
                        Reset Password
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3" />
                        Ya, Hapus
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin  