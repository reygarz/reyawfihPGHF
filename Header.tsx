import React, { useEffect, useState } from 'react';
import { Icons } from '../constants';

interface HeaderProps {
  restartAnimation: () => void;
}

const Header: React.FC<HeaderProps> = ({ restartAnimation }) => {
  const [animateLogo, setAnimateLogo] = useState(false);
  const name = "Мамонтов";

  const triggerLogo = () => {
    setAnimateLogo(true);
    setTimeout(() => setAnimateLogo(false), 2000);
    restartAnimation();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      {/* Logo Area */}
      <div className="flex items-center gap-4 pointer-events-auto cursor-pointer group" onClick={triggerLogo}>
        <div className={`w-10 h-10 text-accent transition-all duration-700 ${animateLogo ? 'rotate-180' : ''}`}>
            <Icons.Logo className={`w-full h-full ${animateLogo ? 'animate-pulse' : ''}`} />
        </div>
        <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-[0.2em] uppercase flex">
            {name.split('').map((char, i) => (
                <span 
                key={i} 
                className="transition-colors duration-300 hover:text-accent"
                style={{ opacity: 0.7 + (i % 3) * 0.1 }} // Subtle opacity variation
                >
                {char}
                </span>
            ))}
            </h1>
            <span className="text-[10px] text-gray-400 tracking-wider uppercase ml-1">
                Лабораторная • Информатика
            </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <button 
            onClick={triggerLogo}
            className="p-2 rounded-full hover:bg-white/10 transition-colors group"
            title="Перезапустить анимацию"
        >
             <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;