import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ParticlePortrait from './components/ParticlePortrait';
import Quiz from './components/Quiz';
import { SLIDES, Icons } from './constants';
import { AnimationState } from './types';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 is Hero
  const [animationState, setAnimationState] = useState<AnimationState>('assembling');
  
  // Animation Cycle Logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = () => {
      if (animationState === 'assembling') {
        timeout = setTimeout(() => setAnimationState('holding'), 3500);
      } else if (animationState === 'holding') {
        timeout = setTimeout(() => setAnimationState('liquid'), 4000);
      } else if (animationState === 'liquid') {
        timeout = setTimeout(() => setAnimationState('dispersing'), 4000);
      } else if (animationState === 'dispersing') {
        timeout = setTimeout(() => setAnimationState('assembling'), 2000);
      }
    };

    cycle();
    return () => clearTimeout(timeout);
  }, [animationState]);

  const restartAnimation = useCallback(() => {
    setAnimationState('dispersing');
    setTimeout(() => setAnimationState('assembling'), 1000);
  }, []);

  const handleNav = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentIndex(prev => Math.min(prev + 1, SLIDES.length - 1));
    } else {
      setCurrentIndex(prev => Math.max(prev - 1, -1));
    }
  };

  const currentSlide = currentIndex === -1 ? null : SLIDES[currentIndex];

  return (
    <div className="min-h-screen font-sans text-gray-200 selection:bg-accent selection:text-black">
      
      <Header restartAnimation={restartAnimation} />

      <main className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Content */}
        <section className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 pt-20 md:pt-0 transition-all duration-500">
            
            {/* Hero Content */}
            <div className={`absolute inset-0 flex flex-col justify-center px-8 md:px-16 transition-all duration-700 transform ${currentIndex === -1 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                <h2 className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">Лабораторная Работа</h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Интерактивная <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Среда Обучения</span>
                </h1>
                <p className="text-gray-400 max-w-md leading-relaxed mb-8 border-l-2 border-accent pl-4">
                    Изучение основ веб-разработки и дизайна через современный интерфейс в стиле гласморфизм.
                </p>
                
                <button 
                    onClick={() => handleNav('next')}
                    className="group w-fit flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-accent hover:text-black transition-all duration-300 backdrop-blur-sm"
                >
                    <span className="text-sm font-bold uppercase tracking-wider">Начать</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>

                <div className="mt-12">
                    <h3 className="text-2xl font-light tracking-wide">Мамонтов <span className="font-bold">Арсений</span> Алексеевич</h3>
                    <p className="text-sm text-accent mt-2 font-mono tracking-wider">Группа 5375</p>
                </div>
            </div>

            {/* Slide Content */}
            {SLIDES.map((slide, idx) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 flex flex-col justify-center px-6 md:px-16 transition-all duration-500 transform ${currentIndex === idx ? 'opacity-100 translate-y-0 z-20 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                >
                    <div className="glass-panel p-8 rounded-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                {slide.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">{slide.title}</h2>
                                <p className="text-sm text-gray-400 font-mono">{slide.description}</p>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <h3 className="text-xs font-bold uppercase text-accent tracking-wider">Ключевые Концепции</h3>
                                <ul className="space-y-2">
                                    {slide.points.map((pt, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="mt-1.5 w-1 h-1 bg-accent rounded-full shrink-0"></span>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {slide.codeSnippet && (
                                <div className="bg-black/40 p-4 rounded-lg border border-white/5 font-mono text-xs text-gray-300 overflow-x-auto">
                                    <pre>{slide.codeSnippet}</pre>
                                </div>
                            )}

                            <Quiz questions={slide.quiz} />
                        </div>
                    </div>
                </div>
            ))}
        </section>

        {/* Right Side - Visuals */}
        <section className="relative w-full md:w-1/2 h-full bg-gradient-to-b from-[#0a0a0c] to-[#111114]">
            <div className="absolute inset-0 flex items-center justify-center">
                {/* The main particle animation */}
                <div className="w-full h-full relative">
                    <ParticlePortrait 
                        animationState={animationState} 
                        onAnimationComplete={() => {}} 
                        reducedMotion={false}
                    />
                </div>
            </div>
            
            {/* Slide Navigation Dots (Visual only for Right side balance) */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                {[-1, ...SLIDES.map((_, i) => i)].map((idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-accent scale-150' : 'bg-white/20 hover:bg-white/50'}`}
                        aria-label={`Перейти к слайду ${idx}`}
                    />
                ))}
            </div>
        </section>

        {/* Bottom Nav Controls */}
        <nav className="fixed bottom-0 left-0 w-full md:w-1/2 z-30 p-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
            <button 
                onClick={() => handleNav('prev')}
                disabled={currentIndex === -1}
                className="text-sm font-mono text-gray-400 hover:text-white disabled:opacity-0 transition-opacity flex items-center gap-2"
            >
                ← Назад
            </button>
            
            <span className="text-xs font-mono text-gray-500">
                {currentIndex === -1 ? 'ВСТУПЛЕНИЕ' : `${currentIndex + 1} / ${SLIDES.length}`}
            </span>

            <button 
                onClick={() => handleNav('next')}
                disabled={currentIndex === SLIDES.length - 1}
                className="text-sm font-mono text-gray-400 hover:text-white disabled:opacity-0 transition-opacity flex items-center gap-2"
            >
                Вперед →
            </button>
        </nav>

      </main>
      
      {/* README / Instructions - Hidden in UI, present in DOM for reference as requested */}
      <div style={{ display: 'none' }}>
        <h2>INSTRUCTIONS FOR MODIFICATION</h2>
        <ul>
          <li><strong>Change Name:</strong> Go to <code>components/Header.tsx</code> and change the <code>name</code> variable. Also update <code>App.tsx</code> inside the Hero section.</li>
          <li><strong>Change Portrait:</strong> The portrait is mathematically generated in <code>components/ParticlePortrait.tsx</code> inside <code>generateFacePoints</code>. To use a real SVG, you would need to parse SVG path coordinates and replace the mathematical generation with point sampling from the path.</li>
          <li><strong>Edit Slides:</strong> Modify the <code>SLIDES</code> array in <code>constants.tsx</code>.</li>
          <li><strong>Disable Animation Loop:</strong> In <code>App.tsx</code>, remove the `useEffect` that calls `cycle()`.</li>
        </ul>
      </div>
    </div>
  );
};

export default App;