import React from 'react';
import { useApp } from '../../context/AppContext';

export const Logo: React.FC<{ className?: string; onClick?: () => void }> = ({ className = '', onClick }) => {
  const { setView, tr } = useApp();

  const handleClick = () => {
    if (onClick) onClick();
    else setView('home');
  };

  return (
    <div 
      onClick={handleClick}
      className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}
    >
      {/* Badge Monogram */}
      <div className="relative flex items-center justify-center bg-white px-2.5 py-1 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-slate-200 transition-transform group-hover:scale-105">
        <span className="font-extrabold text-2xl tracking-tighter leading-none flex items-center">
          <span className="text-[#22C55E] drop-shadow-[0_1px_2px_rgba(34,197,94,0.3)]">G</span>
          <span className="text-slate-900 -ml-0.5">E</span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span className="font-extrabold tracking-tight text-[#22C55E] text-base md:text-lg font-sans uppercase drop-shadow-sm">
          {tr('logo_brand_tag')}
        </span>
        <span className="font-bold tracking-widest text-slate-400 group-hover:text-slate-200 text-[10px] md:text-xs transition-colors">
          GURU ENERGY
        </span>
      </div>
    </div>
  );
};
