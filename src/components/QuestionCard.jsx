import React from 'react';
import { Zap } from 'lucide-react';

const QuestionCard = ({ question, selectedAnswer, onAnswer, questionNumber }) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  return (
    <div className="rounded-xl shadow-lg p-4 animate-slide-up backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-lg border border-white/20">
            Q{questionNumber}
          </div>
          <Zap className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-white leading-tight">{question?.question}</h3>
      </div>

      <div className="space-y-2">
        {question?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full p-3 rounded-lg border text-left transition-all duration-300 backdrop-blur-sm ${
              selectedAnswer === index
                ? 'border-blue-500 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 shadow-md scale-[1.01]'
                : 'border-white/10 bg-gray-900/40 hover:border-blue-400/30 hover:bg-blue-900/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                selectedAnswer === index
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105 border-blue-400'
                  : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border-gray-700'
              }`}>
                {letters[index]}
                {selectedAnswer === index && (
                  <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                )}
              </div>
              <span className={`text-sm ${selectedAnswer === index ? 'text-white' : 'text-gray-300'}`}>
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;