import React, { useState } from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<{[key: number]: number | null}>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const score = questions.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="mt-6 p-4 rounded-lg bg-black/20 border border-white/5">
      <h3 className="text-lg font-mono font-bold mb-4 text-accent">Мини-тест</h3>
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="space-y-2">
            <p className="text-sm font-medium text-gray-300">{idx + 1}. {q.text}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx;
                const isCorrect = q.correctIndex === optIdx;
                
                let btnClass = "text-xs p-2 rounded text-left transition-all border ";
                
                if (showResults) {
                    if (isCorrect) btnClass += "border-green-500 bg-green-500/10 text-green-400";
                    else if (isSelected && !isCorrect) btnClass += "border-red-500 bg-red-500/10 text-red-400";
                    else btnClass += "border-white/10 text-gray-500 opacity-50";
                } else {
                    if (isSelected) btnClass += "border-accent bg-accent/10 text-accent";
                    else btnClass += "border-white/10 hover:bg-white/5 text-gray-400";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(q.id, optIdx)}
                    className={btnClass}
                    disabled={showResults}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {!showResults ? (
          <button 
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="mt-4 w-full py-2 bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Проверить ответы
          </button>
      ) : (
          <div className="mt-4 text-center">
              <p className="text-sm">Результат: <span className="text-accent font-bold">{score} / {questions.length}</span></p>
              <button 
                onClick={() => { setShowResults(false); setAnswers({}); }}
                className="mt-2 text-xs text-gray-400 underline hover:text-white"
              >
                  Сбросить
              </button>
          </div>
      )}
    </div>
  );
};

export default Quiz;