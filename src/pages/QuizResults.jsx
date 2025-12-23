import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuizResults } from '../context/QuizResultsContext';
import ResultScreen from '../components/ResultScreen';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveQuizResult } = useQuizResults();

  const [resultData, setResultData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (location.state) {
      setResultData(location.state);

      // Simpan hasil kuis
      if (!isSaved) {
        const saved = saveQuizResult({
          ...location.state,
          category: location.state.category?.name || 'General',
        });

        if (saved) {
          setIsSaved(true);
        }
      }
    } else {
      navigate('/quiz');
    }
  }, [location.state, navigate, saveQuizResult, isSaved]);

  const handleBackToQuizzes = () => {
    navigate('/quiz');
  };

  const handleTryAgain = () => {
    if (resultData?.category) {
      navigate(`/quiz/${resultData.category.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  if (!resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Memuat hasil...</p>
        </div>
      </div>
    );
  }

  return (
    <ResultScreen
      score={resultData.score}
      totalQuestions={resultData.totalQuestions}
      category={resultData.category}
      timeUsed={resultData.timeUsed}
      onReset={handleTryAgain}
      onBackToQuizzes={handleBackToQuizzes}
      questions={resultData.questions}
      userAnswers={resultData.userAnswers}
    />
  );
};

export default QuizResults;