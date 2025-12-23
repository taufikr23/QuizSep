import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Check, X, BookOpen, Sparkles, 
  ArrowLeft, ArrowRight, Home, BarChart2,
  Rocket, RotateCcw, Save
} from 'lucide-react';

const CATEGORY_CONFIG = {
  'Matematika': { color: 'text-blue-400' },
  'Bahasa Inggris': { color: 'text-emerald-400' },
  'Fisika': { color: 'text-purple-400' },
  'Kimia': { color: 'text-amber-400' },
  'Biologi': { color: 'text-rose-400' },
  'Sejarah': { color: 'text-yellow-400' },
  'Geografi': { color: 'text-teal-400' },
  'Ekonomi': { color: 'text-indigo-400' }
};

const ResultScreen = ({
  score,
  totalQuestions,
  category,
  timeUsed,
  onReset,
  onBackToQuizzes,
  questions,
  userAnswers,
  onSaveResult
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const percentage = Math.round((score / totalQuestions) * 100);
  const config = CATEGORY_CONFIG[category?.name] || CATEGORY_CONFIG['Matematika'];
  
  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const [quizSaved, setQuizSaved] = useState(false);
  
  const resultConfig = {
    excellent: { emoji: '🏆', color: 'text-emerald-400', message: 'Luar Biasa!', gradient: 'from-emerald-500 to-teal-500' },
    great: { emoji: '🎯', color: 'text-blue-400', message: 'Hebat!', gradient: 'from-blue-500 to-cyan-500' },
    good: { emoji: '🚀', color: 'text-amber-400', message: 'Bagus!', gradient: 'from-amber-500 to-orange-500' },
    keepLearning: { emoji: '🌌', color: 'text-purple-400', message: 'Terus Belajar!', gradient: 'from-purple-500 to-pink-500' }
  };

  let result;
  if (percentage >= 80) result = resultConfig.excellent;
  else if (percentage >= 60) result = resultConfig.great;
  else if (percentage >= 40) result = resultConfig.good;
  else result = resultConfig.keepLearning;

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleNextReview = () => {
    if (currentReviewPage < totalQuestions - 1) {
      setCurrentReviewPage(prev => prev + 1);
    }
  };

  const handlePrevReview = () => {
    if (currentReviewPage > 0) {
      setCurrentReviewPage(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentReviewPage];
  const userAnswer = userAnswers[currentReviewPage];
  const isCorrect = userAnswer === currentQuestion?.correctAnswer;
  const letters = ['A', 'B', 'C', 'D'];

  const handleSaveResult = () => {
    if (onSaveResult) {
      const success = onSaveResult();
      if (success) {
        setQuizSaved(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="rounded-2xl p-6 mb-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-6xl mb-2">{result.emoji}</div>
              <h2 className="text-2xl font-bold text-white mb-1">{result.message}</h2>
              <p className="text-gray-300">
                Anda menyelesaikan kuis {category?.name} dengan {score} dari {totalQuestions} jawaban benar.
              </p>
            </div>
            
            <div className="text-center">
              <div className={`text-7xl font-bold ${result.color} mb-2`}>{percentage}%</div>
              <div className="text-white font-semibold">Skor Akhir</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={onReset}
              className="px-4 py-2 border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi
            </button>
            <button
              onClick={onBackToQuizzes}
              className="px-4 py-2 border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Kuis Lainnya
            </button>
            <button
              onClick={handleGoToProfile}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2"
            >
              <BarChart2 className="w-4 h-4" />
              Lihat Profil
            </button>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-5 animate-slide-up backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Review Jawaban
              </h2>
              <p className="text-gray-400 text-sm">Lihat jawaban Anda dan pelajari dari kesalahan</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveResult}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all ${
                  quizSaved
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300'
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 hover:bg-blue-500/30'
                }`}
              >
                <Save className="w-3 h-3" />
                {quizSaved ? 'Tersimpan!' : 'Simpan Hasil'}
              </button>
            </div>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">{score}</div>
                <div className="text-xs text-gray-400">Benar</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-rose-400">{totalQuestions - score}</div>
                <div className="text-xs text-gray-400">Salah</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{totalQuestions}</div>
                <div className="text-xs text-gray-400">Total Soal</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400">{percentage}%</div>
                <div className="text-xs text-gray-400">Skor</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevReview}
                disabled={currentReviewPage === 0}
                className={`p-2 rounded-lg border transition-all ${
                  currentReviewPage === 0
                    ? 'border-gray-700 bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <div className="text-sm text-gray-400">
                Soal <span className="font-bold text-white">{currentReviewPage + 1}</span> dari {totalQuestions}
              </div>
              
              <button
                onClick={handleNextReview}
                disabled={currentReviewPage === totalQuestions - 1}
                className={`p-2 rounded-lg border transition-all ${
                  currentReviewPage === totalQuestions - 1
                    ? 'border-gray-700 bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentReviewPage
                      ? userAnswers[index] === questions[index].correctAnswer
                        ? 'bg-emerald-500 scale-125'
                        : 'bg-rose-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  title={`Soal ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {currentQuestion && (
            <div className={`rounded-lg p-4 border transition-all backdrop-blur-sm ${
              isCorrect 
                ? 'border-emerald-500/20 bg-gradient-to-r from-emerald-900/10 to-teal-900/10' 
                : 'border-rose-500/20 bg-gradient-to-r from-rose-900/10 to-pink-900/10'
            }`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                <div className="flex items-start gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold shadow-md border ${
                    isCorrect 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400' 
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-400'
                  }`}>
                    {currentReviewPage + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-2">{currentQuestion.question}</h3>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded">
                        {currentQuestion.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded">
                        {currentQuestion.difficulty || 'Sedang'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300' 
                    : 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300'
                }`}>
                  <div className="flex items-center gap-1">
                    {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    <span>{isCorrect ? 'Benar' : 'Salah'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {currentQuestion.options.map((option, optionIndex) => {
                  const isUserAnswer = optionIndex === userAnswer;
                  const isCorrectAnswer = optionIndex === currentQuestion.correctAnswer;
                  
                  let optionClass = 'p-3 rounded-lg border bg-gray-900/50 border-white/10';
                  let textClass = 'text-gray-300';
                  
                  if (isCorrectAnswer) {
                    optionClass = 'p-3 rounded-lg border bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30';
                    textClass = 'text-blue-300 font-medium';
                  } else if (isUserAnswer && !isCorrect) {
                    optionClass = 'p-3 rounded-lg border bg-gradient-to-r from-rose-900/30 to-pink-900/30 border-rose-500/30';
                    textClass = 'text-rose-300';
                  }
                  
                  return (
                    <div key={optionIndex} className={`${optionClass} transition-all`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isCorrectAnswer 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                            : isUserAnswer && !isCorrect
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}>
                          {letters[optionIndex]}
                        </div>
                        <div className="flex-1">
                          <span className={textClass}>{option}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isCorrectAnswer && (
                            <div className="flex items-center gap-1 text-blue-400 text-sm bg-blue-900/30 px-2 py-1 rounded">
                              <Check className="w-3 h-3" />
                              <span>Jawaban Benar</span>
                            </div>
                          )}
                          
                          {isUserAnswer && !isCorrect && (
                            <div className="flex items-center gap-1 text-rose-400 text-sm bg-rose-900/30 px-2 py-1 rounded">
                              <X className="w-3 h-3" />
                              <span>Jawaban Anda</span>
                            </div>
                          )}
                          
                          {isUserAnswer && isCorrect && (
                            <div className="flex items-center gap-1 text-emerald-400 text-sm bg-emerald-900/30 px-2 py-1 rounded">
                              <Check className="w-3 h-3" />
                              <span>Jawaban Anda</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentQuestion.explanation && (
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-300 text-sm">Penjelasan:</span>
                  </div>
                  <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onReset}
              className="flex-1 px-6 py-3 border-2 border-white/10 text-white rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Kuis Lagi
            </button>
            
            <button
              onClick={onBackToQuizzes}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              Jelajahi Kuis Lain
            </button>
            
            <button
              onClick={handleGoToProfile}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <BarChart2 className="w-4 h-4" />
              Lihat Statistik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;