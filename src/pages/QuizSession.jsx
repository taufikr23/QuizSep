import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useQuizResults } from '../context/QuizResultsContext';
import { useAuth } from '../context/AuthContext';
import QuestionCard from '../components/QuestionCard';
import { Trophy, ChevronRight, RotateCcw, Clock, Brain, Target } from 'lucide-react';

const QUIZ_TIME = 300; // 5 minutes

const QuizSession = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();
  const { getQuestionsForCategory } = useQuizResults();
  const { QUESTIONS_PER_QUIZ } = useQuiz();
  const { user } = useAuth();

  const [quizState, setQuizState] = useState({
    category: null,
    questions: [],
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null,
    timeLeft: QUIZ_TIME,
    userAnswers: {},
    started: true,
    showResult: false
  });

  const startQuiz = useCallback((category) => {
    const questions = getQuestionsForCategory(category.name, QUESTIONS_PER_QUIZ);
    setQuizState(prev => ({
      ...prev,
      category,
      questions,
      currentQuestion: 0,
      score: 0,
      selectedAnswer: null,
      timeLeft: QUIZ_TIME,
      userAnswers: {},
      started: true,
      showResult: false
    }));
  }, [getQuestionsForCategory, QUESTIONS_PER_QUIZ]);

  const handleAnswer = useCallback((answerIndex) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      userAnswers: {
        ...prev.userAnswers,
        [prev.currentQuestion]: answerIndex
      }
    }));
  }, []);

  const handleNextQuestion = useCallback(() => {
    setQuizState(prev => {
      const isCorrect = prev.selectedAnswer === prev.questions[prev.currentQuestion]?.correctAnswer;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const nextQuestion = prev.currentQuestion + 1;
      const isLastQuestion = nextQuestion >= prev.questions.length;

      return {
        ...prev,
        score: newScore,
        selectedAnswer: null,
        currentQuestion: nextQuestion,
        showResult: isLastQuestion
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    navigate('/quiz');
  }, [navigate]);

  // Timer effect
  useEffect(() => {
    if (!quizState.started || quizState.showResult || quizState.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeLeft <= 1) {
          return {
            ...prev,
            showResult: true,
            timeLeft: 0
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.started, quizState.showResult, quizState.timeLeft]);

  // Initialize quiz from URL
  useEffect(() => {
    if (urlCategory && !quizState.category) {
      const categoryName = urlCategory.replace(/-/g, ' ');
      startQuiz({ name: categoryName });
    }
  }, [urlCategory, startQuiz, quizState.category]);

  // Check authentication
  useEffect(() => {
    if (!user && quizState.started) {
      navigate('/login');
    }
  }, [user, quizState.started, navigate]);

  if (quizState.showResult) {
    const resultData = {
      score: quizState.score,
      totalQuestions: quizState.questions.length,
      category: quizState.category,
      timeUsed: QUIZ_TIME - quizState.timeLeft,
      questions: quizState.questions,
      userAnswers: quizState.userAnswers,
      percentage: Math.round((quizState.score / quizState.questions.length) * 100)
    };

    navigate('/quiz/results', { state: resultData });
    return null;
  }

  if (!quizState.started || quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Memuat kuis...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestion];
  const minutes = Math.floor(quizState.timeLeft / 60);
  const seconds = quizState.timeLeft % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 p-4 pt-16">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header Kuis - GANTI DARI QuizHeader KE KODE LANGSUNG */}
        <div className="rounded-xl shadow-lg p-4 backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg border border-white/20">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{quizState.category?.name || 'Kuis'}</h1>
                <p className="text-gray-400 text-sm">
                  Soal {quizState.currentQuestion + 1} dari {quizState.questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-400">
                  <Target className="w-4 h-4" />
                  <span className="text-lg font-bold">{quizState.score}</span>
                </div>
                <p className="text-gray-400 text-xs">Skor</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-rose-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg font-bold">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Sisa Waktu</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${((quizState.currentQuestion + 1) / quizState.questions.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{Math.round(((quizState.currentQuestion + 1) / quizState.questions.length) * 100)}% Selesai</span>
            <span>{quizState.currentQuestion + 1}/{quizState.questions.length} Soal</span>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          onAnswer={handleAnswer}
          questionNumber={quizState.currentQuestion + 1}
        />

        <div className="flex justify-between items-center rounded-xl shadow-lg p-4 backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
          <button
            onClick={resetQuiz}
            className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 font-medium hover:bg-white/5 hover:border-white/20 hover:shadow-md transition-all flex items-center gap-1 backdrop-blur-sm text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Keluar Kuis
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={quizState.selectedAnswer === null}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all flex items-center gap-1 relative overflow-hidden group text-sm ${quizState.selectedAnswer === null
                ? 'bg-gray-800 cursor-not-allowed border border-gray-700'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 border border-emerald-500/30'
              }`}
          >
            {quizState.selectedAnswer !== null && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
            <span className="relative">
              {quizState.currentQuestion < quizState.questions.length - 1 ? (
                <>
                  Soal Berikutnya
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </>
              ) : (
                <>
                  Selesaikan Kuis
                  <Trophy className="w-4 h-4 inline ml-1" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSession;