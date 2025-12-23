import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { useQuiz } from './QuizContext'

const AdminContext = createContext({})

export const useAdmin = () => useContext(AdminContext)

export const AdminProvider = ({ children }) => {
  const { user } = useAuth()
  const { categories: quizCategories } = useQuiz()
  
  // State untuk data admin
  const [questions, setQuestions] = useState([])
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Load questions
        const savedQuestions = localStorage.getItem('quizQuestions')
        if (savedQuestions) {
          const parsedQuestions = JSON.parse(savedQuestions)
          setQuestions(Array.isArray(parsedQuestions) ? parsedQuestions : [])
        }

        // Load users
        const savedUsers = localStorage.getItem('registeredUsers')
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers)
          setRegisteredUsers(Array.isArray(parsedUsers) ? parsedUsers : [])
        }
      } catch (err) {
        console.error('Error loading admin data:', err)
        setError('Gagal memuat data admin')
        setQuestions([])
        setRegisteredUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Save questions to localStorage automatically
  useEffect(() => {
    if (questions.length > 0) {
      try {
        localStorage.setItem('quizQuestions', JSON.stringify(questions))
      } catch (err) {
        console.error('Error saving questions:', err)
      }
    }
  }, [questions])

  // Save users to localStorage automatically
  useEffect(() => {
    if (registeredUsers.length > 0) {
      try {
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      } catch (err) {
        console.error('Error saving users:', err)
      }
    }
  }, [registeredUsers])

  // === QUESTION MANAGEMENT ===
  const addQuestion = useCallback((questionData) => {
    try {
      const newQuestion = {
        ...questionData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }
      setQuestions(prev => [...prev, newQuestion])
      return { success: true, data: newQuestion }
    } catch (err) {
      console.error('Error adding question:', err)
      return { success: false, error: 'Gagal menambah soal' }
    }
  }, [])

  const updateQuestion = useCallback((id, questionData) => {
    try {
      setQuestions(prev => prev.map(q => 
        q.id === id ? { ...questionData, id, updatedAt: new Date().toISOString() } : q
      ))
      return { success: true }
    } catch (err) {
      console.error('Error updating question:', err)
      return { success: false, error: 'Gagal mengupdate soal' }
    }
  }, [])

  const deleteQuestion = useCallback((id) => {
    try {
      setQuestions(prev => prev.filter(q => q.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting question:', err)
      return { success: false, error: 'Gagal menghapus soal' }
    }
  }, [])

  const getQuestionById = useCallback((id) => {
    return questions.find(q => q.id === id) || null
  }, [questions])

  // === USER MANAGEMENT ===
  const deleteUser = useCallback((id) => {
    try {
      // Cek jika user sedang login
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
      if (currentUser && currentUser.id === id) {
        return { 
          success: false, 
          error: 'Tidak dapat menghapus akun yang sedang aktif!' 
        }
      }

      // Hapus user
      setRegisteredUsers(prev => prev.filter(u => u.id !== id))
      
      // Hapus data terkait
      try {
        const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}')
        delete userProfiles[id]
        localStorage.setItem('userProfiles', JSON.stringify(userProfiles))
      } catch (e) {
        console.warn('Error cleaning user profiles:', e)
      }
      
      try {
        const quizProgress = JSON.parse(localStorage.getItem('quizProgress') || '{}')
        delete quizProgress[id]
        localStorage.setItem('quizProgress', JSON.stringify(quizProgress))
      } catch (e) {
        console.warn('Error cleaning quiz progress:', e)
      }

      return { success: true }
    } catch (err) {
      console.error('Error deleting user:', err)
      return { success: false, error: 'Gagal menghapus pengguna' }
    }
  }, [])

  const resetUserPassword = useCallback((id) => {
    try {
      const updatedUsers = registeredUsers.map(u => 
        u.id === id ? { ...u, password: 'reset123', passwordResetAt: new Date().toISOString() } : u
      )
      setRegisteredUsers(updatedUsers)
      return { success: true }
    } catch (err) {
      console.error('Error resetting password:', err)
      return { success: false, error: 'Gagal mereset password' }
    }
  }, [registeredUsers])

  // === FILTER FUNCTIONS ===
  const filterQuestions = useCallback((filters = {}) => {
    const {
      search = '',
      category = 'all',
      difficulty = 'all'
    } = filters

    return questions.filter(q => {
      if (!q || typeof q !== 'object') return false
      
      const questionText = q.question || ''
      const categoryText = q.category || ''
      const searchTerm = search || ''
      
      const matchesSearch = !searchTerm || 
        questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryText.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = category === 'all' || q.category === category
      const matchesDifficulty = difficulty === 'all' || q.difficulty === difficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [questions])

  const filterUsers = useCallback((filters = {}) => {
    const {
      search = '',
      role = 'all'
    } = filters

    return registeredUsers.filter(u => {
      if (!u || typeof u !== 'object') return false
      
      const name = u.name || ''
      const email = u.email || ''
      const searchTerm = search || ''
      
      const matchesSearch = !searchTerm || 
        name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRole = role === 'all' || (u.role || 'user') === role
      
      return matchesSearch && matchesRole
    })
  }, [registeredUsers])

  // === STATISTICS ===
  const getStats = useCallback(() => {
    return {
      totalQuestions: questions.length,
      totalUsers: registeredUsers.length,
      totalCategories: quizCategories.length,
      activeUsers: registeredUsers.filter(u => u.status === 'active').length,
      easyQuestions: questions.filter(q => q.difficulty === 'Mudah').length,
      mediumQuestions: questions.filter(q => q.difficulty === 'Sedang').length,
      hardQuestions: questions.filter(q => q.difficulty === 'Sulit').length,
    }
  }, [questions, registeredUsers, quizCategories])

  const value = {
    // Data
    questions,
    registeredUsers,
    quizCategories,
    
    // Loading state
    isLoading,
    error,
    
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById,
    
    deleteUser,
    resetUserPassword,
    
    filterQuestions,
    filterUsers,
    
    getStats,
    
    // 
    isAdmin: user?.role === 'admin' || false,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export default AdminContext