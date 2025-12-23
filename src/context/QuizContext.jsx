// src/contexts/QuizContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'

const QuizContext = createContext()

export const useQuiz = () => useContext(QuizContext)

// Initial data
const categories = [
  { id: 1, name: 'Matematika' },
  { id: 2, name: 'Bahasa Inggris' },
  { id: 3, name: 'Fisika' },
  { id: 4, name: 'Kimia' },
  { id: 5, name: 'Biologi' },
  { id: 6, name: 'Sejarah' },
  { id: 7, name: 'Geografi' },
  { id: 8, name: 'Ekonomi' }
]

const initialQuestions = [
  {
    id: 1,
    question: 'Berapakah hasil dari 15 × 8?',
    category: 'Matematika',
    options: ['100', '110', '120', '130'],
    correctAnswer: 2,
    explanation: '15 × 8 = 120'
  },
  {
    id: 2,
    question: 'What is the past tense of "go"?',
    category: 'Bahasa Inggris',
    options: ['goed', 'went', 'goes', 'going'],
    correctAnswer: 1,
    explanation: 'The past tense of "go" is "went"'
  },
  {
    id: 3,
    question: 'Siapa penemu hukum gravitasi?',
    category: 'Fisika',
    options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
    correctAnswer: 1,
    explanation: 'Isaac Newton menemukan hukum gravitasi'
  },
  {
    id: 4,
    question: 'Unsur kimia dengan simbol O adalah...',
    category: 'Kimia',
    options: ['Osmium', 'Oksigen', 'Ozon', 'Oganeson'],
    correctAnswer: 1,
    explanation: 'O adalah simbol untuk Oksigen (Oxygen)'
  },
  {
    id: 5,
    question: 'Organel sel yang berfungsi sebagai tempat respirasi adalah...',
    category: 'Biologi',
    options: ['Nukleus', 'Mitokondria', 'Ribosom', 'Lisosom'],
    correctAnswer: 1,
    explanation: 'Mitokondria adalah organel tempat berlangsungnya respirasi sel'
  },
  {
    id: 6,
    question: 'Siapakah proklamator kemerdekaan Indonesia?',
    category: 'Sejarah',
    options: ['Soekarno-Hatta', 'Soeharto-Habibie', 'Gus Dur-Megawati', 'Jokowi-Kalla'],
    correctAnswer: 0,
    explanation: 'Soekarno dan Hatta adalah proklamator kemerdekaan Indonesia'
  },
  {
    id: 7,
    question: 'Ibukota negara Jepang adalah...',
    category: 'Geografi',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctAnswer: 2,
    explanation: 'Tokyo adalah ibukota Jepang'
  },
  {
    id: 8,
    question: 'Inflasi adalah...',
    category: 'Ekonomi',
    options: ['Penurunan harga barang', 'Kenaikan harga barang secara umum', 'Stabilitas harga', 'Defisit anggaran'],
    correctAnswer: 1,
    explanation: 'Inflasi adalah kenaikan harga barang dan jasa secara umum dan terus-menerus'
  },
  {
    id: 9,
    question: 'Berapakah hasil dari √144?',
    category: 'Matematika',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: '√144 = 12 karena 12 × 12 = 144'
  },
  {
    id: 10,
    question: 'Synonym dari "happy" adalah...',
    category: 'Bahasa Inggris',
    options: ['Sad', 'Angry', 'Joyful', 'Tired'],
    correctAnswer: 2,
    explanation: '"Joyful" memiliki arti yang sama dengan "happy"'
  }
]

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    const savedQuestions = localStorage.getItem('quizQuestions')
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions))
    } else {
      setQuestions(initialQuestions)
      localStorage.setItem('quizQuestions', JSON.stringify(initialQuestions))
    }

    const savedResults = localStorage.getItem('quizResults')
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    }
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('quizQuestions', JSON.stringify(questions))
    }
  }, [questions])

  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: Date.now()
    }
    setQuestions(prev => [...prev, newQuestion])
  }

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, ...updatedQuestion } : q)
    )
  }

  const deleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const calculateResults = () => {
    const newResult = {
      id: Date.now(),
      date: new Date().toISOString(),
      score: Math.floor(Math.random() * 100) + 1
    }
    setResults(prev => [newResult, ...prev])
    localStorage.setItem('quizResults', JSON.stringify([newResult, ...results]))
  }

  const getQuestionsByCategory = (category) => {
    return questions.filter(q => q.category === category)
  }

  const getCategories = () => {
    return categories.map(cat => ({
      ...cat,
      count: questions.filter(q => q.category === cat.name).length
    }))
  }

  const value = {
    questions,
    categories: getCategories(),
    results,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    calculateResults,
    getQuestionsByCategory
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}