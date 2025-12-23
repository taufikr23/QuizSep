import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initialQuestions } from '../data/questions';

const QuizResultsContext = createContext();

export const useQuizResults = () => {
  const context = useContext(QuizResultsContext);
  if (!context) {
    throw new Error('useQuizResults must be used within QuizResultsProvider');
  }
  return context;
};

export const QuizResultsProvider = ({ children }) => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [quizSummary, setQuizSummary] = useState(null);
  
  // Load quiz history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('quizResults')) || [];
    const savedSummary = JSON.parse(localStorage.getItem('quiz_summary')) || null;
    setQuizHistory(savedHistory);
    setQuizSummary(savedSummary);
  }, []);

  const getQuestionsForCategory = useCallback((categoryName, QUESTIONS_PER_QUIZ = 10) => {
    console.log(`🔍 Mencari soal untuk kategori: ${categoryName}`);
    
    // Filter soal berdasarkan kategori (case-insensitive)
    const allQuestions = initialQuestions.filter(q => {
      const soalKategori = q.category?.toLowerCase() || '';
      const kategoriDicari = categoryName?.toLowerCase() || '';
      return soalKategori === kategoriDicari;
    });
    
    console.log(`✅ Ditemukan ${allQuestions.length} soal untuk ${categoryName}`);
    
    // Jika TIDAK ADA soal untuk kategori ini, kembalikan array kosong
    // QuizSession akan menangani kasus ini (tampilkan pesan error)
    if (allQuestions.length === 0) {
      console.error(`❌ TIDAK ADA SOAL untuk kategori: ${categoryName}`);
      console.log(`📋 Kategori yang tersedia:`, 
        [...new Set(initialQuestions.map(q => q.category))]
      );
      return [];
    }
    
    // Jika soal kurang dari yang diminta, kembalikan semua soal yang ada
    if (allQuestions.length <= QUESTIONS_PER_QUIZ) {
      console.log(`📊 Menggunakan semua ${allQuestions.length} soal yang tersedia`);
      return allQuestions;
    }
    
    // Acak soal dan ambil jumlah yang diperlukan
    console.log(`🎲 Mengacak ${allQuestions.length} soal, mengambil ${QUESTIONS_PER_QUIZ} soal`);
    const shuffled = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, QUESTIONS_PER_QUIZ);
    
    return shuffled;
  }, []);

  const saveQuizResult = useCallback((resultData) => {
    try {
      const quizResult = {
        ...resultData,
        id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        timestamp: Date.now(),
      };

      // Check for duplicates (same category within 1 second)
      const isDuplicate = quizHistory.some(result => 
        result.category === quizResult.category && 
        Math.abs(result.timestamp - quizResult.timestamp) < 1000
      );

      if (isDuplicate) {
        console.log('⏭️ Kuis sudah pernah disimpan, melewati...');
        return false;
      }

      // Add new result to beginning of array
      const newHistory = [quizResult, ...quizHistory].slice(0, 100);
      
      // Update localStorage
      localStorage.setItem('quizResults', JSON.stringify(newHistory));
      
      // Update summary
      const summary = {
        lastQuiz: quizResult.category,
        lastScore: quizResult.score,
        lastPercentage: quizResult.percentage,
        lastDate: new Date().toLocaleDateString('id-ID'),
        totalQuizzes: newHistory.length,
        averageScore: calculateAverageScore(newHistory),
        bestScore: Math.max(...newHistory.map(q => q.percentage))
      };
      
      localStorage.setItem('quiz_summary', JSON.stringify(summary));
      
      setQuizHistory(newHistory);
      setQuizSummary(summary);
      
      window.dispatchEvent(new CustomEvent('quizResultSaved'));
      
      return true;
      
    } catch (error) {
      console.error('❌ Gagal menyimpan hasil kuis:', error);
      return false;
    }
  }, [quizHistory]);

  const calculateAverageScore = (history) => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, quiz) => sum + quiz.percentage, 0);
    return Math.round(total / history.length);
  };

  const getCategoryStats = useCallback((categoryName) => {
    const categoryQuizzes = quizHistory.filter(q => q.category === categoryName);
    if (categoryQuizzes.length === 0) return null;
    
    const averageScore = categoryQuizzes.reduce((sum, q) => sum + q.percentage, 0) / categoryQuizzes.length;
    const bestScore = Math.max(...categoryQuizzes.map(q => q.percentage));
    const attempts = categoryQuizzes.length;
    
    return {
      averageScore: Math.round(averageScore),
      bestScore,
      attempts,
      lastAttempt: categoryQuizzes[0]?.date
    };
  }, [quizHistory]);

  const clearQuizHistory = useCallback(() => {
    localStorage.removeItem('quizResults');
    localStorage.removeItem('quiz_summary');
    setQuizHistory([]);
    setQuizSummary(null);
  }, []);

  return (
    <QuizResultsContext.Provider value={{
      quizHistory,
      quizSummary,
      getQuestionsForCategory,
      saveQuizResult,
      getCategoryStats,
      clearQuizHistory,
    }}>
      {children}
    </QuizResultsContext.Provider>
  );
};