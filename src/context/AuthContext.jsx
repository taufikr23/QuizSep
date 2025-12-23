// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load users from localStorage
  const getRegisteredUsers = () => {
    const storedUsers = localStorage.getItem('registeredUsers')
    if (storedUsers) {
      return JSON.parse(storedUsers)
    }
    // Default users
    return [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@quiz.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        id: 2,
        name: 'User Demo',
        email: 'user@quiz.com',
        password: 'user123',
        role: 'user'
      }
    ]
  }

  const saveRegisteredUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users))
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const registeredUsers = getRegisteredUsers()
    const foundUser = registeredUsers.find(
      user => user.email === email && user.password === password
    )

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      }
      
      setUser(userData)
      localStorage.setItem('quizUser', JSON.stringify(userData))
      
      return { success: true, user: userData }
    }
    
    return { success: false, message: 'Email atau password salah' }
  }

  const register = (name, email, password) => {
    const registeredUsers = getRegisteredUsers()
    const existingUser = registeredUsers.find(user => user.email === email)
    
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar' }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    }

    const updatedUsers = [...registeredUsers, newUser]
    saveRegisteredUsers(updatedUsers)

    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }

    setUser(userData)
    localStorage.setItem('quizUser', JSON.stringify(userData))
    
    return { success: true, user: userData }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('quizUser')
  }

  const updateProfile = (updatedData) => {
    if (!user) return { success: false, message: 'User not logged in' }

    const registeredUsers = getRegisteredUsers()
    const userIndex = registeredUsers.findIndex(u => u.id === user.id)
    
    if (userIndex === -1) {
      return { success: false, message: 'User not found' }
    }

    const updatedUser = {
      ...registeredUsers[userIndex],
      ...updatedData
    }
    
    if (updatedData.password) {
      updatedUser.password = updatedData.password
    }
    
    registeredUsers[userIndex] = updatedUser
    saveRegisteredUsers(registeredUsers)

    const userData = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    }

    setUser(userData)
    localStorage.setItem('quizUser', JSON.stringify(userData))
    
    return { success: true, user: userData }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}